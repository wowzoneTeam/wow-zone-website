import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Lock, Eye, FileKey } from "lucide-react";

const PrivacyPolicy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      icon: <Shield className="w-8 h-8" style={{ fill: "url(#purpleGradient)" }} />,
      title: "Information We Collect",
      content: [
        "Personal information you provide directly",
        "Website usage data and analytics",
        "Event and experience interactions",
        "Marketing engagement data"
      ],
      gradient: "from-purple-400/20 to-indigo-500/20",
      glowColor: "rgba(147,51,234,0.5)"
    },
    {
      icon: <Lock className="w-8 h-8" style={{ fill: "url(#blueGradient)" }} />,
      title: "How We Use Your Information",
      content: [
        "Personalize and improve experiences",
        "Process bookings and inquiries",
        "Send marketing communications (with consent)",
        "Analyze trends and improve services"
      ],
      gradient: "from-blue-400/20 to-cyan-500/20",
      glowColor: "rgba(34,211,238,0.5)"
    },
    {
      icon: <Eye className="w-8 h-8" style={{ fill: "url(#greenGradient)" }} />,
      title: "Your Data Protection Rights",
      content: [
        "Access and correct your data",
        "Opt-out of marketing",
        "Request data deletion",
        "Restrict data processing"
      ],
      gradient: "from-green-400/20 to-emerald-500/20",
      glowColor: "rgba(16,185,129,0.5)"
    },
    {
      icon: <FileKey className="w-8 h-8" style={{ fill: "url(#pinkGradient)" }} />,
      title: "Data Security & Retention",
      content: [
        "Industry-standard security measures",
        "Secure data retention policies",
        "Third-party compliance",
        "Regular security updates"
      ],
      gradient: "from-pink-400/20 to-rose-500/20",
      glowColor: "rgba(244,63,94,0.5)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white relative overflow-hidden pt-20">
      {/* SVG Gradients for Icons */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#C084FC" }} />
            <stop offset="100%" style={{ stopColor: "#6366F1" }} />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
            <stop offset="100%" style={{ stopColor: "#06B6D4" }} />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#4ADE80" }} />
            <stop offset="100%" style={{ stopColor: "#10B981" }} />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#F472B6" }} />
            <stop offset="100%" style={{ stopColor: "#F43F5E" }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic Particle Background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-30"
          initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 0.6, 0.3], x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.2),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent)] opacity-40"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, rgba(147,51,234,0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Header with Decorative SVG */}
          <div className="relative text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
              Privacy Policy
            </h1>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            <svg
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-1/2 opacity-10"
              viewBox="0 0 200 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 40 Q90 10 190 40"
                stroke="url(#headerGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
                  <stop offset="100%" style={{ stopColor: "#9333EA" }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="text-gray-400 text-center mb-12">
            <p>Effective Date: Jan 1 2025</p>
            <p>Last Updated: Feb 21 2025</p>
          </div>

          <section className="mb-16">
            <p className="text-gray-300 leading-relaxed text-lg">
              Welcome to WOW Immersive, where immersive experiences, creativity, and technology converge. 
              Your privacy is important to us, and we are committed to protecting your personal data when you engage with our 
              digital platforms, immersive events, and interactive experiences. This Privacy Policy outlines how we collect, 
              use, and safeguard your data.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-indigo-500/20 shadow-[0_0_20px_rgba(147,51,234,0.3),inset_0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5),inset_0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-br ${section.gradient}`}
                    style={{ filter: `drop-shadow(0 0 10px ${section.glowColor})` }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {section.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-indigo-300 ml-4">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div ref={ref} className="space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Cookies & Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                We use cookies and similar tracking tools to enhance your browsing experience. You can manage or disable cookies through your browser settings. For more details, visit our Cookie Policy.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Third-Party Links</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Our website and experiences may include links to third-party services. We are not responsible for their privacy policies or data practices.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Updates to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                We may update this policy from time to time to reflect changes in our practices. Any updates will be posted on this page with a revised "Last Updated" date.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-purple-400">📩 Email: WOWZone@d2d-art.com</p>
                <p className="text-purple-400">🌐 Website: <a href="https://wowzone.co/" className="underline hover:text-purple-300 transition-colors duration-200">https://wowzone.co/</a></p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;