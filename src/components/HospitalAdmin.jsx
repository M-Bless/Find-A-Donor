import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  UserCheck,
  UserX,
  Hourglass,
  Users,
  Stethoscope
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

const HospitalDashboard = () => {
  // Data for chart
const chartStats = [
  { key: 'registeredHospitals', label: 'Registered Hospitals', value: 52, color: '#84cc16' },  // lime-500
  { key: 'partneredLabs', label: 'Partnered Labs', value: 17, color: '#0ea5e9' },              // sky-500
  { key: 'activeDoctors', label: 'Active Doctors', value: 128, color: '#f43f5e' },             // rose-500
  { key: 'pendingApprovals', label: 'Pending Approvals', value: 6, color: '#f97316' }          // orange-400
];


  // Data for stat cards
  const cardStats = {
    successfulMatches: 34,
    acceptedDonors: 21,
    rejectedDonors: 9,
    pendingCases: 14,
    totalPatients: 230,
    activeTransplants: 5
  };

  const StatCard = ({ title, value, icon, bgColor, textColor, trend }) => (
    <div className={`${bgColor} rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textColor} text-sm font-medium opacity-80`}>{title}</p>
          <p className={`${textColor} text-3xl font-bold mt-2`}>{value}</p>
          {trend !== undefined && (
            <p className={`${textColor} text-sm mt-1 opacity-70`}>
              <span className={trend >= 0 ? 'text-green-200' : 'text-red-300'}>
                {trend >= 0 ? `↗ ${trend}%` : `↘ ${Math.abs(trend)}%`}
              </span> from last month
            </p>
          )}
        </div>
        <div className={`${textColor} opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition duration-300">
                Find A Donor
              </Link>
              <span className="ml-4 text-gray-500">|</span>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/doctor-management" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Doctors</Link>
              <Link to="/admin-profile" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Profile</Link>
              <Link to="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-100 py-8">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Successfully Matched Recipients" value={cardStats.successfulMatches} trend={12} bgColor="bg-lime-500" textColor="text-white" icon={<HeartPulse className="w-10 h-10" />} />
            <StatCard title="Accepted Donors" value={cardStats.acceptedDonors} trend={8} bgColor="bg-sky-500" textColor="text-white" icon={<UserCheck className="w-10 h-10" />} />
            <StatCard title="Rejected Donors" value={cardStats.rejectedDonors} trend={-15} bgColor="bg-rose-500" textColor="text-white" icon={<UserX className="w-10 h-10" />} />
            <StatCard title="Pending Cases" value={cardStats.pendingCases} bgColor="bg-orange-400" textColor="text-white" icon={<Hourglass className="w-10 h-10" />} />
            <StatCard title="Total Patients" value={cardStats.totalPatients} bgColor="bg-indigo-500" textColor="text-white" icon={<Users className="w-10 h-10" />} />
            <StatCard title="Active Transplants" value={cardStats.activeTransplants} bgColor="bg-emerald-500" textColor="text-white" icon={<Stethoscope className="w-10 h-10" />} />
          </div>

          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Hospital Statistics Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" barSize={40} radius={[6, 6, 0, 0]} name="Statistics">
                    {chartStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;