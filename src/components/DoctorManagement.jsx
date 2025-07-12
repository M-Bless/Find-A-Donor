import React, { useState } from 'react';
import { Eye, Pencil, Trash2, UserPlus } from 'lucide-react';

// Simple Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow mb-8">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <span className="font-bold text-xl text-green-700">Find-A-Donor</span>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><a href="/hospital-admin" className="hover:text-green-700">Dashboard</a></li>
        <li><a href="/doctor-management" className="hover:text-green-700">Doctors</a></li>
        <li><a href="/patient-management" className="hover:text-green-700">Patients</a></li>
        <li><a href="/logout" className="hover:text-green-700">Logout</a></li>
      </ul>
    </div>
  </nav>
);

const initialDoctors = [
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
];

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    specialization: '',
    phone: '',
    email: '',
    patients: '',
    status: 'Active',
    location: '',
    lastActive: '',
  });
  const [editMode, setEditMode] = useState(false);

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Add/Edit Doctor
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.id ||
      !formData.name ||
      !formData.specialization ||
      !formData.phone ||
      !formData.email ||
      !formData.location ||
      !formData.lastActive
    ) {
      alert('Please fill all fields.');
      return;
    }
    if (editMode) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === formData.id ? { ...formData, patients: Number(formData.patients) } : doc
        )
      );
    } else {
      if (doctors.some((doc) => doc.id === formData.id)) {
        alert('Doctor ID already exists.');
        return;
      }
      setDoctors((prev) => [
        ...prev,
        { ...formData, patients: Number(formData.patients) },
      ]);
    }
    setShowForm(false);
    setFormData({
      id: '',
      name: '',
      specialization: '',
      phone: '',
      email: '',
      patients: '',
      status: 'Active',
      location: '',
      lastActive: '',
    });
    setEditMode(false);
  };

  // View Doctor
  const handleView = (doctor) => {
    alert(
      `Doctor Info:\n\nName: ${doctor.name}\nID: ${doctor.id}\nSpecialization: ${doctor.specialization}\nPhone: ${doctor.phone}\nEmail: ${doctor.email}\nPatients: ${doctor.patients}\nStatus: ${doctor.status}\nLocation: ${doctor.location}\nLast Active: ${doctor.lastActive}`
    );
  };

  // Edit Doctor
  const handleEdit = (doctor) => {
    setFormData({ ...doctor });
    setShowForm(true);
    setEditMode(true);
  };

  // Delete Doctor
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  // Add New Doctor Button
  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      specialization: '',
      phone: '',
      email: '',
      patients: '',
      status: 'Active',
      location: '',
      lastActive: '',
    });
    setShowForm(true);
    setEditMode(false);
  };

  // Form Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setFormData({
      id: '',
      name: '',
      specialization: '',
      phone: '',
      email: '',
      patients: '',
      status: 'Active',
      location: '',
      lastActive: '',
    });
  };

  return (
    <>
      <Navbar />
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
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
            </select>
          </div>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            onClick={handleAddNew}
          >
            <UserPlus className="w-5 h-5" /> Add New Doctor
          </button>
        </div>

        {/* Add/Edit Doctor Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="id"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Doctor ID"
                    value={formData.id}
                    onChange={handleChange}
                    disabled={editMode}
                  />
                  <input
                    type="text"
                    name="name"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="specialization"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="location"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="phone"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="patients"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Patients"
                    value={formData.patients}
                    onChange={handleChange}
                    min={0}
                  />
                  <input
                    type="date"
                    name="lastActive"
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Last Active"
                    value={formData.lastActive}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    name="status"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    {editMode ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                    <button
                      onClick={() => handleView(doc)}
                      className="text-green-600 hover:text-green-800"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
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
    </>
  );
};

export default DoctorManagement;