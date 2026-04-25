export type JobCategory = 'air_traffic_controller' | 'traffic_management' | 'supervisor' | 'all';

export interface JobLocation {
  city: string;
  state: string;
  country: string;
  facilityCode?: string;
}

export interface Job {
  id: string;
  positionTitle: string;
  organizationName: string;
  departmentName: string;
  jobCategory: JobCategory;
  payGrade: string;
  salaryMin: number;
  salaryMax: number;
  openDate: string;
  closeDate: string;
  locations: JobLocation[];
  applyUrl: string;
  positionOfferingType: string;
  positionSchedule: string;
  qualificationSummary: string;
}

export interface JobAlert {
  id: string;
  email: string;
  city: string;
  state: string;
  jobCategory: JobCategory;
  active: boolean;
  createdAt: string;
}

export interface JobFilters {
  category: JobCategory;
  state: string;
  city: string;
  search: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
