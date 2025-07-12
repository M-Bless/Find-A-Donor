import React, { useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 'DR-001',
      name: 'Dr. Lydia Nanjala',
      specialization: 'Nephrologist',
      phone: '+(254) 701 123 456',
      email: 'lydia.nanjala@hospital.org',
      patients: 34,
      status: 'Active',
      location: 'Nairobi Hospital',
      lastActive: '2025-07-09',
    },
    {
      id: 'DR-002',
      name: 'Dr. Sarah Johnson',
      specialization: 'Transplant Surgeon',
      phone: '+1 (555) 567-8901',
      email: 'sarah.johnson@clinic.com',
      patients: 12,
      status: 'On Leave',
      location: 'Johns Hopkins',
      lastActive: '2025-06-30',
    },
    {
      id: 'DR-003',
      name: 'Dr. Emmanuel Muriithi',
      specialization: 'Dialysis Specialist',
      phone: '+(254) 703 456 789',
      email: 'emmanuel.muriithi@dialysis.org',
      patients: 20,
      status: 'Active',
      location: 'Kenyatta National Hospital',
      lastActive: '2025-07-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (doctor) => {
    alert('Viewing: ' + doctor.name);
  };

  const handleEdit = (doctor) => {
    alert('Editing: ' + doctor.name);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
        <p className="text-gray-600">Manage doctors in the system</p>
      </div>

      {/* Filter & Add Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search by name, ID, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
          </select>

        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          + Add New Doctor
        </button>
      </div>

      {/* Doctor Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-6 py-3">Doctor Info</th>
              <th className="px-6 py-3">Specialization</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Patients</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Last Active</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredDoctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-gray-500 text-xs">{doc.id}</div>
                  <div className="text-gray-500 text-xs">{doc.phone}</div>
                </td>
                <td className="px-6 py-4">{doc.specialization}</td>
                <td className="px-6 py-4">{doc.location}</td>
                <td className="px-6 py-4">{doc.patients}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      doc.status === 'Active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4">{doc.lastActive}</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleView(doc)} className="text-green-600 hover:text-green-800" title="View">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleEdit(doc)} className="text-blue-600 hover:text-blue-800" title="Edit">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-800" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDoctors.length === 0 && (
          <div className="text-center py-10 text-gray-500">No doctors found.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorManagement;