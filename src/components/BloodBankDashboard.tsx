import {
  Package,
  AlertCircle,
  Calendar,
  Check,
} from "lucide-react";
import { useState } from "react";

export function BloodBankDashboard() {
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false);

  const handleScheduleDrive = () => {
    setShowScheduleSuccess(true);
    setTimeout(() => setShowScheduleSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* POPUP SUCCESS */}
      {showScheduleSuccess && (
        <div className="fixed top-24 right-8 bg-green-900/90 border border-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <div>
              <div className="font-medium">Scheduled Successfully</div>
              <div className="text-sm text-white/80">
                Donation drive created
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATS (Requests Granted Today REMOVED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Available Blood Units"
          value="482"
          subtitle="Across all blood groups"
          icon={<Package className="w-6 h-6" />}
          variant="neutral"
        />
        <StatCard
          title="Hospital Requests Pending"
          value="8"
          subtitle="Awaiting response"
          icon={<AlertCircle className="w-6 h-6" />}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* BLOOD INVENTORY */}
          <div className="bg-[#171717] border border-white/10 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-white">Blood Inventory</h2>
              <p className="text-[#a3a3a3] text-sm mt-1">
                Blood group-wise availability
              </p>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">
                    Blood Group
                  </th>
                  <th className="text-left text-[#a3a3a3] text-sm px-6 py-4">
                    Units Available
                  </th>
                </tr>
              </thead>
              <tbody>
                {["O+","O-","A+","A-","B+","B-","AB+","AB-"].map((group) => (
                  <tr
                    key={group}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="px-6 py-4 text-white">{group}</td>
                    <td className="px-6 py-4 text-[#a3a3a3] italic">
                      -- enter units --
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PLATELET INVENTORY (TEXT ONLY) */}
          <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
            <h2 className="text-white mb-2">Platelet Inventory</h2>
            <p className="text-[#a3a3a3] text-sm">Units Available:</p>
            <p className="text-white italic mt-1">-- enter units --</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* SCHEDULE DRIVE */}
          <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-white/60" />
              <h2 className="text-white">Schedule Donation Drive</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Drive Name
                </label>
                <input
                  type="text"
                  placeholder="Enter drive name"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Drive Date
                </label>
                <input
                  type="date"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                />
              </div>

              <button
                onClick={handleScheduleDrive}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Schedule Drive
              </button>
            </div>
          </div>

          {/* SCHEDULED DRIVES */}
          <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
            <h2 className="text-white mb-4">Scheduled Donation Drives</h2>

            <DriveItem
              title="Community Blood Drive"
              date="Jan 10, 2026"
              registrations="42"
            />
            <DriveItem
              title="Corporate Camp - Tech Park"
              date="Jan 15, 2026"
              registrations="28"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value, subtitle, icon, variant }: any) {
  const styles: any = {
    warning: "border-orange-700 bg-orange-900/10",
    neutral: "border-white/10",
  };

  return (
    <div className={`bg-[#171717] border rounded-lg p-6 ${styles[variant]}`}>
      <div className="flex justify-between mb-4 text-white">
        {title}
        {icon}
      </div>
      <div className="text-3xl text-white">{value}</div>
      <div className="text-sm text-[#a3a3a3]">{subtitle}</div>
    </div>
  );
}

function DriveItem({ title, date, registrations }: any) {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-4 mb-3">
      <div className="text-white">{title}</div>
      <div className="text-[#a3a3a3] text-sm">{date}</div>
      <div className="text-[#a3a3a3] text-sm">
        Registrations: {registrations}
      </div>
    </div>
  );
}