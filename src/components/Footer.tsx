import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const links = [
    { title: "Home", link: "/" },
    { title: "Creative Arts", link: "/creative-arts" },
    { title: "Entertainment", link: "/entertainment" },
    { title: "WOW Studio", link: "/studio" },
    { title: "Technologies", link: "/technologies" },
   // { title: "Corporate Events", link: "/corporate-events" },
   // { title: "Innovation", link: "/innovation" },
    { title: "Visit Us", link: "/visit" },
    { title: "Privacy Policy", link: "/privacy-policy" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />, link: "https://www.facebook.com/wowzone.co/" },
    { icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />, link: "https://www.instagram.com/wowzone.co/" },
    { icon: <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />, link: "https://www.youtube.com/@WOWZone-D2DStudio" },
    // { icon: <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />, link: "https://twitter.com/wowzone" },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />, text: "Platz Mall, New Cairo, Egypt" },
    { icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />, text: <a href="tel:+201552517799" className="text-purple-400 hover:text-pink-400 hover:underline transition-colors">+20 155 251 7799</a> },
    { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />, text: <a href="mailto:info@wowzone.co" className="text-purple-400 hover:text-pink-400 hover:underline transition-colors">info@wowzone.co</a> },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (link: string) => {
    navigate(link);
    scrollToTop();
  };

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white py-10 sm:py-12 lg:py-14 relative z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.2),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.2),transparent)] opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Logo and Branding */}
        <motion.div
          className="flex flex-col items-center mb-8 sm:mb-10 lg:mb-12 backdrop-blur-md bg-black/30 rounded-xl p-6 shadow-[0_0_20px_rgba(147,51,234,0.3)] border border-indigo-500/20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <motion.img
              src="https://i.ibb.co/PGD1Ck4T/Ai-Viewer-1623517776567-2-300x169-1.png"
              alt="WOW Immersive Logo"
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain mb-4 sm:mb-6 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          </motion.div>
          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 drop-shadow-[0_0_10px_rgba(147,51,234,0.7)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            WOW Immersive
          </motion.h3>
          <motion.p
            className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-md sm:max-w-lg mt-3 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Egypt’s first immersive playground, blending VR, creative arts, dance, and interactive experiences into unforgettable moments.
          </motion.p>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-14 backdrop-blur-md bg-black/30 rounded-xl p-6 shadow-[0_0_15px_rgba(147,51,234,0.2)] border border-indigo-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {links.map((link) => (
            <motion.button
              key={link.title}
              onClick={() => handleLinkClick(link.link)}
              className="text-gray-300 text-sm sm:text-base hover:text-white transition-colors duration-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text hover:drop-shadow-[0_0_5px_rgba(147,51,234,0.5)] px-2 py-1 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.title}
            </motion.button>
          ))}
        </motion.nav>

        {/* Social Media Links */}
        <motion.div
          className="flex justify-center space-x-5 sm:space-x-6 mb-8 sm:mb-10 backdrop-blur-md bg-black/30 rounded-xl p-4 shadow-[0_0_15px_rgba(147,51,234,0.2)] border border-indigo-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              onClick={scrollToTop}
              whileHover={{ scale: 1.2, color: "#ec4899" }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="text-gray-300 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10 backdrop-blur-md bg-black/30 rounded-xl p-5 shadow-[0_0_15px_rgba(147,51,234,0.2)] border border-indigo-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {contactInfo.map((info, index) => (
            <p key={index} className="mb-2 flex items-center justify-center">
              {info.icon}
              <span className="ml-2">{info.text}</span>
            </p>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-gray-500 text-xs sm:text-sm backdrop-blur-md bg-black/30 rounded-xl p-3 shadow-[0_0_10px_rgba(147,51,234,0.2)] border border-indigo-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} WOW Immersive. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;