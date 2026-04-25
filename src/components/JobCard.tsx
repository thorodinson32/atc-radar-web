import { MapPin, DollarSign, Calendar, ExternalLink, Tag } from 'lucide-react';
import type { Job, JobCategory } from '../types';
import { format } from 'date-fns';

const CATEGORY_LABELS: Record<JobCategory, string> = {
  all: 'General',
  air_traffic_controller: 'ATC',
  traffic_management: 'TMU',
  supervisor: 'Supervisor',
};

const CATEGORY_COLORS: Record<JobCategory, string> = {
  all: 'text-slate-400 bg-slate-400/10',
  air_traffic_controller: 'text-cyan-400 bg-cyan-400/10',
  traffic_management: 'text-amber-400 bg-amber-400/10',
  supervisor: 'text-violet-400 bg-violet-400/10',
};

function formatSalary(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
}

export default function JobCard({ job }: { job: Job }) {
  const cat = job.jobCategory || 'all';
  const primary = job.locations?.[0];

  return (
    <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-5 flex flex-col gap-3 hover:border-cyan-400/30 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-slate-100 font-semibold text-base m-0">{job.positionTitle}</h3>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${CATEGORY_COLORS[cat]}`}>
            {CATEGORY_LABELS[cat]}
          </span>
        </div>
        <p className="text-slate-500 text-sm m-0">{job.organizationName}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {primary && (
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin size={12} />
            {primary.city}, {primary.state}
            {job.locations.length > 1 && (
              <span className="text-cyan-400 ml-1">+{job.locations.length - 1} more</span>
            )}
          </span>
        )}
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <DollarSign size={12} />
          {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)}
        </span>
        <span className="flex items-center gap-1 text-slate-400 text-xs">
          <Calendar size={12} />
          Closes {format(new Date(job.closeDate), 'MMM d, yyyy')}
        </span>
        {job.payGrade && (
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Tag size={12} />
            {job.payGrade}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-slate-600 text-xs">{job.positionSchedule}</span>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-cyan-400/10 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-cyan-400/20 transition-colors no-underline"
        >
          Apply <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}
