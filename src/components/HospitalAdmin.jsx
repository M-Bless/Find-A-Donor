import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Bell, UserCircle } from 'lucide-react'; // Icons from lucide-react

const HospitalDashboard = () => {
  const completed = 120;
  const pending = 45;

  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
        {/* Right Side: Notification + Profile */}
        <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                 Manage Doctors
            </button>
            <Bell className="w-6 h-6 text-blue-700 hover:text-blue-900 cursor-pointer" />
            <UserCircle className="w-8 h-8 text-blue-700 hover:text-blue-900 cursor-pointer" />
        </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-blue-800 mb-6">Hospital Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-green-400">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Completed Donations</h2>
          <p className="text-3xl font-bold text-green-600">{completed}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-yellow-400">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Pending Verifications</h2>
          <p className="text-3xl font-bold text-yellow-600">{pending}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Donation Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HospitalDashboard;