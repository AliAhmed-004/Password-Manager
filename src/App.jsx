import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateAccountPage from './app/main/create_account_page/CreateAccountPage';
import LogInPage from './app/main/login_page/LogInPage';
import HomePage from './app/main/homepage/HomePage';
import SettingsPage from './app/main/settings_page/SettingsPage';
import VerifyOTP from './app/main/verify_otp/VerifyOTP';
import InitialRouteDecider from './app/main/initial_route_decider/InitialRouteDecider';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialRouteDecider />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/verifyOTP" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}
