import { useState } from 'react';
import { Check } from 'lucide-react';

type Request = {
  id: string;
  bloodGroup: string;
  units: string;
  status: 'Pending' | 'Approved';
};

export function HospitalRequests() {
  const [hospitalName, setHospitalName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 'REQ-1001',
      bloodGroup: 'O+',
      units: '2',
      status: 'Pending',
    },
  ]);

  const handleSubmit = () => {
    if (!hospitalName || !bloodGroup || !units) return;

    const newRequest: Request = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      bloodGroup,
      units,
      status: 'Pending',
    };

    setRequests((prev) => [newRequest, ...prev]);
    setShowSuccess(true);

    setHospitalName('');
    setBloodGroup('');
    setUnits('');

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-900/90 border border-green-700 text-white px-6 py-4 rounded-lg shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span>Blood request created successfully!</span>
          </div>
        </div>
      )}

      {/* Create Request */}
      <div className="bg-[#171717] border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-4">Create Blood Request</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital Name"
            className="bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
          />

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="Units Required"
            className="bg-[#0e0e10] border border-white/10 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg transition-colors"
        >
          Submit Request
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-[#171717] border border-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white">My Requests</h2>
          <p className="text-[#a3a3a3] text-sm mt-1">
            Blood requests created by your hospital
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-[#a3a3a3] text-sm">
                  Request ID
                </th>
                <th className="px-6 py-4 text-left text-[#a3a3a3] text-sm">
                  Blood Group
                </th>
                <th className="px-6 py-4 text-left text-[#a3a3a3] text-sm">
                  Units
                </th>
                <th className="px-6 py-4 text-left text-[#a3a3a3] text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white">{req.id}</td>
                  <td className="px-6 py-4 text-white">{req.bloodGroup}</td>
                  <td className="px-6 py-4 text-white">{req.units}</td>
                  <td className="px-6 py-4 text-yellow-400">
                    {req.status}
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-6 text-center text-[#a3a3a3]"
                  >
                    No requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}