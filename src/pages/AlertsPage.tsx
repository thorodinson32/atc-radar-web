import { Bell, Trash2, ToggleLeft, ToggleRight, Loader2, MapPin, Tag } from 'lucide-react';
import type { JobAlert, JobCategory } from '../types';
import { useAlerts, useDeleteAlert, useToggleAlert } from '../hooks/useAlerts';
import AlertForm from '../components/AlertForm';

const CATEGORY_LABELS: Record<JobCategory, string> = {
  all: 'Any Position',
  air_traffic_controller: 'Air Traffic Controller',
  traffic_management: 'Traffic Management Unit',
  supervisor: 'Supervisor',
};

export default function AlertsPage() {
  const { data: alerts = [], isLoading } = useAlerts();
  const deleteAlert = useDeleteAlert();
  const toggleAlert = useToggleAlert();

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#070c18]">
      <div className="flex items-center justify-between px-8 pt-6 pb-4 flex-wrap gap-4">
        <div>
          <h1 className="text-slate-100 text-2xl font-bold m-0">Job Alerts</h1>
          <p className="text-slate-500 text-sm mt-1">Get notified when new ATC positions open in your target location.</p>
        </div>
        <AlertForm />
      </div>

      <div className="px-8 py-4">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="text-cyan-400 animate-spin" />
          </div>
        )}

        {!isLoading && alerts.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20">
            <Bell size={48} className="text-[#1e2d4a]" />
            <p className="text-slate-600 text-center max-w-sm">No alerts yet. Create one to get notified about new ATC jobs.</p>
          </div>
        )}

        {alerts.length > 0 && (
          <div className="flex flex-col gap-3 max-w-2xl">
            {alerts.map((alert) => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onDelete={() => deleteAlert.mutate(alert.id)}
                onToggle={() => toggleAlert.mutate({ id: alert.id, active: !alert.active })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AlertRow({ alert, onDelete, onToggle }: { alert: JobAlert; onDelete: () => void; onToggle: () => void }) {
  return (
    <div className={`flex items-center justify-between bg-[#0d1526] border border-[#1e2d4a] rounded-xl px-5 py-4 gap-4 transition-opacity ${alert.active ? 'opacity-100' : 'opacity-50'}`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-slate-100 font-semibold text-sm">
          <MapPin size={13} className="text-cyan-400" />
          {alert.city ? `${alert.city}, ` : ''}{alert.state || 'Any State'}
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <Tag size={11} />
          {CATEGORY_LABELS[alert.jobCategory]}
          <span className="text-[#2a3a5a]">·</span>
          {alert.email}
          <span className="text-[#2a3a5a]">·</span>
          {alert.active
            ? <span className="text-green-400 font-semibold">Active</span>
            : <span className="text-amber-400 font-semibold">Paused</span>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onToggle} className="bg-transparent border-none cursor-pointer p-1">
          {alert.active
            ? <ToggleRight size={22} className="text-cyan-400" />
            : <ToggleLeft size={22} className="text-slate-500" />}
        </button>
        <button onClick={onDelete} className="bg-transparent border-none cursor-pointer p-1">
          <Trash2 size={17} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}
