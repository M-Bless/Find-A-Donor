import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientModal from './PatientModal';

const DoctorDashboard = () => {
  // Mock data
  const stats = {
    successfulMatches: 156,
    acceptedDonors: 89,
    rejectedDonors: 23,
    pendingCases: 45,
    totalPatients: 234,
    activeTransplants: 12
  };

  // State for modal
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');

  // Urgent cases data
  const urgentCases = [
    {
      id: 'KP-2024-178',
      name: 'Joseph Kimathi',
      age: 45,
      bloodType: 'O+',
      diagnosis: 'Chronic Kidney Disease',
      waitTime: '18 months',
      priority: 'Critical',
      status: 'Active',
      email: 'joseph.kimathi@email.com',
      phone: '+(254) 700 123 789',
      doctor: 'Dr. Lydia Nanjala',
      lastVisit: '2024-12-28'
    },
    {
      id: 'KP-2024-162',
      name: 'Sarah Chepchumba',
      age: 38,
      bloodType: 'A-',
      diagnosis: 'Polycystic Kidney Disease',
      waitTime: '14 months',
      priority: 'High',
      status: 'Active',
      email: 'sarah.chepchumba@email.com',
      phone: '+(254) 700 234 567',
      doctor: 'Dr. Lydia Nanjala',
      lastVisit: '2024-12-25'
    }
  ];

  // Modal handlers
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleAddPatient = () => {
    // Generate a unique ID (in a real app, this would be handled by the database)
    const generateUniqueId = () => {
      const randomNum = Math.floor(Math.random() * 1000);
      return `KP-2024-${String(randomNum).padStart(3, '0')}`;
    };

    // Create a blank patient template for adding new patient
    const blankPatient = {
      id: generateUniqueId(),
      name: '',
      age: '',
      bloodType: '',
      diagnosis: '',
      waitTime: '0 months',
      priority: 'Medium',
      status: 'Active',
      email: '',
      phone: '',
      doctor: 'Dr. Lydia Nanjala',
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setSelectedPatient(blankPatient);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSavePatient = (updatedPatient) => {
    // In a real app, this would save to the database
    console.log('Saving patient:', updatedPatient);
    // You could also redirect to the patient management page after saving
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const StatCard = ({ title, value, icon, bgColor, textColor, trend }) => (
    <div className={`${bgColor} rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textColor} text-sm font-medium opacity-80`}>{title}</p>
          <p className={`${textColor} text-3xl font-bold mt-2`}>{value}</p>
          {trend && (
            <p className={`${textColor} text-sm mt-1 opacity-70`}>
              <span className="text-green-400">↗ {trend}%</span> from last month
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition duration-300">
                Find A Donor
              </Link>
              <span className="ml-4 text-gray-500">|</span>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/patient-management" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Patients
              </Link>
              <Link 
                to="/doctor-profile" 
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Successfully Matched Recipients"
          value={stats.successfulMatches}
          trend={12}
          bgColor="bg-gradient-to-r from-green-500 to-green-600"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Accepted Donors"
          value={stats.acceptedDonors}
          trend={8}
          bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />

        <StatCard
          title="Rejected Donors"
          value={stats.rejectedDonors}
          trend={-15}
          bgColor="bg-gradient-to-r from-red-500 to-red-600"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Pending Cases"
          value={stats.pendingCases}
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <StatCard
          title="Active Transplants"
          value={stats.activeTransplants}
          bgColor="bg-gradient-to-r from-teal-500 to-teal-600"
          textColor="text-white"
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New donor match found</p>
                <p className="text-xs text-gray-500">Patient ID: KP-2024-156 • 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Donor application approved</p>
                <p className="text-xs text-gray-500">Donor ID: LD-2024-089 • 4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Transplant scheduled</p>
                <p className="text-xs text-gray-500">Surgery Date: Jan 15, 2025 • 6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleAddPatient}
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition duration-300 text-center"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium">Add Patient</span>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition duration-300 text-center">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">Find Match</span>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition duration-300 text-center">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium">View Reports</span>
            </button>
            
            <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg transition duration-300 text-center">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Cases */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Urgent Cases Requiring Attention</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {urgentCases.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.waitTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      patient.priority === 'High' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewPatient(patient)}
                      className="text-green-600 hover:text-green-900 transition duration-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </main>

      {/* Patient Modal */}
      <PatientModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePatient}
        mode={modalMode}
      />
    </div>
  );
};

export default DoctorDashboard;
