import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomeLoggedIn from './pages/HomeLoggedIn';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import CreativeArts from './pages/CreativeArts';
import Entertainment from './pages/Entertainment';
import Studio from './pages/Studio';
import StudioLibrary from './pages/StudioLibrary';
import Technologies from './pages/Technologies';
import About from './pages/About';
import Creations from './pages/Creations';
import CorporateEvents from './pages/CorporateEvents';
import Innovation from './pages/Innovation';
import Visit from './pages/Visit';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import CompleteProfilePage from './pages/CompleteProfilePage';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        console.log('Authenticated user ID:', user.id, 'Email:', user.email); // Debug
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin, email')
          .eq('id', user.id)
          .single();
        if (profileError) {
          console.error('Profile fetch error:', profileError.message);
          setIsAdmin(false);
        } else {
          console.log('Profile data:', profile); // Debug
          setIsAdmin(profile.is_admin || false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email); // Debug
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        checkUser();
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/creative-arts" element={<CreativeArts />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio-library" element={<StudioLibrary isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
          <Route path="/library" element={<StudioLibrary isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
          <Route path="/admin" element={isLoggedIn && isAdmin ? <StudioLibrary isLoggedIn={isLoggedIn} isAdmin={isAdmin} /> : <Navigate to="/dashboard" />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/about" element={<About />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/corporate-events" element={<CorporateEvents />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;