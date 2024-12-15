import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import ApplyDeveloper from './pages/ApplyDeveloper';
import StudentDashboard from './pages/StudentDashboard';
import DiscussionForum from './pages/DiscussionForum';
import ProfileCompleteness from './pages/ProfileCompleteness';
import Pay from './pages/Pay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/developerdashboard" element={<DeveloperDashboard />} />
        <Route path="/applydeveloper" element={<ApplyDeveloper />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/discussionforum" element={<DiscussionForum />} />
        <Route path="/profilecompleteness" element={<ProfileCompleteness />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </Router>
  );
};

export default App;
