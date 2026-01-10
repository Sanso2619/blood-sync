import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { DriveEligibilityCheck } from './DriveEligibilityCheck';

export function DonorDashboard() {
  const [showEligibility, setShowEligibility] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {/* Eligibility Modal */}
      <DriveEligibilityCheck
        isOpen={showEligibility}
        onClose={() => setShowEligibility(false)}
        onEligible={() => {
          setShowEligibility(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }}
      />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-900/90 border border-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span>Availability updated successfully!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Donor Profile */}
          <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
            <h2 className="text-white mb-6">Donor Profile</h2>
            <div className="grid grid-cols-2 gap-6">
              <ProfileField label="User ID" value="123456" />
              <ProfileField label="Blood Group" value="A+" highlight />
              <ProfileField label="Location" value="Sector 21, Delhi" />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donor Profile */}
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-6">Donor Profile</h2>
              <div className="grid grid-cols-2 gap-6">
                <ProfileField label="Blood Group" value="A+" highlight />
                <ProfileField label="Age" value="28 years" />
                <ProfileField label="Weight" value="72 kg" />
                <ProfileField label="Gender" value="Male" />
                <ProfileField label="Last Donation" value="3 months ago" />
                <ProfileField label="Location" value="Sector 21, Delhi" />
              </div>
            </div>

            {/* Upcoming Donation Drives */}
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-6">Upcoming Donation Drives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DriveCard
                  title="Community Blood Drive"
                  location="Sector 21 Community Center"
                  date="Jan 10, 2026"
                  time="9:00 AM - 5:00 PM"
                  organizer="City Blood Bank"
                  onDonate={() => setShowEligibility(true)}
                />

                <DriveCard
                  title="Corporate Blood Donation Camp"
                  location="Tech Park, Phase 2"
                  date="Jan 15, 2026"
                  time="10:00 AM - 4:00 PM"
                  organizer="Apollo Blood Services"
                  onDonate={() => setShowEligibility(true)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
              <h2 className="text-white mb-4">Nearby Blood Banks</h2>
              <div className="space-y-3">
                <BloodBankCard name="City Blood Bank" distance="2.3 km" status="Open" />
                <BloodBankCard name="Apollo Blood Services" distance="4.1 km" status="Open" />
                <BloodBankCard name="Red Cross Blood Center" distance="5.8 km" status="Closed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Components ---------- */

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
      <div className={`text-sm ${highlight ? 'text-[#dc2626] text-xl' : 'text-white'}`}>
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
  onDonate,
}: {
  title: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
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
