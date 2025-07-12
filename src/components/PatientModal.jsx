import React, { useState, useEffect } from 'react';

const PatientModal = ({ patient, isOpen, onClose, onSave, mode = 'view' }) => {
  const [editedPatient, setEditedPatient] = useState({});
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  // Update editedPatient when patient changes
  useEffect(() => {
    if (patient) {
      setEditedPatient({ ...patient });
    }
  }, [patient]);

  // Update editing mode when mode prop changes
  useEffect(() => {
    setIsEditing(mode === 'edit');
  }, [mode]);

  const handleInputChange = (field, value) => {
    setEditedPatient(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedPatient);
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original patient data
    if (patient) {
      setEditedPatient({ ...patient });
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    // Ensure we have the latest patient data when starting to edit
    if (patient) {
      setEditedPatient({ ...patient });
    }
    setIsEditing(true);
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-green-600">
                      {patient.name === '' 
                        ? '+' 
                        : patient.name.split(' ').map(n => n[0]).join('')
                      }
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditing 
                      ? (patient.name === '' ? 'Add New Patient' : 'Edit Patient') 
                      : 'Patient Details'
                    }
                  </h3>
                  <p className="text-sm text-gray-500">{patient.id}</p>
                  {isEditing && (
                    <p className="text-xs text-blue-600 mt-1">
                      {patient.name === '' 
                        ? 'Please fill in all required fields to add a new patient.'
                        : 'Current details are pre-filled. Modify only the fields you need to change.'
                      }
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Basic Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPatient.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedPatient.age || ''}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.age} years old</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    {isEditing ? (
                      <select
                        value={editedPatient.bloodType || ''}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-900">{patient.bloodType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedPatient.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedPatient.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Medical Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                    {isEditing ? (
                      <textarea
                        value={editedPatient.diagnosis || ''}
                        onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.diagnosis}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                    {isEditing ? (
                      <select
                        value={editedPatient.priority || ''}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Priority</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        patient.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        patient.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.priority}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    {isEditing ? (
                      <select
                        value={editedPatient.status || ''}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Matched">Matched</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                        patient.status === 'Matched' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wait Time</label>
                    <p className="text-sm text-gray-900">{patient.waitTime}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPatient.doctor || ''}
                        onChange={(e) => handleInputChange('doctor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.doctor}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedPatient.lastVisit || ''}
                        onChange={(e) => handleInputChange('lastVisit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{patient.lastVisit}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {isEditing && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSave}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-300"
              >
                {patient.name === '' ? 'Add Patient' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
