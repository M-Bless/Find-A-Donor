import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, UserCheck, UserX, Hourglass, Users, Stethoscope } from 'lucide-react';
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
    const generateUniqueId = () => {
      const randomNum = Math.floor(Math.random() * 1000);
      return `KP-2024-${String(randomNum).padStart(3, '0')}`;
    };

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
    console.log('Saving patient:', updatedPatient);
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
              <span className="text-green-200">↗ {trend}%</span> from last month
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
      {/* ... header unchanged ... */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Successfully Matched Recipients"
          value={stats.successfulMatches}
          trend={12}
          bgColor="bg-lime-500"
          textColor="text-white"
          icon={<HeartPulse className="w-10 h-10" />}
        />

        <StatCard
          title="Accepted Donors"
          value={stats.acceptedDonors}
          trend={8}
          bgColor="bg-sky-500"
          textColor="text-white"
          icon={<UserCheck className="w-10 h-10" />}
        />

        <StatCard
          title="Rejected Donors"
          value={stats.rejectedDonors}
          trend={-15}
          bgColor="bg-rose-500"
          textColor="text-white"
          icon={<UserX className="w-10 h-10" />}
        />

        <StatCard
          title="Pending Cases"
          value={stats.pendingCases}
          bgColor="bg-orange-400"
          textColor="text-white"
          icon={<Hourglass className="w-10 h-10" />}
        />

        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          bgColor="bg-indigo-500"
          textColor="text-white"
          icon={<Users className="w-10 h-10" />}
        />

        <StatCard
          title="Active Transplants"
          value={stats.activeTransplants}
          bgColor="bg-emerald-500"
          textColor="text-white"
          icon={<Stethoscope className="w-10 h-10" />}
        />
      </div>

      {/* ...rest of the dashboard unchanged... */}

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
