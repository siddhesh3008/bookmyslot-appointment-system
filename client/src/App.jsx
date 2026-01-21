/**
 * ============================================
 * MAIN APP COMPONENT
 * ============================================
 * 
 * The root component that sets up:
 * - React Router for navigation between pages
 * - Global layout with Navbar
 * - Route definitions for Home and Admin pages
 * 
 * App Structure:
 * / (Home) -> BookingForm for users to make appointments
 * /admin   -> Admin panel with login and dashboard
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      {/* Main app container with gradient background */}
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
        {/* Navigation bar - appears on all pages */}
        <Navbar />

        {/* Route definitions */}
        <Routes>
          {/* Home page - User booking form */}
          <Route path="/" element={<HomePage />} />

          {/* Admin page - Protected dashboard */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
