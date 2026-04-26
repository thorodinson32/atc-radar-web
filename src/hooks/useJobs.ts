import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../api';
import type { JobFilters } from '../types';

export function useJobs(filters: Partial<JobFilters>, page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['jobs', filters, page, pageSize],
    queryFn: () => jobsApi.getJobs(filters, page, pageSize),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLastSync() {
  return useQuery({
    queryKey: ['last-sync'],
    queryFn: jobsApi.getLastSync,
    staleTime: 60 * 1000,
  });
}
