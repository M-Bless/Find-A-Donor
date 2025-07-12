import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientModal from './PatientModal';
import { Card, CardContent } from '../components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

const HospitalDashboard = () => {
  const stats = [
    { label: 'Registered Hospitals', value: 52 },
    { label: 'Partnered Labs', value: 17 },
    { label: 'Active Doctors', value: 128 },
    { label: 'Pending Approvals', value: 6 }
  ];

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
              <Link 
                to="/doctor-management" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Doctors
              </Link>
              <Link 
                to="/admin-profile" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Profile
              </Link>
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-green-100 to-green-200 text-green-900 shadow-md">
              <CardContent className="p-6">
                <h4 className="text-sm font-semibold tracking-wide text-green-800 uppercase mb-2">
                  {stat.label}
                </h4>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hospital Statistics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" barSize={40} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;