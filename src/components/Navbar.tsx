import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const Navbar = ({ isLoggedIn, isAdmin }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const links = [
    { id: 'home', title: 'Home', path: '/' },
    ...(isLoggedIn
      ? [
          { id: 'profile', title: 'Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
          { id: 'logout', title: 'Log Out', path: '#', onClick: handleLogout, icon: <LogOut className="w-4 h-4" /> },
        ]
      : [
      
       //   { id: 'signup', title: 'Sign Up', path: '/signup' },
        ]),
    {
      id: 'wow-creations',
      title: 'WOW Creations',
      path: '/creations',
      dropdown: true,
      subLinks: [
        { id: 'studio', title: 'WOW Studio & Group', path: '/studio' },
        { id: 'studio-library', title: 'Studio Library', path: '/studio-library' },
        { id: 'technologies', title: 'WOW Technologies', path: '/technologies' },
        ...(isAdmin ? [{ id: 'admin', title: 'Admin Dashboard', path: '/admin' }] : []),
      ],
    },
    {
      id: 'wow-zone',
      title: 'WOW Zone',
      path: '/creative-arts',
      dropdown: true,
      subLinks: [
        { id: 'entertainment', title: 'Entertainment', path: '/entertainment' },
        { id: 'creative-arts', title: 'Creative Arts', path: '/creative-arts' },
      ],
    },
    {
      id: 'more',
      title: 'More',
      path: '/more',
      dropdown: true,
      subLinks: [
        { id: 'about', title: 'About', path: '/about' },
        { id: 'visit', title: 'Visit Us', path: '/visit' },
        { id: 'contact', title: 'Contact', path: '/contact' },
        { id: 'privacy', title: 'Privacy Policy', path: '/privacy-policy' },
         { id: 'login', title: 'Admin Login', path: '/login' },
      ],
    },
  ];

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleNavigation = useCallback(
    (path: string) => {
      setIsOpen(false);
      setActiveDropdown(null);
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    },
    [navigate]
  );

  const toggleDropdown = useCallback((e: React.MouseEvent, dropdownId: string) => {
    e.preventDefault();
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'bg-transparent'
      } ${isOpen ? 'bg-black/95' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20 sm:h-24 lg:h-28">
        <Link
          to="/"
          className="flex items-center space-x-3 text-white hover:text-purple-400 transition-all duration-300"
          onClick={() => handleNavigation('/')}
        >
          <motion.span
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            WOW Immersive
          </motion.span>
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              {link.dropdown ? (
                <>
                  <motion.button
                    className="flex items-center text-gray-300 hover:text-white transition-all py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base font-medium relative"
                    onClick={(e) => toggleDropdown(e, link.id)}
                    aria-expanded={activeDropdown === link.id}
                    aria-haspopup="true"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{link.title}</span>
                    <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" />
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <AnimatePresence>
                    {activeDropdown === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-0 mt-2 w-52 bg-black/90 backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] overflow-hidden border border-indigo-500/20"
                      >
                        {link.subLinks?.map((subLink) => (
                          <motion.button
                            key={subLink.id}
                            onClick={() => handleNavigation(subLink.path)}
                            className="block w-full text-left px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium"
                            whileHover={{ x: 5 }}
                          >
                            {subLink.title}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.button
                  onClick={() => link.onClick ? link.onClick() : handleNavigation(link.path)}
                  className="flex items-center text-gray-300 hover:text-white transition-all px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base font-medium relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.title}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              )}
            </div>
          ))}
        </div>

        <motion.button
          className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-[0_0_10px_rgba(147,51,234,0.3)]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <motion.div animate={{ rotate: 90 }} transition={{ duration: 0.3 }}>
              <X className="w-6 h-6 text-purple-400" />
            </motion.div>
          ) : (
            <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
              <Menu className="w-6 h-6 text-purple-400" />
            </motion.div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden bg-black/95 backdrop-blur-lg overflow-hidden border-t border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 space-y-2">
              {links.map((link) => (
                <div key={link.id}>
                  {link.dropdown ? (
                    <>
                      <motion.button
                        onClick={(e) => toggleDropdown(e, link.id)}
                        className="w-full flex justify-between items-center py-3 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base font-medium"
                        aria-expanded={activeDropdown === link.id}
                        aria-haspopup="true"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{link.title}</span>
                        <motion.div animate={{ rotate: activeDropdown === link.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-5 h-5 text-purple-400" />
                        </motion.div>
                      </motion.button>
                      <AnimatePresence>
                        {activeDropdown === link.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="pl-4 sm:pl-6 space-y-2"
                          >
                            {link.subLinks?.map((sub) => (
                              <motion.button
                                key={sub.id}
                                onClick={() => handleNavigation(sub.path)}
                                className="block w-full text-left text-gray-400 hover:text-white py-2 text-base font-medium hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                                whileHover={{ x: 5 }}
                              >
                                {sub.title}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => link.onClick ? link.onClick() : handleNavigation(link.path)}
                      className="block w-full text-left py-3 text-gray-300 hover:text-white text-base font-medium hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.title}
                      </div>
                    </motion.button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;