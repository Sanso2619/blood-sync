import { useState, ReactNode } from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  Bell,
  ChevronRight,
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

const roleConfig: Record<string, { title: string; navItems: NavItem[] }> = {
  donor: {
    title: 'Donor Portal',
    navItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },

  hospital: {
    title: 'Hospital Portal',
    navItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },

  'blood-bank': {
    title: 'Blood Bank Portal',
    navItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        id: 'inventories',
        label: 'Inventories',
        icon: <Boxes className="w-5 h-5" />,
      },
      {
        id: 'active-requests',
        label: 'Active Requests',
        icon: <AlertCircle className="w-5 h-5" />,
        badge: '4',
      },
    ],
  },
};

export function Dashboard({ role, onLogout, children }: DashboardProps) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!role) return null;
  const config = roleConfig[role];

  const renderContent = () => {
    if (children) return children;

    if (role === 'donor') return <DonorDashboard />;
    if (role === 'hospital') return <HospitalDashboard />;

    if (role === 'blood-bank') {
      if (activeNav === 'inventories') return <BloodBankInventories />;
      if (activeNav === 'active-requests')
        return <BloodBankActiveRequests />;
      return <BloodBankDashboard />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          ${isCollapsed ? 'w-16' : 'w-64'}
          bg-[#171717] border-r border-white/10
          flex flex-col transition-all duration-300 overflow-hidden
        `}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          {!isCollapsed && (
            <a href="/" className="flex items-center gap-3">
              <img src={imgLogo} className="w-9 h-9" alt="BloodSync Logo" />
              <div className="font-bold tracking-tight text-lg">
                <span className="text-white">BLOOD</span>
                <span className="text-[#dc2626]">SYNC</span>
              </div>
            </a>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 text-[#a3a3a3] hover:text-white"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight
              className={`w-6 h-6 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 p-4 space-y-1">
          {config.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`
                w-full flex items-center py-3 rounded-lg transition-colors
                ${isCollapsed ? 'justify-center' : 'justify-between px-4'}
                ${
                  activeNav === item.id
                    ? 'bg-[#dc2626] text-white'
                    : 'text-[#a3a3a3] hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <div
                className={`flex items-center ${
                  isCollapsed ? '' : 'gap-3'
                }`}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </div>

              {!isCollapsed && item.badge && (
                <span className="bg-[#dc2626] text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            onClick={onLogout}
            title={isCollapsed ? 'Logout' : undefined}
            className={`
              w-full flex items-center py-3 rounded-lg transition-colors
              ${isCollapsed ? 'justify-center' : 'gap-3 px-4'}
              text-[#a3a3a3] hover:text-white hover:bg-white/5
            `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#171717] border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-white text-xl font-semibold">
              {config.title}
            </h1>
            <div className="text-sm text-[#a3a3a3] mt-1">
              Dashboard &gt; Overview
            </div>
          </div>

          {/* 🔔 Notification bell — ONLY DONOR */}
          {role === 'donor' && (
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-white/10 text-[#a3a3a3] hover:text-white transition-colors"
                title="Notifications"
              >
                <Bell className="w-6 h-6" />
              </button>
              <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          )}
        </header>

        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/* ================= BLOOD BANK – ACTIVE REQUESTS ================= */

function BloodBankActiveRequests() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-white text-xl">Active Blood Requests</h2>
      <p className="text-[#a3a3a3]">
        Active blood request cards will appear here.
      </p>
    </div>
  );
}
