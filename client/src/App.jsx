import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/public/Home';
import Booking from './pages/public/Booking';
import Services from './pages/public/Services';
import Blog from './pages/public/Blog';
import Contact from './pages/public/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';


// Placeholder Pages
import Offers from './pages/public/Offers';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/login';

  return (
    <>
      {!isAdmin && !isLogin && <Navbar />}
      <main className="bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-300">
        {children}
      </main>
      {!isAdmin && !isLogin && <WhatsAppButton />}
      {!isAdmin && !isLogin && <Footer />}
    </>
  );
};

import { HelmetProvider } from 'react-helmet-async';
import NotFound from './pages/public/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
