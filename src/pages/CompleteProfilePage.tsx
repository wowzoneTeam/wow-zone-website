import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Brain, Palette, Gamepad2 } from "lucide-react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import Newsletter from "../components/Newsletter";

const HomeLoggedIn = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const heroSlides = [
    {
      image: "https://i.ibb.co/KxkTKNNR/image24.png",
      title: "Welcome Back to WOW Immersive",
      subtitle: "Continue Your Journey"
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
      icon: <Palette className="w-10 h-10 text-purple-500" />,
      title: "Immersive Experiences",
      description: "Where creativity meets technology to craft unique immersive experiences.",
      image: "https://i.ibb.co/VpmSzP1B/20240920-152400-1.gif",
      link: "/creations"
    },
    {
      icon: <Brain className="w-10 h-10 text-blue-400" />,
      title: "WOW Studio",
      description: "The creative powerhouse delivering cutting-edge XR experiences.",
      image: "https://i.ibb.co/X067S4R/3d-scan-3-D-selfie-hologram-volumetric-3.gif",
      link: "/studio"
    },
    {
      icon: <Gamepad2 className="w-10 h-10 text-green-400" />,
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

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen pt-16">
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
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-5xl md:text-7xl font-bold mb-6"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-xl md:text-2xl text-gray-300"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => window.location.href = feature.link}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="inline-block p-3 bg-white/10 rounded-xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Experience the Future
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcase.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold">{item.title}</h3>
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

export default HomeLoggedIn;