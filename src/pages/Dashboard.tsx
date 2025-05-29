import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Brain, Palette, Gamepad2 } from "lucide-react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import Navbar from "../components/Navbar";
import Newsletter from '../components/Newsletter';
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin, email')
          .eq('id', user.id)
          .single();
        if (profileError) {
          console.error('Profile fetch error:', profileError.message);
          setIsAdmin(false);
        } else {
          console.log('User email:', profile.email, 'isAdmin:', profile.is_admin);
          setIsAdmin(profile.is_admin || false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        fetchUser();
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const heroSlides = [
    {
      image: "https://i.ibb.co/KxkTKNNR/image24.png",
      title: isLoggedIn ? "Welcome Back to WOW Immersive" : "Welcome to WOW Immersive",
      subtitle: isLoggedIn ? "Continue Your Journey" : "Where Digital Meets Reality"
    },
    {
      image: "https://i.ibb.co/jvYwq4PR/Presentation1-768x432.png",
      title: "Immersive Experiences",
      subtitle: "Crafting the Future of Entertainment"
    },
    {
      image: "https://i.ibb.co/k2L6TkFc/Screenshot-2024-11-21-202830-768x427.png",
      title: "Creative Innovation",
      subtitle: "Pushing Boundaries of Technology"
    }
  ];

  const features = [
    {
      icon: <Palette className="w-12 h-12 text-purple-500" />,
      title: "Immersive Experiences",
      description: "Where creativity meets technology to craft unique immersive experiences.",
      image: "https://i.ibb.co/VpmSzP1B/20240920-152400-1.gif",
      link: "/creations"
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-400" />,
      title: "WOW Studio",
      description: "The creative powerhouse delivering cutting-edge XR experiences.",
      image: "https://i.ibb.co/X067S4R/3d-scan-3-D-selfie-hologram-volumetric-3.gif",
      link: "/studio"
    },
    {
      icon: <Gamepad2 className="w-12 h-12 text-green-400" />,
      title: "WOW Technologies",
      description: "Pioneering the intersection of software and hardware.",
      image: "https://i.ibb.co/TsV5cBh/tech-ai-4-576x1024.gif",
      link: "/technologies"
    }
  ];

  const showcase = [
    {
      image: "https://i.ibb.co/gZ4Zb6vm/image82.png",
      title: "Interactive Installations"
    },
    {
      image: "https://i.ibb.co/4R6FMxq0/20241113-174549-1.gif",
      title: "AI-Powered Experiences"
    },
    {
      image: "https://i.ibb.co/67L7Bt8F/image5.png",
      title: "Immersive Technology"
    },
    {
      image: "https://i.ibb.co/1JzWcC0j/image67.jpg",
      title: "Projection Mapping"
    }
  ];

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Inject CSS keyframes directly */}
      <style>
        {`
          @keyframes neon {
            0%, 100% { text-shadow: 0 0 5px #a855f7, 0 0 10px #ec4899, 0 0 20px #a855f7; }
            50% { text-shadow: 0 0 2px #a855f7, 0 0 5px #ec4899, 0 0 15px #a855f7; }
          }
        `}
      </style>

      {/* Navigation Bar */}
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

      {/* Hero Section */}
      <div className="relative h-screen pt-20 sm:pt-24">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="absolute inset-0"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <motion.h1
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse"
                      animate={{ textShadow: ["0 0 10px #a855f7", "0 0 20px #ec4899", "0 0 10px #a855f7"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl text-gray-200 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Explore Our Worlds
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group cursor-pointer overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md border border-purple-500/20 hover:shadow-2xl hover:border-purple-400"
                onClick={() => navigate(feature.link)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg"
          >
            Showcase of Innovation
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcase.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative overflow-hidden rounded-3xl group border border-purple-500/20 hover:border-purple-400"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;