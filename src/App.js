import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import DoctorDashboard from './components/DoctorDashboard';
import PatientManagement from './components/PatientManagement';
import DoctorProfile from './components/DoctorProfile';
import HospitalDashboard from './components/hosadmin-dash';

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
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;