import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DriveEligibilityCheck } from './DriveEligibilityCheck';

export function DonorDashboard() {
  const [showEligibility, setShowEligibility] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDriveId, setSelectedDriveId] = useState<string | null>(null);
  const [donorProfile, setDonorProfile] = useState<any>(null);
  const [drives, setDrives] = useState<any[]>([]);
  const [bloodBanks, setBloodBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setDonorProfile(user);
    }

    // Fetch upcoming drives
    fetch('http://localhost:5000/api/drives/upcoming')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDrives(data.drives);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching drives:', err);
        setLoading(false);
      });

    // For demo, show some hardcoded blood banks (can be replaced with API later)
    setBloodBanks([
      { name: 'City Blood Bank', distance: '2.3 km', status: 'Open' },
      { name: 'Apollo Blood Services', distance: '4.1 km', status: 'Open' },
      { name: 'Red Cross Blood Center', distance: '5.8 km', status: 'Closed' },
    ]);
  }, []);

  return (
    <>
      {/* ================= Eligibility Modal ================= */}
      <DriveEligibilityCheck
        isOpen={showEligibility}
        onClose={() => {
          setShowEligibility(false);
          setSelectedDriveId(null);
        }}
        onEligible={async () => {
          if (selectedDriveId && donorProfile) {
            try {
              const response = await fetch(`http://localhost:5000/api/drives/${selectedDriveId}/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  donorId: donorProfile.id,
                }),
              });

              const data = await response.json();
              if (data.success) {
                // Refresh drives to show updated registration count
                const drivesRes = await fetch('http://localhost:5000/api/drives/upcoming');
                const drivesData = await drivesRes.json();
                if (drivesData.success) {
                  setDrives(drivesData.drives);
                }
                
                setShowEligibility(false);
                setSelectedDriveId(null);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              }
            } catch (error) {
              console.error('Error registering for drive:', error);
            }
          }
        }}
      />

      {/* ================= Success Toast ================= */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-900/90 border border-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span>Availability updated successfully!</span>
          </div>
        </div>
      )}

      {/* ================= Main Grid ================= */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donor Profile */}
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-6">Donor Profile</h2>

              {loading ? (
                <div className="text-white/60">Loading...</div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <ProfileField label="User ID" value={donorProfile?.id || 'N/A'} />
                  <ProfileField label="Blood Group" value={donorProfile?.bloodGroup || 'Not set'} highlight />
                  <ProfileField label="Location" value={donorProfile?.location || 'N/A'} />
                </div>
              )}
            </div>

            {/* Upcoming Donation Drives */}
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-6">Upcoming Donation Drives</h2>

              {loading ? (
                <div className="text-white/60">Loading drives...</div>
              ) : drives.length === 0 ? (
                <div className="text-white/60">No upcoming drives available</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drives.map((drive) => (
                    <DriveCard
                      key={drive.id}
                      title={drive.title}
                      location={drive.location}
                      date={new Date(drive.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      time={drive.time}
                      organizer={drive.organizer}
                      registrations={drive.registrations}
                      onDonate={() => {
                        setSelectedDriveId(drive.id);
                        setShowEligibility(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-6">
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-4">Nearby Blood Banks</h2>

              <div className="space-y-3">
                <BloodBankCard
                  name="City Blood Bank"
                  distance="2.3 km"
                  status="Open"
                />
                <BloodBankCard
                  name="Apollo Blood Services"
                  distance="4.1 km"
                  status="Open"
                />
                <BloodBankCard
                  name="Red Cross Blood Center"
                  distance="5.8 km"
                  status="Closed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= Reusable Components ================= */

function ProfileField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[#a3a3a3] text-xs mb-1">{label}</div>
      <div
        className={`${
          highlight
            ? 'text-[#dc2626] text-xl font-semibold'
            : 'text-white text-sm'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function DriveCard({
  title,
  location,
  date,
  time,
  organizer,
  registrations,
  onDonate,
}: {
  title: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  registrations?: number;
  onDonate: () => void;
}) {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-5">
      <h3 className="text-white mb-3">{title}</h3>

      <div className="space-y-2 text-[#a3a3a3] text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {time}
        </div>
        <div className="text-xs">Organized by {organizer}</div>
        {registrations !== undefined && (
          <div className="text-xs text-[#dc2626]">Registrations: {registrations}</div>
        )}
      </div>

      <button
        onClick={onDonate}
        className="mt-4 w-full bg-[#dc2626] rounded-lg py-2 text-sm text-white hover:opacity-90 transition-all active:scale-95"
      >
        Donate
      </button>
    </div>
  );
}

function BloodBankCard({
  name,
  distance,
  status,
}: {
  name: string;
  distance: string;
  status: string;
}) {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-lg p-3 flex justify-between items-center">
      <div>
        <div className="text-white text-sm">{name}</div>
        <div className="text-[#a3a3a3] text-xs">{distance}</div>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === 'Open'
            ? 'bg-green-900/30 text-green-400'
            : 'bg-white/5 text-[#a3a3a3]'
        }`}
      >
        {status}
      </span>
    </div>
  );
}
