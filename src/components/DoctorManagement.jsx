import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Eye, Trash2 } from 'lucide-react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, firstName: 'Lydia', lastName: 'Nanjala', email: 'lydia.nanjala@example.com', title: 'Nephrologist' },
    { id: 2, firstName: 'James', lastName: 'Barasa', email: 'james.barasa@example.com', title: 'Transplant Surgeon' },
    { id: 3, firstName: 'Grace', lastName: 'Odhiambo', email: 'grace.odhiambo@example.com', title: 'Physician' }
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setDoctors(doctors.map(doc => (doc.id === selectedDoctor.id ? selectedDoctor : doc)));
    setIsModalOpen(false);
  };

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
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Doctor Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/hospital-admin" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Dashboard
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">First Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Last Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button title="View" className="text-green-600 hover:text-green-900">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        title="Edit"
                        onClick={() => handleEdit(doctor)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button title="Delete" className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Doctor</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="First Name"
                  value={selectedDoctor.firstName}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, firstName: e.target.value })}
                />
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Last Name"
                  value={selectedDoctor.lastName}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, lastName: e.target.value })}
                />
                <input
                  type="email"
                  className="col-span-2 border p-2 rounded w-full"
                  placeholder="Email"
                  value={selectedDoctor.email}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, email: e.target.value })}
                />
                <input
                  type="text"
                  className="col-span-2 border p-2 rounded w-full"
                  placeholder="Professional Title"
                  value={selectedDoctor.title}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, title: e.target.value })}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorManagement;
