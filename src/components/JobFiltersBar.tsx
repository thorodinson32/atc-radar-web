import { Search, Filter } from 'lucide-react';
import type { JobCategory, JobFilters } from '../types';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

const CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: 'all', label: 'All Positions' },
  { value: 'air_traffic_controller', label: 'Air Traffic Controller' },
  { value: 'traffic_management', label: 'Traffic Management' },
  { value: 'supervisor', label: 'Supervisor' },
];

const selectClass = 'bg-[#0a0f1e] border border-[#1e2d4a] text-slate-300 text-sm rounded-md px-3 py-2 outline-none cursor-pointer';

interface Props {
  filters: JobFilters;
  onChange: (f: JobFilters) => void;
}

export default function JobFiltersBar({ filters, onChange }: Props) {
  const update = (patch: Partial<JobFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-3 px-8 py-3 bg-[#0d1526] border-b border-[#1e2d4a]">
      <div className="relative flex-1 min-w-48">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          className="w-full bg-[#0a0f1e] border border-[#1e2d4a] text-slate-300 text-sm rounded-md pl-9 pr-3 py-2 outline-none"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-slate-500" />
        <select className={selectClass} value={filters.category} onChange={(e) => update({ category: e.target.value as JobCategory })}>
          {CATEGORIES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>

        <select className={selectClass} value={filters.state} onChange={(e) => update({ state: e.target.value, city: '' })}>
          <option value="">All States</option>
          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <input
          className={`${selectClass} w-36`}
          placeholder="City"
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
        />
      </div>
    </div>
  );
}
