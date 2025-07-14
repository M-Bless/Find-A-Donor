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
import HospitalDashboard from './components/HospitalAdmin';
import DoctorManagement from './components/DoctorManagement';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-management" element={<PatientManagement />} />
          <Route path="/schedule-management" element={<ScheduleManagement />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/settings-donor" element={<SettingsDonor />} />
          <Route path="/hospital-admin" element={<HospitalDashboard />} />
          <Route path="/doctor-management" element={<DoctorManagement />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
