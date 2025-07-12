import React, { useState, useEffect } from 'react';

const ScheduleModal = ({ isOpen, onClose, onSave, patient = null, mode = 'add' }) => {
  const [scheduleData, setScheduleData] = useState({
    patientId: '',
    patientName: '',
    donorId: '',
    donorName: '',
    surgeryDate: '',
    surgeryTime: '',
    hospital: '',
    surgeonAssigned: '',
    operatingRoom: '',
    priority: 'Medium',
    status: 'Scheduled',
    notes: '',
    preOpChecklist: {
      bloodWork: false,
      imaging: false,
      anesthesiaConsult: false,
      donorCleared: false,
      recipientCleared: false
    }
  });

  const [isEditing, setIsEditing] = useState(mode === 'edit' || mode === 'add');

  // Pre-populate data when viewing or editing existing schedule
  useEffect(() => {
    if (patient && isOpen) {
      if (mode === 'view' || mode === 'edit') {
        // Patient prop is actually a schedule object when viewing/editing
        setScheduleData(patient);
      } else {
        // For add mode, use patient data to pre-populate
        setScheduleData(prev => ({
          ...prev,
          patientId: patient.id,
          patientName: patient.name,
          priority: patient.priority || 'Medium'
        }));
      }
    } else if (!isOpen) {
      // Reset form when modal closes
      setScheduleData({
        patientId: '',
        patientName: '',
        donorId: '',
        donorName: '',
        surgeryDate: '',
        surgeryTime: '',
        hospital: '',
        surgeonAssigned: '',
        operatingRoom: '',
        priority: 'Medium',
        status: 'Scheduled',
        notes: '',
        preOpChecklist: {
          bloodWork: false,
          imaging: false,
          anesthesiaConsult: false,
          donorCleared: false,
          recipientCleared: false
        }
      });
    }
  }, [patient, isOpen, mode]);

  // Update editing mode when mode prop changes
  useEffect(() => {
    setIsEditing(mode === 'edit' || mode === 'add');
  }, [mode]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setScheduleData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setScheduleData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleChecklistChange = (item, checked) => {
    setScheduleData(prev => ({
      ...prev,
      preOpChecklist: {
        ...prev.preOpChecklist,
        [item]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent submission in view mode
    if (!isEditing) {
      return;
    }
    
    // Validate required fields
    if (!scheduleData.patientName || !scheduleData.surgeryDate || !scheduleData.surgeryTime || !scheduleData.hospital) {
      alert('Please fill in all required fields');
      return;
    }

    // Create schedule object with unique ID
    const schedule = {
      id: mode === 'add' ? `SCH-${Date.now()}` : scheduleData.id,
      ...scheduleData,
      createdAt: scheduleData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(schedule);
    setIsEditing(false);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (mode === 'view') {
      if (isEditing) {
        // Reset to original data and switch back to view mode
        if (patient) {
          setScheduleData({ ...patient });
        }
        setIsEditing(false);
      } else {
        // Close modal when in view mode and not editing
        onClose();
      }
    } else {
      // Close modal for add/edit modes
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'view' 
              ? (isEditing ? 'Edit Schedule' : 'View Schedule Details')
              : mode === 'edit' ? 'Edit Schedule' : 'Schedule Transplant'}
          </h2>
          <div className="flex items-center space-x-2">
            {mode === 'view' && !isEditing && (
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient ID *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={scheduleData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.patientId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={scheduleData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.patientName}</p>
              )}
            </div>
          </div>

          {/* Donor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={scheduleData.donorId}
                  onChange={(e) => handleInputChange('donorId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="LD-2024-XXX"
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.donorId || 'Not assigned'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={scheduleData.donorName}
                  onChange={(e) => handleInputChange('donorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter donor name"
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.donorName || 'Not assigned'}</p>
              )}
            </div>
          </div>

          {/* Surgery Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surgery Date *
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={scheduleData.surgeryDate}
                  onChange={(e) => handleInputChange('surgeryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.surgeryDate ? new Date(scheduleData.surgeryDate).toLocaleDateString() : 'Not scheduled'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surgery Time *
              </label>
              {isEditing ? (
                <input
                  type="time"
                  value={scheduleData.surgeryTime}
                  onChange={(e) => handleInputChange('surgeryTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.surgeryTime || 'Not scheduled'}</p>
              )}
            </div>
          </div>

          {/* Hospital and Staff */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital *
              </label>
              {isEditing ? (
                <select
                  value={scheduleData.hospital}
                  onChange={(e) => handleInputChange('hospital', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Hospital</option>
                  <option value="Kenyatta National Hospital">Kenyatta National Hospital</option>
                  <option value="Mater Hospital">Mater Hospital</option>
                  <option value="Nairobi Hospital">Nairobi Hospital</option>
                  <option value="Aga Khan University Hospital">Aga Khan University Hospital</option>
                  <option value="MP Shah Hospital">MP Shah Hospital</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.hospital || 'Not selected'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surgeon Assigned
              </label>
              {isEditing ? (
                <select
                  value={scheduleData.surgeonAssigned}
                  onChange={(e) => handleInputChange('surgeonAssigned', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Surgeon</option>
                  <option value="Dr. Lydia Nanjala">Dr. Lydia Nanjala</option>
                  <option value="Dr. James Mutuku">Dr. James Mutuku</option>
                  <option value="Dr. Sarah Wanjiku">Dr. Sarah Wanjiku</option>
                  <option value="Dr. Peter Kiprotich">Dr. Peter Kiprotich</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.surgeonAssigned || 'Not assigned'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Room
              </label>
              {isEditing ? (
                <select
                  value={scheduleData.operatingRoom}
                  onChange={(e) => handleInputChange('operatingRoom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select OR</option>
                  <option value="OR-1">Operating Room 1</option>
                  <option value="OR-2">Operating Room 2</option>
                  <option value="OR-3">Operating Room 3</option>
                  <option value="OR-4">Operating Room 4</option>
                  <option value="OR-5">Operating Room 5</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.operatingRoom || 'Not assigned'}</p>
              )}
            </div>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={scheduleData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.priority}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              {isEditing ? (
                <select
                  value={scheduleData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Postponed">Postponed</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900 py-2">{scheduleData.status}</p>
              )}
            </div>
          </div>

          {/* Pre-Op Checklist */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pre-Operative Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(scheduleData.preOpChecklist).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleChecklistChange(key, e.target.checked)}
                    className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    disabled={!isEditing}
                  />
                  <span className="text-sm text-gray-700">
                    {key === 'bloodWork' && 'Blood Work Complete'}
                    {key === 'imaging' && 'Imaging Studies Complete'}
                    {key === 'anesthesiaConsult' && 'Anesthesia Consultation'}
                    {key === 'donorCleared' && 'Donor Medical Clearance'}
                    {key === 'recipientCleared' && 'Recipient Medical Clearance'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            {isEditing ? (
              <textarea
                value={scheduleData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter any additional notes or special instructions..."
              />
            ) : (
              <p className="text-sm text-gray-900 py-2 min-h-[100px] bg-gray-50 rounded-lg px-3 border">
                {scheduleData.notes || 'No additional notes'}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 rounded-lg transition duration-300"
            >
              {mode === 'view' && isEditing ? 'Cancel' : mode === 'view' ? 'Close' : 'Cancel'}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300"
              >
                {mode === 'add' ? 'Schedule Surgery' : 'Update Schedule'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
