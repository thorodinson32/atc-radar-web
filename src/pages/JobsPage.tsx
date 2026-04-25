import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { JobFilters } from '../types';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import JobFiltersBar from '../components/JobFiltersBar';
import AlertForm from '../components/AlertForm';

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({ category: 'all', state: '', city: '', search: '' });
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useJobs(filters, page);
  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#070c18]">
      <div className="flex items-center justify-between px-8 pt-6 pb-3 flex-wrap gap-4">
        <div>
          <h1 className="text-slate-100 text-2xl font-bold m-0">ATC Job Listings</h1>
          {data && <p className="text-slate-500 text-sm mt-1">{data.total} positions found</p>}
        </div>
        <AlertForm />
      </div>

      <JobFiltersBar filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />

      <div className="px-8 py-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={32} className="text-cyan-400 animate-spin" />
            <span className="text-slate-500 text-sm">Loading jobs...</span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-20">
            <p className="text-red-400">Failed to load jobs. Is the API running?</p>
          </div>
        )}

        {data?.data.length === 0 && (
          <div className="flex justify-center py-20">
            <p className="text-slate-500">No jobs match your filters.</p>
          </div>
        )}

        {data && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.data.map((job) => <JobCard key={job.id} job={job} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="bg-[#0d1526] border border-[#1e2d4a] text-slate-300 text-sm px-4 py-2 rounded-md disabled:opacity-40 hover:border-slate-500 transition-colors"
                >
                  Previous
                </button>
                <span className="text-slate-500 text-sm">Page {page} of {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="bg-[#0d1526] border border-[#1e2d4a] text-slate-300 text-sm px-4 py-2 rounded-md disabled:opacity-40 hover:border-slate-500 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
