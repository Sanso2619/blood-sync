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

      {/* SUCCESS POPUP */}
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

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Available Blood Units"
          value="482"
          subtitle="Across all blood groups"
          icon={<Package className="w-6 h-6" />}
          variant="normal"
        />

        <StatCard
          title="Hospital Requests Pending"
          value="8"
          subtitle="Awaiting response"
          icon={<AlertCircle className="w-6 h-6" />}
          variant="danger"
        />
      </div>

      {/* BOOTSTRAP SIDE-BY-SIDE SECTIONS */}
      <div className="row g-4">

        {/* LEFT */}
        <div className="col-12 col-md-6">
          <div className="bg-[#171717] border border-white/10 rounded-xl p-6 h-100">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-white/60" />
              <h2 className="text-white text-lg">
                Schedule Donation Drive
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Drive Name
                </label>
                <input
                  type="text"
                  placeholder="Enter drive name"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Drive Date
                </label>
                <input
                  type="date"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <button
                onClick={handleScheduleDrive}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-2 rounded-lg font-medium"
              >
                Schedule Drive
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-md-6">
          <div className="bg-[#171717] border border-white/10 rounded-xl p-6 h-100">
            <h2 className="text-white text-lg mb-4">
              Scheduled Donation Drives
            </h2>

            <div className="space-y-4">
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
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "normal" | "danger";
}) {
  const styles =
    variant === "danger"
      ? "border-red-600 bg-red-900/20"
      : "border-white/10";

  return (
    <div className={`bg-[#171717] border rounded-lg p-6 ${styles}`}>
      <div className="flex justify-between mb-4 text-white">
        {title}
        {icon}
      </div>
      <div className="text-3xl text-white">{value}</div>
      <div className="text-sm text-[#a3a3a3]">{subtitle}</div>
    </div>
  );
}

function DriveItem({
  title,
  date,
  registrations,
}: {
  title: string;
  date: string;
  registrations: string;
}) {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-4">
      <div className="text-white">{title}</div>
      <div className="text-[#a3a3a3] text-sm">{date}</div>
      <div className="text-[#a3a3a3] text-sm">
        Registrations: {registrations}
      </div>
    </div>
  );
}
