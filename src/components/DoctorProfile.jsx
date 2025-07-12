import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';

const DoctorProfile = () => {
  // Mock doctor data - in a real app, this would come from an API
  const [doctorProfile, setDoctorProfile] = useState({
    id: 'DOC-2024-001',
    firstName: 'Lydia',
    lastName: 'Nanjala',
    email: 'dr.lydia.nanjala@findadonor.com',
    phone: '+(254) 700 123 456',
    specialization: 'Nephrology',
    licenseNumber: 'MD-12345-NY',
    hospital: 'Metropolitan General Hospital',
    department: 'Transplant Surgery Department',
    experience: '15 years',
    education: 'MD from University of Nairobi',
    certifications: ['Board Certified Nephrologist', 'Transplant Surgery Certified', 'UNOS Certified'],
    address: {
      street: '123 Medical Center Drive',
      city: 'Nairobi',
      zipCode: '00100',
      country: 'Kenya'
    },
    bio: 'Dr. Lydia Nanjala is a leading nephrologist with over 15 years of experience in kidney transplantation and chronic kidney disease management. She has successfully coordinated over 200 kidney transplants and is passionate about improving patient outcomes.',
    profileImage: null,
    joinDate: '2018-03-15',
    lastLogin: new Date().toISOString()
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [activeTab, setActiveTab] = useState('personal');

  // State for notifications
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'donor_approved',
      title: 'Profile Updated',
      message: 'Your doctor profile has been successfully updated',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      read: false,
      actionRequired: false
    }
  ]);

  // Initialize edited profile when entering edit mode
  const handleEditStart = () => {
    setEditedProfile({ ...doctorProfile });
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditedProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    setDoctorProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would send this data to the server
    console.log('Profile updated:', editedProfile);
  };

  const handleCancel = () => {
    setEditedProfile({});
    setIsEditing(false);
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

  // Doctor info for navbar
  const doctorInfo = {
    name: `Dr. ${doctorProfile.firstName} ${doctorProfile.lastName}`,
    initials: `${doctorProfile.firstName[0]}${doctorProfile.lastName[0]}`,
    specialty: doctorProfile.specialization
  };

  const currentProfile = isEditing ? editedProfile : doctorProfile;

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
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Doctor Profile</h1>
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
                to="/schedule-management" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Schedule
              </Link>
              
              {/* Doctor Profile Display - Current Page */}
              <div className="flex items-center space-x-3 px-3 py-1 bg-green-50 rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">{doctorInfo.initials}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-green-700">{doctorInfo.name}</p>
                  <p className="text-xs text-green-600">{doctorInfo.specialty}</p>
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
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-24 w-24">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-green-600">
                      {currentProfile.firstName[0]}{currentProfile.lastName[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <h2 className="text-3xl font-bold text-white">
                    Dr. {currentProfile.firstName} {currentProfile.lastName}
                  </h2>
                  <p className="text-green-100 text-lg">{currentProfile.specialization}</p>
                  <p className="text-green-100">{currentProfile.hospital}</p>
                  <p className="text-green-100 text-sm">License: {currentProfile.licenseNumber}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={handleEditStart}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'personal'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('professional')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'professional'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Professional Details
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={currentProfile.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={currentProfile.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={currentProfile.address?.street || ''}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={currentProfile.address?.city || ''}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={currentProfile.address?.zipCode || ''}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={currentProfile.address?.country || ''}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">
                    {currentProfile.address?.street}, {currentProfile.address?.city}{currentProfile.address?.state ? `, ${currentProfile.address?.state}` : ''} {currentProfile.address?.zipCode}, {currentProfile.address?.country}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    rows="4"
                    value={currentProfile.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us about yourself and your experience..."
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.specialization || ''}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.licenseNumber || ''}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.licenseNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Clinic</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.hospital || ''}
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.hospital}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.experience || ''}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.experience}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentProfile.education || ''}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentProfile.education}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                {isEditing ? (
                  <textarea
                    rows="3"
                    value={currentProfile.certifications?.join('\n') || ''}
                    onChange={(e) => handleInputChange('certifications', e.target.value.split('\n').filter(cert => cert.trim()))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter each certification on a new line"
                  />
                ) : (
                  <div>
                    {currentProfile.certifications?.map((cert, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <p className="text-gray-900">{new Date(currentProfile.joinDate).toLocaleDateString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                <p className="text-gray-900">{new Date(currentProfile.lastLogin).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300">
                    Enable
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Login Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-500">Windows • Chrome • Nairobi, Kenya</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Active now</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Previous Session</p>
                      <p className="text-sm text-gray-500">iPhone • Safari • Nairobi, Kenya</p>
                    </div>
                    <span className="text-gray-500 text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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

export default DoctorProfile;
