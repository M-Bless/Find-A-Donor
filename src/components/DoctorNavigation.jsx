import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DoctorNavigation = ({ 
  doctorInfo, 
  notifications = [], 
  onNotificationToggle, 
  unreadNotificationsCount = 0 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/doctor-dashboard', icon: 'dashboard' },
    { name: 'Patients', href: '/patient-management', icon: 'patients' },
    { name: 'Schedule', href: '/schedule-management', icon: 'schedule' },
    { name: 'Profile', href: '/doctor-profile', icon: 'profile' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
        );
      case 'patients':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'schedule':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'profile':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Page Title */}
          <div className="flex items-center">
            <Link to="/" className="hover:opacity-80 transition duration-300">
              <span className="text-2xl font-bold text-green-600">Find A Donor</span>
            </Link>
            <span className="ml-4 text-gray-500 hidden sm:inline">|</span>
            <h1 className="ml-4 text-xl font-semibold text-gray-900 hidden sm:block">
              {location.pathname === '/doctor-dashboard' && 'Dashboard'}
              {location.pathname === '/patient-management' && 'Patient Management'}
              {location.pathname === '/schedule-management' && 'Schedule Management'}
              {location.pathname === '/doctor-profile' && 'Doctor Profile'}
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  isActive(item.href)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Doctor Profile Display */}
            <div className="flex items-center space-x-3 px-3 py-1 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">{doctorInfo?.initials}</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{doctorInfo?.name}</p>
                <p className="text-xs text-gray-500">{doctorInfo?.specialty}</p>
              </div>
            </div>
            
            {/* Notification Bell */}
            <button
              onClick={onNotificationToggle}
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

            {/* Logout Button */}
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

          {/* Mobile menu button and notification/logout buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Notification Bell */}
            <button
              onClick={onNotificationToggle}
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

            {/* Mobile Logout Button */}
            <Link 
              to="/" 
              className="p-2 text-red-600 hover:text-red-700 rounded-md transition duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-md transition duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                // Close icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            {/* Doctor Profile Section */}
            <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">{doctorInfo?.initials}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doctorInfo?.name}</p>
                <p className="text-xs text-gray-500">{doctorInfo?.specialty}</p>
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition duration-300 ${
                  isActive(item.href)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close mobile menu when clicking outside */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default DoctorNavigation;
