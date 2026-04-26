import type { Job, JobAlert, JobFilters, PaginatedResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/atc-radar/api';

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}${text ? ': ' + text : ''}`);
  }
  if (res.status === 204) return null as T;
  return res.json();
}

function buildQuery(params: Record<string, unknown>): string {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return q ? `?${q}` : '';
}

export const jobsApi = {
  getJobs: (filters: Partial<JobFilters>, page = 1, pageSize = 20): Promise<PaginatedResponse<Job>> =>
    request(`/jobs${buildQuery({ ...filters, page, pageSize })}`),

  getJob: (id: string): Promise<Job> =>
    request(`/jobs/${encodeURIComponent(id)}`),

  getLastSync: (): Promise<{ lastSyncedAt: string }> =>
    request('/jobs/last-sync'),
};

export const alertsApi = {
  getAlerts: (): Promise<JobAlert[]> =>
    request('/alerts'),

  createAlert: (alert: Omit<JobAlert, 'id' | 'createdAt' | 'active'>): Promise<JobAlert> =>
    request('/alerts', { method: 'POST', body: JSON.stringify(alert) }),

  deleteAlert: (id: string): Promise<void> =>
    request(`/alerts/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  toggleAlert: (id: string, active: boolean): Promise<JobAlert> =>
    request(`/alerts/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    }),
};
