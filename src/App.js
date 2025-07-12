import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import DoctorDashboard from './components/DoctorDashboard';
import PatientManagement from './components/PatientManagement';
import DoctorProfile from './components/DoctorProfile';
import DonorDashboard from './components/DonorDashboard';
import ScheduleManagement from './components/ScheduleManagement';
import SettingsDonor from './components/SettingsDonor';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-management" element={<PatientManagement />} />
          <Route path="/schedule-management" element={<ScheduleManagement />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/settings-donor" element={<SettingsDonor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
