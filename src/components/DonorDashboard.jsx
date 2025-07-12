/* ───────── imports ───────── */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserCircleIcon,
  ArrowUpOnSquareIcon,
  ShieldCheckIcon,
  HeartIcon,
  HomeModernIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import SettingsDonor from './SettingsDonor';          // ← modal overlay

/* ───────── tab metadata ───────── */
const tabs = [
  { key: 'profile',  label: 'Profile',        Icon: UserCircleIcon },
  { key: 'upload',   label: 'Upload Labs',    Icon: ArrowUpOnSquareIcon },
  { key: 'verify',   label: 'Verification',   Icon: ShieldCheckIcon },
  { key: 'match',    label: 'Matching',       Icon: HeartIcon },
  { key: 'hospital', label: 'Hospital Info',  Icon: HomeModernIcon },
  { key: 'feedback', label: 'Feedback',       Icon: ChatBubbleLeftEllipsisIcon },
];

/* ───────────────────────────── component ───────────────────────────── */
export default function DonorDashboard() {
  const [active, setActive]     = useState('profile');
  const [showSettings, toggle]  = useState(false);
  const navigate                = useNavigate();

  const matchPercent   = 90;
  const completedIndex = tabs.findIndex(t => t.key === active);
  const overallPercent = ((completedIndex + 1) / tabs.length) * 100;

  /* ───────── helper: circular progress ───────── */
  const CircleMeter = ({ percent, size = '7rem' }) => (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle cx="18" cy="18" r="16" className="stroke-emerald-100" strokeWidth="4" fill="none" />
        <circle
          cx="18" cy="18" r="16"
          className="stroke-green-600 transition-[stroke-dasharray] duration-700"
          strokeWidth="4"
          strokeDasharray={`${percent},100`}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold sm:text-lg">
        {Math.round(percent)}%
      </div>
    </div>
  );

  /* ───────── helper: profile summary ───────── */
  const ProfileSummary = () => (
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40?img=11"
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="text-right leading-tight text-xs sm:text-sm">
        <p className="font-semibold text-gray-800 whitespace-nowrap">James Otieno</p>
        <button
          onClick={() => toggle(true)}
          className="text-green-600 hover:underline"
        >
          Account Settings
        </button>
      </div>
    </div>
  );

  /* ───────── tab panels ───────── */
  const renderContent = () => {
    switch (active) {
      /* — PROFILE — */
      case 'profile':
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">Complete Your Donor Profile</h3>
            <p className="text-gray-700">
              You're not just donating a kidney—you’re giving someone a second chance at life.
              Every form you fill, every test you take—<em>matters.</em> We honor you 💚
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Blood type &amp; HLA typing</li>
              <li>Medical &amp; lifestyle questionnaire</li>
              <li>Emergency contact</li>
            </ul>
            <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded text-sm sm:text-base transition">
              Set Up Profile
            </button>
          </div>
        );

      /* — UPLOAD — */
      case 'upload':
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">Upload Your Lab Results (PDF)</h3>
            <p className="text-gray-700">Your PDF should include:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Renal function panel (eGFR, creatinine)</li>
              <li>Comprehensive metabolic panel</li>
              <li>Infectious disease screen (HIV, Hep B/C, syphilis)</li>
            </ol>
            <p className="italic text-green-700">
              No PDF? Schedule an in‑clinic visit and we’ll handle the testing for free.
            </p>
            <input
              type="file"
              accept=".pdf"
              className="file:mr-4 file:rounded file:bg-green-600 file:text-white file:px-3 sm:file:px-4 file:py-2 file:cursor-pointer"
            />
            <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded text-sm sm:text-base transition">
              Book In‑Clinic Test
            </button>
          </div>
        );

      /* — VERIFICATION — */
      case 'verify':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-700">
              Our coordinators are reviewing your lab results.
            </p>
            <p className="text-gray-600">
              This usually takes <strong>2–3 business days</strong>.
            </p>
            <p className="text-green-700 italic">
              Hang tight—you’re one step closer to changing a life 💚
            </p>
          </div>
        );

      /* — MATCHING — */
      case 'match':
        return (
          <div className="space-y-4 flex flex-col items-center text-gray-700">
            <CircleMeter percent={matchPercent} size="8rem" />
            <p className="text-lg font-semibold text-center">Potential Match Found!</p>
            <p className="text-center">
              You’re a <span className="font-bold">{matchPercent}% match</span> with <span className="font-bold">Mary N.</span> at Nairobi Hospital.
            </p>
            <p>Incredible! Your generosity brings hope 🎁</p>
          </div>
        );

      /* — HOSPITAL — */
      case 'hospital':
        return (
          <div className="space-y-4 text-gray-700">
            <h3 className="text-xl font-semibold">Schedule Your Hospital Visit</h3>
            <p>Select a convenient date for your pre‑transplant consultation:</p>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-600 w-full sm:w-auto"
            />
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Bring ID &amp; insurance card</li>
              <li>Fast 8 h before blood work</li>
            </ul>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded text-sm sm:text-base transition">
              Confirm Appointment
            </button>
            <p className="italic text-green-700">
              We’re here every step—contact us anytime.
            </p>
          </div>
        );

      /* — FEEDBACK — */
      case 'feedback':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Share Your Journey</h3>
            <textarea
              rows="4"
              placeholder="Your feedback motivates other donors…"
              className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base transition">
              Submit Feedback
            </button>
            <p className="text-gray-700">Thank you—your courage inspires us all!</p>
          </div>
        );

      default:
        return null;
    }
  };

  /* ───────── layout ───────── */
  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden">
      {/* ✨ background artwork */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-emerald-100" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.4)_0,transparent_30%),radial-gradient(circle_at_80%_0,rgba(52,211,153,0.4)_0,transparent_30%)]" />

      {/* ───── header ───── */}
      <header className="relative z-10 bg-white/90 backdrop-blur shadow flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-green-700"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-green-600">Donor Dashboard</h1>
        <ProfileSummary />
      </header>

      {/* ───── mobile overall progress bar ───── */}
      <div className="md:hidden h-1 w-full bg-emerald-100">
        <div
          style={{ width: `${overallPercent}%` }}
          className="h-full bg-green-600 transition-[width] duration-500"
        />
      </div>

      {/* ───── main row ───── */}
      <div className="relative z-10 flex flex-1 flex-row">
        {/* main column */}
        <div className="flex-1 flex flex-col items-center p-4 sm:p-6">
          {/* tabs */}
          <div className="flex gap-1 sm:gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`group min-w-max flex items-center gap-2 px-3 sm:px-4 py-2 rounded-t-md font-medium whitespace-nowrap transition ${
                  active === t.key
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-green-100'
                }`}
              >
                <t.Icon className="h-5 w-5 shrink-0" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* breadcrumbs */}
          <nav className="w-full max-w-4xl mb-4 flex items-center text-xs sm:text-sm text-gray-600 overflow-x-auto scrollbar-hide">
            {tabs.slice(0, completedIndex + 1).map((t, idx) => (
              <React.Fragment key={t.key}>
                <button
                  onClick={() => setActive(t.key)}
                  className={`hover:text-green-700 ${
                    active === t.key ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  {t.label}
                </button>
                {idx < completedIndex && (
                  <ChevronRightIcon className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* panel */}
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md shadow-lg p-4 sm:p-8 rounded-b-lg overflow-y-auto max-h-[75vh] sm:max-h-full">
            {renderContent()}
          </div>
        </div>

        {/* sidebar (hidden on < md) */}
        <aside className="hidden md:flex flex-col items-center gap-4 w-60 p-6">
          <CircleMeter percent={overallPercent} />
          <p className="text-center text-gray-700">
            Overall Progress<br />
            <span className="font-medium">{completedIndex + 1}</span> / {tabs.length} steps
          </p>
        </aside>
      </div>

      {/* ───── settings modal overlay ───── */}
      {showSettings && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <SettingsDonor onClose={() => toggle(false)} />
        </div>
      )}
    </div>
  );
}