import React from 'react';
import { AlertTriangle, Users, ClipboardCheck, Check, X, Clock, MapPin, Truck, Plus, AlertOctagon } from 'lucide-react';
import { useState } from 'react';

export function HospitalDashboard() {
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCreateRequest = () => {
    setShowCreateRequestModal(true);
  };

  const handleActivatePanicMode = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-8 bg-green-900/90 border border-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span>Emergency alert sent to all nearby blood banks!</span>
          </div>
        </div>
      )}            

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Requests"
          value="12"
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="critical"
        />
        <StatCard
          title="Pending Approval"
          value="5"
          icon={<ClipboardCheck className="w-6 h-6" />}
          variant="warning"
        />
        <StatCard
          title="Fulfilled Today"
          value="18"
          icon={<Check className="w-6 h-6" />}
          variant="success"
        />
      </div>

      {/* My Blood Requests Table */}
      <div className="bg-[#171717] border border-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white">My Blood Requests</h2>
          <p className="text-[#a3a3a3] text-sm mt-1">
            Track status of blood requests sent to blood banks
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Request ID</th>
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Blood Group</th>
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Units</th>
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Urgency</th>
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Blood Bank</th>
                <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <RequestRow
                requestId="REQ-2847"
                bloodGroup="O-"
                units="3"
                urgency="Critical"
                bloodBank="City Blood Bank"
                status="Approved"
                urgencyLevel="critical"
                statusType="approved"
              />
              <RequestRow
                requestId="REQ-2846"
                bloodGroup="A+"
                units="2"
                urgency="High"
                bloodBank="Apollo Blood Services"
                status="Pending"
                urgencyLevel="high"
                statusType="pending"
              />
              <RequestRow
                requestId="REQ-2845"
                bloodGroup="B+"
                units="4"
                urgency="Critical"
                bloodBank="Max Blood Center"
                status="Pending"
                urgencyLevel="critical"
                statusType="pending"
              />
              <RequestRow
                requestId="REQ-2843"
                bloodGroup="AB+"
                units="2"
                urgency="High"
                bloodBank="Red Cross Blood Center"
                status="Approved"
                urgencyLevel="high"
                statusType="approved"
              />
              <RequestRow
                requestId="REQ-2841"
                bloodGroup="A-"
                units="1"
                urgency="Normal"
                bloodBank="City Blood Bank"
                status="Pending"
                urgencyLevel="normal"
                statusType="pending"
              />
            </tbody>
          </table>
        </div>
      </div>

      

      

      


      {/* Upcoming Donation Drives */}
      <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-6">Blood Donation Drives</h2>
        <div className="space-y-4">
          <DriveItem
            title="Community Blood Drive"
            location="Sector 21 Community Center"
            date="Jan 10, 2026"
            time="9:00 AM - 5:00 PM"
          />
          <DriveItem
            title="Corporate Donation Camp"
            location="Tech Park, Phase 2"
            date="Jan 15, 2026"
            time="10:00 AM - 4:00 PM"
          />
        </div>
      </div>

      {/* Create Request Modal */}
      {showCreateRequestModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCreateRequestModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#171717] border border-white/10 rounded-lg shadow-2xl z-50">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white">Create Blood Request</h2>
              <button
                onClick={() => setShowCreateRequestModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[#a3a3a3] text-xs mb-2 block">Blood Group</label>
                  <select className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#a3a3a3] text-xs mb-2 block">Units Required</label>
                  <input
                    type="number"
                    className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    placeholder="Enter number of units"
                    defaultValue="2"
                  />
                </div>
                <div>
                  <label className="text-[#a3a3a3] text-xs mb-2 block">Urgency Level</label>
                  <select className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm">
                    <option>Critical - Emergency</option>
                    <option>High - Urgent</option>
                    <option>Medium - Scheduled Surgery</option>
                    <option>Low - Routine</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#a3a3a3] text-xs mb-2 block">Required By</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-[#a3a3a3] text-xs mb-2 block">Patient Details</label>
                  <textarea
                    className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                    rows={3}
                    placeholder="Enter patient details and notes..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateRequestModal(false)}
                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateRequestModal(false);
                  setShowSuccessMessage(true);
                  setTimeout(() => setShowSuccessMessage(false), 3000);
                }}
                className="px-6 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant: 'critical' | 'warning' | 'success';
}

