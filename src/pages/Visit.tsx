import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import PageHero from "../components/PageHero";

// Preload critical image
const preloadImage = new Image();
preloadImage.src = "https://i.ibb.co/ns1vvpMT/resized-image.png";

const Visit = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8" style={{ fill: "url(#purpleIndigoGradient)" }} />,
      title: "Location",
      details: "WOW Zone, Platz Mall, New Cairo, Egypt",
      action: {
        text: "Get Directions",
        link: "https://www.google.com/maps/place/WOW+Zone/@30.0218638,31.4445975,17z/data=!3m1!4b1!4m6!3m5!1s0x14583d1656217d21:0xbda3ae4a08459211!8m2!3d30.0218638!4d31.4445975!16s%2Fg%2F11ny351nyj?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
      },
      gradient: "from-purple-400/20 to-indigo-500/20",
      glowColor: "rgba(147,51,234,0.5)"
    },
    {
      icon: <Clock className="w-8 h-8" style={{ fill: "url(#blueCyanGradient)" }} />,
      title: "Opening Hours",
      details: "Daily: 10:00 AM - 10:00 PM",
      gradient: "from-blue-400/20 to-cyan-500/20",
      glowColor: "rgba(34,211,238,0.5)"
    },
    {
      icon: <Phone className="w-8 h-8" style={{ fill: "url(#greenEmeraldGradient)" }} />,
      title: "Contact",
      details: "+20 155 251 7799",
      gradient: "from-green-400/20 to-emerald-500/20",
      glowColor: "rgba(16,185,129,0.5)"
    },
    {
      icon: <Mail className="w-8 h-8" style={{ fill: "url(#pinkRoseGradient)" }} />,
      title: "Email",
      details: "info@wowzone.co",
      gradient: "from-pink-400/20 to-rose-500/20",
      glowColor: "rgba(244,63,94,0.5)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white relative overflow-hidden">
      {/* SVG Gradients for Icons */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="purpleIndigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#C084FC" }} />
            <stop offset="100%" style={{ stopColor: "#6366F1" }} />
          </linearGradient>
          <linearGradient id="blueCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
            <stop offset="100%" style={{ stopColor: "#06B6D4" }} />
          </linearGradient>
          <linearGradient id="greenEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#4ADE80" }} />
            <stop offset="100%" style={{ stopColor: "#10B981" }} />
          </linearGradient>
          <linearGradient id="pinkRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

      <PageHero
        title="Visit Us"
        subtitle="Experience the Future of Entertainment"
        description="Step into our world of immersive experiences and creative technology. We're located in the heart of New Cairo, ready to transport you to new digital realms."
        imageUrl="https://i.ibb.co/ns1vvpMT/resized-image.png"
      />

      <section className="py-24 px-4 md:px-8 relative z-10" ref={ref}>
        <div className="container mx-auto">
          <motion.div
            className="relative text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
              Find Us at WOW Zone
            </h2>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 128 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden h-[450px] relative bg-gray-900/70 backdrop-blur-md border-2 border-transparent animate-gradient-border shadow-[0_0_25px_rgba(147,51,234,0.4)]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5225223962047!2d31.44459749999999!3d30.0218638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d1656217d21%3A0xbda3ae4a08459211!2sWOW%20Zone!5e0!3m2!1sen!2seg!4v1739980748423!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  className="text-white text-center p-4 bg-gray-900/70 rounded-lg backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                >
                  <h4 className="text-lg font-semibold">Explore the Location</h4>
                  <p className="text-sm">Click the map to get directions!</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  className="flex items-start space-x-5 p-6 bg-gray-900/70 backdrop-blur-md rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(147,51,234,0.3),inset_0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5),inset_0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
                >
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} backdrop-blur-sm`}
                    style={{ filter: `drop-shadow(0 0 10px ${info.glowColor})` }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-indigo-300">{info.title}</h3>
                    <p className="text-gray-300 mb-2">{info.details}</p>
                    {info.action && (
                      <a
                        href={info.action.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {info.action.text}
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        >
                          →
                        </motion.span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative SVG Accent */}
        <svg
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-1/2 opacity-10"
          viewBox="0 0 200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 40 Q90 10 190 40"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
              <stop offset="100%" style={{ stopColor: "#9333EA" }} />
            </linearGradient>
          </defs>
        </svg>
      </section>

      <style>
        {`
          @keyframes gradientBorder {
            0% {
              border-image: linear-gradient(45deg, #60A5FA, #9333EA) 1;
            }
            50% {
              border-image: linear-gradient(45deg, #9333EA, #60A5FA) 1;
            }
            100% {
              border-image: linear-gradient(45deg, #60A5FA, #9333EA) 1;
            }
          }
          .animate-gradient-border {
            border-image-slice: 1;
            animation: gradientBorder 3s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default Visit;