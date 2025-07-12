import React, { useState } from 'react';
import {
  ArrowRightOnRectangleIcon,
  CameraIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

export default function SettingsDonor({ onClose }) {
  /* ── demo state ── */
  const [first, setFirst]   = useState('James');
  const [last, setLast]     = useState('Otieno');
  const [email, setEmail]   = useState('j.otieno@example.com');
  const [phone, setPhone]   = useState('+254 712 345 678');
  const [notify, setNotify] = useState(true);

  const handleSave = () => {
    console.log({ first, last, email, phone, notify });
    alert('✅  Changes saved (demo)');
    onClose();
  };

  const handleLogout = () => {
    alert('You have been logged out. (demo)');
    // e.g. localStorage.clear(); navigate("/login");
    onClose();
  };

  return (
    <div className="relative w-11/12 max-w-md sm:max-w-lg bg-white rounded-lg shadow-2xl p-4 sm:p-6">
      {/* ✕ close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-green-600 transition"
      >
        ✕
      </button>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        Account Settings
      </h2>

      {/* ───────── PROFILE ───────── */}
      <section className="mb-6">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 flex items-center gap-1">
          <CameraIcon className="h-4 w-4" />
          Profile
        </h3>

        {/* avatar */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/80?img=11"
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <button className="text-xs sm:text-sm text-green-600 hover:underline">
            Change photo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={first}
            onChange={e => setFirst(e.target.value)}
            placeholder="First name"
            className="border px-3 py-2 rounded text-xs sm:text-sm"
          />
          <input
            type="text"
            value={last}
            onChange={e => setLast(e.target.value)}
            placeholder="Last name"
            className="border px-3 py-2 rounded text-xs sm:text-sm"
          />
        </div>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-4 w-full border px-3 py-2 rounded text-xs sm:text-sm"
        />

        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone"
          className="mt-4 w-full border px-3 py-2 rounded text-xs sm:text-sm"
        />
      </section>

      {/* ───────── SECURITY ───────── */}
      <section className="mb-6">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 flex items-center gap-1">
          <Cog6ToothIcon className="h-4 w-4" />
          Security
        </h3>

        <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-50 text-xs sm:text-sm">
          Change password
        </button>
      </section>

      {/* ───────── PREFERENCES ───────── */}
      <section className="mb-6">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 flex items-center gap-1">
          <BellIcon className="h-4 w-4" />
          Preferences
        </h3>

        <label className="flex items-center gap-3 cursor-pointer select-none text-xs sm:text-sm">
          <input
            type="checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span>Email me important updates</span>
        </label>
      </section>

      {/* ───────── ACTIONS ───────── */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-xs sm:text-sm transition"
        >
          Save Changes
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs sm:text-sm transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}