function StatCard({ title, value, icon, variant }: StatCardProps) {
  const variantStyles = {
    critical: 'border-[#dc2626] bg-[#dc2626]/5',
    warning: 'border-orange-700 bg-orange-900/10',
    success: 'border-green-700 bg-green-900/10',
  };

  const iconStyles = {
    critical: 'text-[#dc2626]',
    warning: 'text-orange-500',
    success: 'text-green-500',
  };

  return (
    <div className={`bg-[#171717] border rounded-lg p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-[#a3a3a3] text-sm">{title}</div>
        <div className={iconStyles[variant]}>{icon}</div>
      </div>
      <div className="text-white text-3xl mb-1">{value}</div>
      
    </div>
  );
}

interface RequestRowProps {
  requestId: string;
  bloodGroup: string;
  units: string;
  urgency: string;
  bloodBank: string;
  status: string;
  urgencyLevel: 'critical' | 'high' | 'normal';
  statusType: 'approved' | 'transit' | 'pending';
}

function RequestRow({
  requestId,
  bloodGroup,
  units,
  urgency,
  bloodBank,
  status,
  urgencyLevel,
  statusType,
}: RequestRowProps) {
  const urgencyColors = {
    critical: 'bg-[#dc2626] text-white',
    high: 'bg-orange-900/30 text-orange-400 border border-orange-800',
    normal: 'bg-white/5 text-[#a3a3a3] border border-white/10',
  };

  const statusColors = {
    approved: 'bg-green-900/30 text-green-400',
    transit: 'bg-yellow-900/30 text-yellow-400',
    pending: 'bg-gray-900/30 text-gray-400',
  };

  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="px-6 py-4">
        <div className="text-white text-sm">{requestId}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-white">{bloodGroup}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-white text-sm">{units} units</div>
      </td>
      <td className="px-6 py-4">
        <span className={`text-xs px-3 py-1 rounded-full ${urgencyColors[urgencyLevel]}`}>
          {urgency}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-[#a3a3a3] text-sm">{bloodBank}</div>
      </td>
      <td className="px-6 py-4">
        <div className={`text-sm ${statusColors[statusType]}`}>
          {status}
        </div>
      </td>
    </tr>
  );
}

interface BloodBankCardProps {
  name: string;
  distance: string;
  availability: { [key: string]: number };
  responseTime: string;
  status: 'Available' | 'Unavailable';

}

function BloodBankCard({
  name,
  distance,
  availability,
  responseTime,
  status,
}: BloodBankCardProps) {
  const statusColors = {
    Available: 'bg-green-900/30 text-green-400',
    Unavailable: 'bg-red-900/30 text-red-400',
  };

  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-white mb-1">
            {name}
          </div>
          <div className="text-[#a3a3a3] text-xs">Distance: {distance}</div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
          <MapPin className="w-4 h-4" />
          <span>{distance}</span>
        </div>
        <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
          <Clock className="w-4 h-4" />
          <span>Response Time {responseTime}</span>
        </div>
      </div>

      {/* Availability Table */}
      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-[#a3a3a3] text-sm px-2 py-1">Blood Group</th>
              <th className="text-left text-[#a3a3a3] text-sm px-2 py-1">Units Available</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(availability).map(([group, units]) => (
              <tr key={group} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-2 py-1">
                  <div className="text-white">{group}</div>
                </td>
                <td className="px-2 py-1">
                  <div className="text-white text-sm">{units} units</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface CoordinationCardProps {
  requestId: string;
  bloodGroup: string;
  bloodBank: string;
  distance: string;
  status: string;
  statusVariant: 'success' | 'warning';
}

function CoordinationCard({
  requestId,
  bloodGroup,
  bloodBank,
  distance,
  status,
  statusVariant,
}: CoordinationCardProps) {
  const statusColors = {
    success: 'bg-green-900/30 text-green-400',
    warning: 'bg-yellow-900/30 text-yellow-400',
  };

  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-white mb-1">
            {requestId} • <span className="text-[#dc2626]">{bloodGroup}</span>
          </div>
          <div className="text-[#a3a3a3] text-xs">{bloodBank}</div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColors[statusVariant]}`}>
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
          <MapPin className="w-4 h-4" />
          <span>{distance}</span>
        </div>
        <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${statusVariant === 'success' ? 'bg-green-500 w-3/4' : 'bg-yellow-500 w-1/2'}`} />
      </div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#171717] border border-white/10 rounded-lg p-4">
      <div className="text-[#a3a3a3] text-xs mb-2">{label}</div>
      <div className="text-white text-2xl">{value}</div>
    </div>
  );
}

interface DriveItemProps {
  title: string;
  location: string;
  date: string;
  time: string;
}

function DriveItem({ title, location, date, time }: DriveItemProps) {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-4">
      <div className="text-white text-sm mb-2">{title}</div>
      <div className="text-[#a3a3a3] text-xs mb-1">{location}</div>
      <div className="text-[#a3a3a3] text-xs mb-1">{date}</div>
      <div className="text-[#a3a3a3] text-xs">{time}</div>
    </div>
  );
}
