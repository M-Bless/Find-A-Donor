import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScheduleModal from './ScheduleModal';
import NotificationPanel from './NotificationPanel';

const ScheduleManagement = () => {
  // Doctor profile data
  const doctorInfo = {
    name: 'Dr. Lydia Nanjala',
    initials: 'LN',
    specialty: 'Nephrology'
  };

  // Mock schedule data
  const [schedules, setSchedules] = useState([
    {
      id: 'SCH-1735123456789',
      patientId: 'KP-2024-001',
      patientName: 'Joseph Kimathi',
      donorId: 'LD-2024-045',
      donorName: 'Mary Wanjiku',
      surgeryDate: '2025-07-20',
      surgeryTime: '08:00',
      hospital: 'Kenyatta National Hospital',
      surgeonAssigned: 'Dr. Lydia Nanjala',
      operatingRoom: 'OR-1',
      priority: 'Critical',
      status: 'Confirmed',
      notes: 'Patient has high priority due to critical condition. Ensure all teams are prepared.',
      preOpChecklist: {
        bloodWork: true,
        imaging: true,
        anesthesiaConsult: true,
        donorCleared: true,
        recipientCleared: false
      },
      createdAt: '2025-07-10T10:30:00Z',
      updatedAt: '2025-07-12T14:20:00Z'
    },
    {
      id: 'SCH-1735123456790',
      patientId: 'KP-2024-002',
      patientName: 'Sarah Chepchumba',
      donorId: 'LD-2024-052',
      donorName: 'David Kiprotich',
      surgeryDate: '2025-07-25',
      surgeryTime: '14:00',
      hospital: 'Mater Hospital',
      surgeonAssigned: 'Dr. James Mutuku',
      operatingRoom: 'OR-3',
      priority: 'High',
      status: 'Scheduled',
      notes: 'Standard transplant procedure. Patient is stable.',
      preOpChecklist: {
        bloodWork: true,
        imaging: false,
        anesthesiaConsult: false,
        donorCleared: true,
        recipientCleared: true
      },
      createdAt: '2025-07-11T09:15:00Z',
      updatedAt: '2025-07-11T09:15:00Z'
    }
  ]);

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  // State for notifications
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'surgery_scheduled',
      title: 'Surgery Confirmed',
      message: 'Transplant surgery for Joseph Kimathi scheduled for July 20, 2025',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
      actionRequired: false,
      patientInfo: {
        name: 'Joseph Kimathi',
        id: 'KP-2024-001',
        bloodType: 'O+'
      }
    },
    {
      id: 2,
      type: 'match_found',
      title: 'New Match Found!',
      message: 'Compatible donor identified for patient Sarah Njoki',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      read: true,
      actionRequired: true,
      patientInfo: {
        name: 'Sarah Njoki',
        id: 'KP-2024-007',
        bloodType: 'AB+'
      }
    }
  ]);

  // Filter schedules
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || schedule.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || schedule.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveSchedule = (scheduleData) => {
    if (modalMode === 'edit') {
      setSchedules(prev => prev.map(s => 
        s.id === scheduleData.id ? { ...scheduleData, updatedAt: new Date().toISOString() } : s
      ));
    } else {
      setSchedules(prev => [...prev, scheduleData]);
    }
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  // Notification handlers
  const handleNotificationToggle = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Postponed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Surgery Schedule</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/doctor-dashboard" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Dashboard
              </Link>
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
              
              {/* Doctor Profile Display */}
              <div className="flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">{doctorInfo.initials}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{doctorInfo.name}</p>
                  <p className="text-xs text-gray-500">{doctorInfo.specialty}</p>
                </div>
              </div>
              
              {/* Notification Bell */}
              <button
                onClick={handleNotificationToggle}
                className="relative p-2 text-gray-500 hover:text-gray-700 rounded-md transition duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 17H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4h-5z" />
                </svg>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <Link 
                to="/" 
                className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 border border-red-200 hover:border-red-300"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search schedules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full sm:w-64"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="All">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Postponed">Postponed</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="All">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <button
              onClick={handleAddSchedule}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Schedule Surgery</span>
            </button>
          </div>
        </div>

        {/* Schedules Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surgery Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surgeon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{schedule.patientName}</div>
                        <div className="text-sm text-gray-500">{schedule.patientId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{schedule.donorName}</div>
                        <div className="text-sm text-gray-500">{schedule.donorId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(schedule.surgeryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(schedule.surgeryTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{schedule.hospital}</div>
                        <div className="text-sm text-gray-500">{schedule.operatingRoom}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.surgeonAssigned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                        {schedule.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewSchedule(schedule)}
                          className="text-green-600 hover:text-green-900 transition duration-300"
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleEditSchedule(schedule)}
                          className="text-blue-600 hover:text-blue-900 transition duration-300"
                          title="Edit Schedule"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="text-red-600 hover:text-red-900 transition duration-300" 
                          title="Delete Schedule"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSchedules.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No schedules found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Schedule Modal */}
      <ScheduleModal
        patient={selectedSchedule}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSchedule}
        mode={modalMode}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};

export default ScheduleManagement;
