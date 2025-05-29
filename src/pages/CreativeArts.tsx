import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Palette, Sparkles, Brush, Projector, Globe, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import PageHero from "../components/PageHero";

const CreativeArts = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const galleryRef = useRef(null);

  const gallery = [
    { type: "gif", src: "https://i.ibb.co/bgq9rSBk/ar-gif-2-1-1024x439.gif", title: "AR Experiences", description: "Interactive augmented reality installations that captivate" },
    { type: "gif", src: "https://i.ibb.co/Jj0qyBhk/image33.gif", title: "Interactive Art", description: "Dynamic digital art responding to your every move" },
    { type: "image", src: "https://i.ibb.co/LDp8mWbB/Copy-of-Whats-App-Image-2022-10-25-at-17-50-41-1024x634.jpg", title: "Creative Spaces", description: "Immersive realms for boundless artistic expression" },
    { type: "image", src: "https://i.ibb.co/LXJtfWbW/interactive-el.jpg", title: "Interactive Elements", description: "Engaging digital installations that inspire" },
    { type: "image", src: "https://i.ibb.co/0jTZZmLL/Screenshot-2024-11-21-202830-768x427.png", title: "Digital Canvas", description: "Where technology ignites artistic vision" },
    { type: "image", src: "https://i.ibb.co/HfpnkbxW/image81.gif", title: "Immersive Experiences", description: "Seamless fusion of physical and digital worlds" },
  ];

  const features = [
    {
      icon: <Palette className="w-10 h-10 text-purple-500" />,
      title: "Live Performances",
      description: "Immerse yourself in art like never before with performances blending creativity and technology. Stunning visuals react to movement, sound, and touch, making you a co-creator in real-time. Perfect for those craving a unique, interactive show!",
      media: "https://i.ibb.co/RkcZYhf5/Video-Capture-20240726-193841.jpg"
    },
    {
      icon: <Sparkles className="w-10 h-10 text-blue-400" />,
      title: "Immersive Interactive Storytelling",
      description: "Become an Explorer! Journey through historical myths, uncover hidden AR clues, interact remotely with immersive tales, and capture memories before returning to reality.",
      media: "https://i.ibb.co/TBXxznkQ/m1-ll-768x359.jpg"
    },
    {
      icon: <Projector className="w-10 h-10 text-green-400" />,
      title: "Creative Immersive Environments",
      description: "Step into mesmerizing worlds with captivating visuals, sounds, and interactivity. Each visit transforms, offering a fresh, unforgettable experience.",
      media: "https://i.ibb.co/C5BG3ggV/20221004-182316-768x359.jpg"
    },
    {
      icon: <Brush className="w-10 h-10 text-pink-400" />,
      title: "Creative Arts-Tech Education",
      description: "Learn with Creativity and Joy! Our programs blend fun with education, sparking curiosity through interactive workshops, immersive experiences, and inspiring classes.",
      media: "https://i.ibb.co/LDcNRcxD/GEM-WORKSHOP-4-768x432.gif"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.1 }
    );
    if (galleryRef.current) {
      const elements = galleryRef.current.querySelectorAll('.gallery-item');
      elements.forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-950 via-indigo-950 to-black text-white relative overflow-hidden">
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
          initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Hero Section */}
      <div className="relative h-screen">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="absolute inset-0"
        >
          {gallery.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === "gif" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] neon-text"
            >
              WOW Zone – Creative Arts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            >
              Your Portal to Inspiring Creative Shared Experiences
            </motion.p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              Unleashing Creativity Through Immersive Art
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
              Immerse yourself in a realm where art, technology, and storytelling unite. From interactive installations to live performances, our creative arts redefine engagement and inspiration.
            </p>
            <div className="video-container mb-6">
              <iframe
                src="https://www.youtube.com/embed/ZsA4xnX-zek?controls=1&rel=0&playsinline=0&modestbranding=1&autoplay=0"
                title="Creative Arts at WOW ZONE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-64 sm:h-80 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)]"
              ></iframe>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
              At WOW Zone Creative Arts, we craft audience-centered experiences that ignite imagination and foster shared discovery through art-tech innovation.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Step into a universe of innovation and co-creation. Below, explore a curated glimpse of immersive, interactive experiences designed to captivate and inspire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black/70 to-gray-900/70">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="h-56 sm:h-64 overflow-hidden">
                  <img
                    src={feature.media}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <motion.div
                    className="inline-block p-4 bg-white/10 rounded-xl mb-4 shadow-[0_0_10px_rgba(147,51,234,0.2)]"
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{feature.title}</h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 px-4" ref={galleryRef}>
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text"
          >
            Immersive Experiences
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl"
              >
                {item.type === "gif" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Add Neon Text Style
const styles = `
  .neon-text {
    animation: neonGlow 1.5s ease-in-out infinite alternate;
  }
  @keyframes neonGlow {
    from { text-shadow: 0 0 5px #bf00ff, 0 0 10px #ff00ff; }
    to { text-shadow: 0 0 10px #bf00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default CreativeArts;