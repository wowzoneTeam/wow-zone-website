import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Building2, Phone, Globe, Send, CheckCircle, AlertCircle, User, Briefcase, MessageSquare, Link2, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../supabaseClient';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'already_exists'>('idle');
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    industry: '',
    website: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.company_name.trim()) newErrors.company_name = 'Company name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'A valid email is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setFormStatus('submitting');
    setErrors({});

    try {
      const { data: existing, error: fetchError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', formData.email)
        .limit(1);

      if (fetchError) throw fetchError;

      if (existing && existing.length > 0) {
        setFormStatus('already_exists');
        return;
      }

      const { error } = await supabase.from('contacts').insert([formData]);
      if (error) throw error;

      setFormStatus('success');
      setFormData({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        industry: '',
        website: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error.message);
      setFormStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: null }));
  };

  const formatTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short', hour12: true };
    return date.toLocaleString('en-US', options).replace('GMT', 'EEST');
  };

  return (
    <div className="bg-gradient-to-b from-[#1a001a] via-[#2a004a] to-[#0a002a] text-white min-h-screen relative overflow-hidden perspective-1000 font-[Poppins] font-normal">
      {/* Interactive Particle Background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"
          initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', z: -100, scale: 0.5 }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.5, 0.2],
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            z: [0, 50, 0]
          }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          style={{ transformStyle: 'preserve-3d' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.transform = `translate(${x / 50}px, ${y / 50}px)`;
          }}
        />
      ))}

      <PageHero
        title="Get in Touch"
        subtitle="Let's Create Something Amazing Together"
        description="Connect with us to explore how we can bring your vision to life through immersive experiences and cutting-edge technology."
        imageUrl="https://i.ibb.co/ns1vvpMT/resized-image.png"
      />

      <section className="py-24 px-6" ref={ref}>
        <div className="container mx-auto">
          {/* Real-Time Clock */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            className="text-center mb-12 text-gray-300 text-lg font-medium bg-black/50 backdrop-blur-md p-4 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Current Time: {formatTime(currentTime)}
            </motion.span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="bg-black/50 backdrop-blur-lg rounded-3xl p-10 border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_10px_30px_rgba(147,51,234,0.2)] hover:shadow-[0_15px_50px_rgba(147,51,234,0.4)] transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.7)] neon-text">
                Contact Us
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="full_name" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <User className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="John Doe"
                    />
                    {errors.full_name && <p className="text-red-400 text-sm mt-2">{errors.full_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company_name" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <Briefcase className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="Tech Innovations"
                    />
                    {errors.company_name && <p className="text-red-400 text-sm mt-2">{errors.company_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <Mail className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="example@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <Phone className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="+20 155 251 7799"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="industry" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <Globe className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="Technology"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                      <Link2 className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                      placeholder="https://www.wowzone.co"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center text-base font-semibold text-gray-200 mb-3">
                    <MessageSquare className="w-5 h-5 mr-3 text-purple-400 animate-pulse" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-400 hover:bg-white/10 placeholder-gray-400"
                    placeholder="Please share your thoughts or inquiries..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.1, rotateY: 10, boxShadow: '0 0 30px rgba(147, 51, 234, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-5 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold rounded-2xl transition-all duration-500 flex items-center justify-center space-x-3 relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0"
                    animate={{ opacity: [0, 0.3, 0], x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  {formStatus === 'submitting' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        ⌛
                      </motion.div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 animate-pulse" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex items-center space-x-3 text-green-400 bg-green-400/10 p-5 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  >
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                    <span>Thank you! Your message has been sent successfully.</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormStatus('idle')}
                      className="ml-auto text-green-300 hover:text-green-400"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex items-center space-x-3 text-red-400 bg-red-400/10 p-5 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  >
                    <AlertCircle className="w-6 h-6 animate-bounce" />
                    <span>We encountered an issue. Please try again later.</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormStatus('idle')}
                      className="ml-auto text-red-300 hover:text-red-400"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}

                {formStatus === 'already_exists' && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
                    className="relative flex items-start space-x-4 bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/20 shadow-[0_8px_32px_rgba(234,179,8,0.2)]"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Mail className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">We’ve Noted Your Interest!</h3>
                      <p className="text-gray-200 text-sm leading-relaxed hover:text-gray-100 transition-colors">
                        It seems <span className="font-semibold text-yellow-300">{formData.email}</span> has already been submitted. Our team is excited to connect with you and will reach out within the next 24 hours. Thank you for your patience!
                      </p>
                      <div className="mt-4 w-full bg-gray-700/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 86400, ease: 'linear' }}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormStatus('idle')}
                        className="mt-4 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-colors"
                      >
                        Use a Different Email
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFormStatus('idle')}
                      className="ml-auto text-yellow-300 hover:text-yellow-400"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.7)] neon-text">
                  Connect With Us
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our team is here to help bring your vision to life through immersive experiences and cutting-edge technology.
                </p>
              </div>

              <div className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                  className="flex items-start space-x-5 bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_5px_20px_rgba(147,51,234,0.1)] transition-all duration-400"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-4 bg-purple-600/20 rounded-xl">
                    <Building2 className="w-7 h-7 text-purple-400 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Visit Us</h3>
                    <p className="text-gray-300">Platz Mall, New Cairo, Egypt</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                  className="flex items-start space-x-5 bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_5px_20px_rgba(147,51,234,0.1)] transition-all duration-400"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-4 bg-purple-600/20 rounded-xl">
                    <Mail className="w-7 h-7 text-purple-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Email Us</h3>
                    <a href="mailto:info@wowzone.co" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
                      info@wowzone.co
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                  className="flex items-start space-x-5 bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_5px_20px_rgba(147,51,234,0.1)] transition-all duration-400"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-4 bg-purple-600/20 rounded-xl">
                    <Phone className="w-7 h-7 text-purple-400 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Call Us</h3>
                    <a href="tel:+201552517799" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
                      +20 155 251 7799
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                  className="flex items-start space-x-5 bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_5px_20px_rgba(147,51,234,0.1)] transition-all duration-400"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="p-4 bg-purple-600/20 rounded-xl">
                    <Globe className="w-7 h-7 text-purple-400 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Follow Us</h3>
                    <div className="flex space-x-6">
                      <a href="https://www.facebook.com/wowzone.co" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
                        Facebook
                      </a>
                      <a href="https://www.instagram.com/wowzone.co" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
                        Instagram
                      </a>
                      <a href="https://www.youtube.com/@WOWZone-D2DStudio" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
                        YouTube
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-14 p-8 bg-black/50 backdrop-blur-lg rounded-2xl border border-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-[0_10px_30px_rgba(147,51,234,0.2)]">
                <h3 className="text-2xl font-bold mb-5">Business Hours</h3>
                <p className="text-gray-300 text-lg">
                  Monday - Sunday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  .font-[Poppins] {
    font-family: 'Poppins', sans-serif;
  }
  .neon-text {
    animation: neonGlow 2s ease-in-out infinite alternate;
  }
  @keyframes neonGlow {
    from { text-shadow: 0 0 10px #bf00ff, 0 0 20px #00ffff; }
    to { text-shadow: 0 0 20px #bf00ff, 0 0 40px #00ffff, 0 0 60px #00ffff; }
  }
  .animate-spin-slow {
    animation: spin 6s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .border-gradient-to-r {
    border-image: linear-gradient(to right, purple, blue) 1;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Contact;