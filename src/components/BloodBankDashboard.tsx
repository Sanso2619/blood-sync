import {
  Package,
  AlertCircle,
  Calendar,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";

export function BloodBankDashboard() {
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false);
  const [driveName, setDriveName] = useState('');
  const [driveDate, setDriveDate] = useState('');
  const [driveLocation, setDriveLocation] = useState('');
  const [driveTime, setDriveTime] = useState('');
  const [drives, setDrives] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUnits: 482, pendingRequests: 8 });
  const [loading, setLoading] = useState(true);
  const [bloodBankId, setBloodBankId] = useState<string | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setBloodBankId(user.id);
    }

    // Fetch drives
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/drives/upcoming');
      const data = await response.json();
      if (data.success) {
        // Filter drives for this blood bank
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          const myDrives = data.drives.filter((drive: any) => drive.organizerId === user.id);
          setDrives(myDrives);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching drives:', error);
      setLoading(false);
    }
  };

  const handleScheduleDrive = async () => {
    if (!bloodBankId || !driveName || !driveDate) {
      alert('Please fill in drive name and date');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/blood-bank/drives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodBankId,
          title: driveName,
          date: driveDate,
          location: driveLocation,
          time: driveTime || '9:00 AM - 5:00 PM',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowScheduleSuccess(true);
        setTimeout(() => setShowScheduleSuccess(false), 3000);
        setDriveName('');
        setDriveDate('');
        setDriveLocation('');
        setDriveTime('');
        // Refresh drives list
        fetchDrives();
      } else {
        alert(data.message || 'Failed to create drive');
      }
    } catch (error) {
      console.error('Error creating drive:', error);
      alert('Failed to connect to server');
    }
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
                  value={driveName}
                  onChange={(e) => setDriveName(e.target.value)}
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
                  value={driveDate}
                  onChange={(e) => setDriveDate(e.target.value)}
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={driveLocation}
                  onChange={(e) => setDriveLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[#a3a3a3] text-xs mb-2 block">
                  Time (optional)
                </label>
                <input
                  type="text"
                  value={driveTime}
                  onChange={(e) => setDriveTime(e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
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

            {loading ? (
              <div className="text-white/60">Loading...</div>
            ) : drives.length === 0 ? (
              <div className="text-white/60">No scheduled drives</div>
            ) : (
              <div className="space-y-4">
                {drives.map((drive) => (
                  <DriveItem
                    key={drive.id}
                    title={drive.title}
                    date={new Date(drive.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    registrations={drive.registrations?.toString() || '0'}
                  />
                ))}
              </div>
            )}
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
