import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import type { JobCategory } from '../types';
import { useCreateAlert } from '../hooks/useAlerts';

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
  { value: 'all', label: 'Any Position' },
  { value: 'air_traffic_controller', label: 'Air Traffic Controller' },
  { value: 'traffic_management', label: 'Traffic Management Unit' },
  { value: 'supervisor', label: 'Supervisor' },
];

const inputClass = 'bg-[#0a0f1e] border border-[#1e2d4a] text-slate-300 text-sm rounded-md px-3 py-2 outline-none w-full';

export default function AlertForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', city: '', state: '', jobCategory: 'all' as JobCategory });
  const [success, setSuccess] = useState(false);
  const createAlert = useCreateAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAlert.mutateAsync(form);
    setSuccess(true);
    setTimeout(() => {
      setOpen(false);
      setSuccess(false);
      setForm({ email: '', city: '', state: '', jobCategory: 'all' });
    }, 1500);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-cyan-400 text-[#0a0f1e] font-bold text-sm px-4 py-2 rounded-lg hover:bg-cyan-300 transition-colors"
      >
        <Bell size={15} /> Create Alert
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-slate-100 text-lg font-semibold m-0">
            <Bell size={18} className="text-cyan-400" /> New Job Alert
          </h2>
          <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <p className="text-green-400 text-center py-4">Alert created! You'll be notified when matching jobs appear.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-xs text-slate-400 font-medium">
              Email
              <input required type="email" className={inputClass} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </label>

            <label className="flex flex-col gap-1.5 text-xs text-slate-400 font-medium">
              Position Type
              <select className={inputClass} value={form.jobCategory}
                onChange={(e) => setForm({ ...form, jobCategory: e.target.value as JobCategory })}>
                {CATEGORIES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>

            <div className="flex gap-3">
              <label className="flex flex-col gap-1.5 text-xs text-slate-400 font-medium flex-1">
                State
                <select className={inputClass} value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}>
                  <option value="">Any State</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-xs text-slate-400 font-medium flex-1">
                City
                <input className={inputClass} value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Any city" />
              </label>
            </div>

            <button type="submit" disabled={createAlert.isPending}
              className="bg-cyan-400 text-[#0a0f1e] font-bold py-2.5 rounded-lg mt-2 hover:bg-cyan-300 transition-colors disabled:opacity-50">
              {createAlert.isPending ? 'Creating...' : 'Create Alert'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
