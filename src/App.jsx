import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateAccountPage from './app/main/create_account_page/CreateAccountPage';
import LogInPage from './app/main/login_page/LogInPage';
import HomePage from './app/main/homepage/HomePage';
import SettingsPage from './app/main/settings_page/SettingsPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccountPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}
