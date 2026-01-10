import { useState, ReactNode } from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  Boxes,
  LogOut,
} from 'lucide-react';
import { UserRole } from '../App';
import imgLogo from 'figma:asset/6c97523942fe730fbd4ae098955eb28b9f9eefad.png';

import { DonorDashboard } from './DonorDashboard';
import { HospitalDashboard } from './HospitalDashboard';
import { BloodBankDashboard } from './BloodBankDashboard';
import { BloodBankInventories } from './BloodBankInventories';

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
  children?: ReactNode;
}

type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
};

const roleConfig = {
  donor: {
    title: 'Donor Portal',
    navItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
  },

  'blood-bank': {
    title: 'Blood Bank Portal',
    navItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'inventories', label: 'Inventories', icon: <Boxes className="w-5 h-5" /> },
      {
        id: 'active-requests',
        label: 'Active Requests',
        icon: <AlertCircle className="w-5 h-5" />,
        badge: '4',
      },
    ],
  },

  hospital: {
    title: 'Hospital Portal',
    navItems: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
  },
};

export function Dashboard({ role, onLogout, children }: DashboardProps) {
  const [activeNav, setActiveNav] = useState('dashboard');

  if (!role) return null;
  const config = roleConfig[role];

  const renderContent = () => {
    if (children) return children;

    if (role === 'donor') return <DonorDashboard />;
    if (role === 'hospital') return <HospitalDashboard />;

    if (role === 'blood-bank') {
      if (activeNav === 'inventories') return <BloodBankInventories />;
      if (activeNav === 'active-requests') return <BloodBankActiveRequests />;
      return <BloodBankDashboard />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#171717] border-r border-white/10 flex flex-col">
        <button onClick={onLogout} className="p-6 border-b border-white/10 text-left">
          <div className="flex items-center gap-3">
            <img src={imgLogo} className="w-10 h-10" />
            <div>
              <span className="text-white">BLOOD</span>
              <span className="text-[#dc2626]">SYNC</span>
            </div>
          </div>
        </button>

        <nav className="flex-1 p-4 space-y-1">
          {config.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                ${
                  activeNav === item.id
                    ? 'bg-[#dc2626] text-white'
                    : 'text-[#a3a3a3] hover:bg-white/5 hover:text-white'
                }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[#dc2626] text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#a3a3a3] hover:text-white hover:bg-white/5 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
}

/* ============================= */
/* BLOOD BANK – ACTIVE REQUESTS */
/* ============================= */

function BloodBankActiveRequests() {
  const [handled, setHandled] = useState<string[]>([]);

  const handleAction = (id: string) => {
    setHandled((prev) => [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-white text-xl">Active Blood Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!handled.includes('1') && (
          <ActiveRequestCard
            id="1"
            hospital="Apollo Hospital"
            bloodGroup="O-"
            units="3"
            time="5 min ago"
            onAction={handleAction}
          />
        )}
        {!handled.includes('2') && (
          <ActiveRequestCard
            id="2"
            hospital="Max Healthcare"
            bloodGroup="B+"
            units="2"
            time="12 min ago"
            onAction={handleAction}
          />
        )}
      </div>
    </div>
  );
}

function ActiveRequestCard({
  id,
  hospital,
  bloodGroup,
  units,
  time,
  onAction,
}: {
  id: string;
  hospital: string;
  bloodGroup: string;
  units: string;
  time: string;
  onAction: (id: string) => void;
}) {
  return (
    <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
      <h3 className="text-white mb-3">{hospital}</h3>

      <div className="text-[#a3a3a3] text-sm mb-4 space-y-1">
        <div>Blood Group: <span className="text-white">{bloodGroup}</span></div>
        <div>Units Required: <span className="text-white">{units}</span></div>
        <div>Requested: {time}</div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onAction(id)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
        >
          Accept
        </button>
        <button
          onClick={() => onAction(id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
