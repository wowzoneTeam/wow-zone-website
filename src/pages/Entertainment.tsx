import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Gamepad, Mic2, Music, Users, PartyPopper, Sparkles, Map } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Entertainment = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const galleryRef = useRef(null);

  const gallery = [
    { type: "gif", src: "https://i.ibb.co/N6YGy0gL/VR-GIF.gif", title: "VR Gaming", description: "Immersive multiplayer virtual reality adventures" },
    { type: "gif", src: "https://i.ibb.co/GvjgWYgk/karaoke-1024x576.gif", title: "Interactive Karaoke", description: "Next-level karaoke experiences that thrill" },
    { type: "gif", src: "https://i.ibb.co/prLm3jwc/disco-theme-gif-576x1024.gif", title: "Immersive Disco", description: "Vibrant light shows and interactive music journeys" },
    { type: "gif", src: "https://i.ibb.co/Qjkkk89y/pacman-gif.gif", title: "Projected Games", description: "Reimagined arcade classics with a twist" },
    { type: "gif", src: "https://i.ibb.co/4nk22DjY/Roomscale-games.gif", title: "Room-Scale VR", description: "Full-body immersive gaming excitement" },
    { type: "gif", src: "https://i.ibb.co/pBKCY3cp/UBR-VR-2.gif", title: "Multiplayer VR", description: "Social VR gaming that connects players" },
  ];

  const funTimeFeatures = [
    {
      icon: <Music className="w-10 h-10 text-purple-500" />,
      title: "Immersive Disco and Parties",
      description: "Step onto the dance floor and dive into a dazzling realm of lights, music, and immersive visuals. Every move syncs with a 360° journey of sound and color!",
      media: "https://i.ibb.co/b5tQRqFq/Video-Capture-20240721-014245.jpg"
    },
    {
      icon: <PartyPopper className="w-10 h-10 text-pink-400" />,
      title: "Immersive Birthdays",
      description: "Celebrate with a magical birthday package! Enjoy cake time, a thrilling freeze game, and personalized wall projections for an unforgettable, surprise-filled day!",
      media: "https://i.ibb.co/tpgqzF1K/IMG03203-1024x683.jpg"
    },
    {
      icon: <Sparkles className="w-10 h-10 text-blue-400" />,
      title: "Immersive Themed Events",
      description: "Elevate your celebrations with themed events like Halloween! Stunning visuals and interactive elements transform our space into a memorable, customized experience.",
      media: "https://i.ibb.co/JR2T57sb/image34.png"
    }
  ];

  const gamesFeatures = [
    {
      icon: <Gamepad className="w-10 h-10 text-green-400" />,
      title: "Virtual Reality Games",
      description: "Discover our unique VR Arena, bridging physical and digital worlds with a Free-Roaming Multiplayer area. Up to 10 players enjoy 5v5 or Co-Op modes, adaptable for B2B innovation and brand engagement.",
      media: "https://i.ibb.co/HTvxYMd8/game-VR-Kid-1024x478.jpg"
    },
    {
      icon: <Map className="w-10 h-10 text-yellow-400" />,
      title: "Projected Games",
      description: "Dive into room-scale gaming that gets you moving! Explore freely with full-body controls, offering dynamic, immersive fun for all ages.",
      media: "https://i.ibb.co/4nk22DjY/Roomscale-games.gif"
    },
    {
      icon: <Users className="w-10 h-10 text-red-400" />,
      title: "Pictionary & Treasure Hunts",
      description: "Pictionary: Team up for immersive drawing battles projected live! Treasure Hunt: Solve puzzles and follow clues in thrilling, interactive environments.",
      media: "https://i.ibb.co/KphMRkPD/image9.png"
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
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
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
              Immersive Entertainment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            >
              Your Portal to Fun Immersive Shared Experiences
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
              Step into the WOW Zone
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
              Dive into a realm where fun and creativity ignite unforgettable moments. Experience cutting-edge XR adventures that thrill, engage, and inspire!
            </p>
            <p className="text-lg sm:text-xl text-purple-300 font-semibold mb-6">
              Tailored for all ages and every occasion
            </p>
            <div className="video-container mb-6">
              <iframe
                src="https://www.youtube.com/embed/TQkXAtgDlhw?controls=1&rel=0&playsinline=0&modestbranding=1&autoplay=0"
                title="Entertainment at WOW ZONE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-64 sm:h-80 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)]"
              ></iframe>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              At WOW Zone, we fuse digital and physical worlds with XR technology, offering immersive fun, creative exploration, and transformative engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fun Time Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black/70 to-gray-900/70">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              FUN TIME
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover WOW Experiences that captivate and entertain:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {funTimeFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="h-48 sm:h-56 overflow-hidden">
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

      {/* Games Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              GAMES
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Unleash excitement with innovative gaming technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gamesFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="h-48 sm:h-56 overflow-hidden">
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

      {/* Interactive Gallery */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black/70 to-gray-900/70" ref={galleryRef}>
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text"
          >
            Experience the Future of Entertainment
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
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
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

export default Entertainment;