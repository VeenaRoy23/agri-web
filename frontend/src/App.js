// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

// Components
import Navbar from './components/navbar';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
//import GoogleTranslate from './components/GoogleTranslate'; // Optional: if using translation

// Pages
import Home from './pages/Home';
import Advisory from './pages/Advisory';
import CropLoss from './pages/CropLoss';
import WeatherPage from './pages/WeatherPage';
import Forum from './pages/Forum';
import Dashboard from './pages/Dashboard';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import AdminAlerts from './pages/admin/AdminAlerts';

// Context
import { LanguageProvider } from './context/LanguageContext';

// ✅ Wrapper for `useLocation`
function AppWrapper() {
  return (
    <LanguageProvider>
      <Router>
        <App />
      </Router>
    </LanguageProvider>
  );
}

function App() {
  const location = useLocation();
  const userId = localStorage.getItem('userId') || 'default-user-id';
  //const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isAdmin = true;

  // Pages where UI like navbar/footer/chatbot should be hidden
  const adminRoutes = [
    '/admin_dashboard',
    '/admin/reports',
    '/admin/alerts',
    '/official-login',
  ];
  const hideUI = adminRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar on non-admin routes */}
      {!hideUI && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home userId={userId} />} />
          <Route path="/advisory" element={<Advisory userId={userId} />} />
          <Route path="/crop-loss" element={<CropLoss userId={userId} />} />
          <Route path="/forum" element={<Forum userId={userId} />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} />} />

          {/* Admin Routes */}
          <Route path="/official-login" element={<AdminLogin />} />
          {isAdmin && (
            <>
              <Route path="/admin_dashboard" element={<AdminDashboard />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/alerts" element={<AdminAlerts />} />
            </>
          )}
        </Routes>
      </main>

      {/* Show Footer & Chatbot only on non-admin routes */}
      {!hideUI && <Footer />}
      {!hideUI && <ChatbotWidget />}
      {!hideUI && <LanguageSwitcher />} 
{/* Optional: only if using the widget */}
    </div>
  );
}

export default AppWrapper;
