import { Link, useLocation } from 'react-router-dom';
import { Radio, Bell, Briefcase } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-14 bg-[#0a0f1e] border-b border-[#1e2d4a]">
      <Link to="/" className="flex items-center gap-2 no-underline">
        <Radio size={22} className="text-cyan-400" />
        <span className="text-cyan-400 font-bold text-lg tracking-wide">ATC Radar</span>
      </Link>

      <div className="flex gap-4">
        {[
          { to: '/', label: 'Jobs', icon: Briefcase },
          { to: '/alerts', label: 'Alerts', icon: Bell },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${pathname === to
                ? 'text-cyan-400 bg-cyan-400/10'
                : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
