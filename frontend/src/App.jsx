import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChatWidget } from './components/ChatWidget';

// Public Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Industries } from './pages/Industries';
import { Contact } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLeads } from './admin/AdminLeads';
import { AdminAIAgent } from './admin/AdminAIAgent';

// Public layout wrapper with header, footer, floating buttons
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="ai-agent" element={<AdminAIAgent />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
