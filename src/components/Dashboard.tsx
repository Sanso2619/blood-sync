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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <aside
        className={`
          ${isCollapsed ? 'w-16' : 'w-64'}
          bg-[#171717] border-r border-white/10 
          flex flex-col transition-all duration-300 ease-in-out
          overflow-hidden
        `}
      >
        {/* Logo + Collapse Toggle */}
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
            className={`
              p-2 rounded-lg hover:bg-white/10 text-[#a3a3a3] hover:text-white transition-colors
              ${isCollapsed ? 'mx-auto' : ''}
            `}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {config.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`
                w-full flex items-center 
                ${isCollapsed ? 'justify-center' : 'justify-between px-4'}
                py-3 rounded-lg transition-colors
                ${activeNav === item.id
                  ? 'bg-[#dc2626] text-white'
                  : 'text-[#a3a3a3] hover:bg-white/5 hover:text-white'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                {item.icon}
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span className="bg-[#dc2626] text-white text-xs px-2 py-0.5 rounded-full">
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

        {/* Logout at the bottom of sidebar */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            onClick={onLogout}
            className={`
              w-full flex items-center 
              ${isCollapsed ? 'justify-center' : 'gap-3 px-4'}
              py-3 text-[#a3a3a3] hover:text-white hover:bg-white/5 rounded-lg transition-colors
            `}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#171717] border-b border-white/10 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-white text-xl font-semibold">{config.title}</h1>
            <div className="text-sm text-[#a3a3a3] mt-1">
              Dashboard &gt; Overview
            </div>
          </div>

          {/* Notification bell */}
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
        </header>

        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </div>
      {/* Main */}
      <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
}

/* ============================= */
/* BLOOD BANK – ACTIVE REQUESTS (placeholder) */
/* ============================= */

function BloodBankActiveRequests() {
  return (
    <div className="text-white text-xl">
      Active Blood Requests content goes here...
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
