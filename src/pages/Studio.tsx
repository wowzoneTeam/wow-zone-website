import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Palette, Code, Projector, Users, Brain, Globe, Lightbulb, Sparkles, Zap, Gamepad, Brush, Music, Camera } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Newsletter from '../components/Newsletter';

const Studio = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const galleryRef = useRef(null);

  const heroSlides = [
    { image: 'https://i.ibb.co/VpmSzP1B/20240920-152400-1.gif', title: 'WOW Studio & Group', subtitle: 'Your Portal to Crafted Visionary Concepts' },
    { image: 'https://i.ibb.co/pFjZRys/VID-20240717-WA0027-1-1.gif', title: 'Brand Activation & Marketing', subtitle: 'Immersive Experiential Solutions' },
    { image: 'https://i.ibb.co/sp7Bw75D/Untitled-video-1-1.gif', title: 'Live Performances & Shows', subtitle: 'Where Technology Meets Art' },
  ];

  const services = [
    {
      title: 'Brand Activation & Marketing',
      description: 'Revolutionize your product launches with interactive technology and captivating storytelling.',
      projects: [
        { title: 'Nestle - Nescafe Launch', description: 'Interactive product launch blending tech and creative visuals', image: 'https://i.ibb.co/pFjZRys/VID-20240717-WA0027-1-1.gif' },
        { title: 'ABB - Yumi Robot', description: 'Cutting-edge robotics display for engaging brand interactions', image: 'https://i.ibb.co/N6Lnpn8J/ABB-Yumi-robot.jpg' },
      ],
    },
    {
      title: 'Place Activation & Events',
      description: 'Transform spaces into immersive experiences with innovative tech and creative designs.',
      projects: [
        { title: 'Creative Summit Event', description: 'Interactive 8m high screen controlled via tablets and motion', image: 'https://i.ibb.co/QFKLK6gD/creative-summit-gif-1.gif' },
        { title: 'MISK Art Week KSA', description: 'Mobile projection system delivering interactive event experiences', image: 'https://i.ibb.co/VYNsPhMW/Roaming-bike-KSA-1.gif' },
      ],
    },
    {
      title: 'Creative Arts & Storytelling',
      description: 'Fuse creativity, technology, and narrative to craft unforgettable experiences.',
      projects: [
        { title: 'Immersive Art Installations', description: 'Dynamic environments with interactive visuals and tech', image: 'https://i.ibb.co/Fq0yNQhC/Copy-of-Copy-of-20220920-194746.jpg' },
        { title: 'Interactive Storytelling', description: 'AR and projection mapping to bring stories to life', image: 'https://i.ibb.co/rGRFcXgW/Copy-of-20220920-185556.jpg' },
      ],
    },
    {
      title: 'Live Performances & Shows',
      description: 'Deliver multisensory experiences blending art, tech, and music in real-time.',
      projects: [
        { title: 'Augmented Dance Shows', description: 'Interactive visuals synchronized with live performances', image: 'https://i.ibb.co/VpmSzP1B/20240920-152400-1.gif' },
        { title: 'Immersive Nightlife', description: 'Real-time visual effects and projection mapping for events', image: 'https://i.ibb.co/sp7Bw75D/Untitled-video-1-1.gif' },
      ],
    },
  ];

  const educationProjects = [
    { icon: <Brush className="w-10 h-10 text-purple-400" />, title: 'Digital Art Workshops', description: 'Interactive workshops merging traditional art with digital tools', image: 'https://i.ibb.co/GvzrmdY0/Screenshot-2024-11-21-203443-768x485.png' },
    { icon: <Music className="w-10 h-10 text-blue-400" />, title: 'Dance Stars Program', description: 'Youth dance program with tech-enhanced performances', image: 'https://i.ibb.co/hRGmPHmR/sameh-dance-gif-1.gif' },
    { icon: <Camera className="w-10 h-10 text-green-400" />, title: 'Animation Workshop', description: 'Creative storytelling and digital animation for young creators', image: 'https://i.ibb.co/LDcNRcxD/GEM-WORKSHOP-4-768x432.gif' },
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
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          className="absolute inset-0"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] neon-text"
                      style={{ textShadow: '0 0 10px #bf00ff, 0 0 20px #ff00ff' }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
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

      {/* Introduction Video Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 max-w-5xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              From Vision to Reality
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              WOW Studio transforms creative concepts into reality, delivering cutting-edge immersive experiences for both B2C and B2B audiences.
            </p>
            <div className="video-container mb-8">
              <iframe
                src="https://www.youtube.com/embed/4HKPgOBqz7A"
                title="WOW Studio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-64 sm:h-80 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)]"
              ></iframe>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              We partner with a global network of 3D artists, game developers, engineers, and technologists to create pioneering projects—from XR/VR games to projection mapping and virtual environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      {services.map((service, index) => (
        <section key={service.title} className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black/70 to-gray-900/70">
          <div className="container mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
                {service.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{service.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.projects.map((project, projectIndex) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                  className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
                >
                  <div className="h-56 sm:h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{project.title}</h3>
                    <p className="text-gray-300 text-base sm:text-lg">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Education Section */}
      <section className="py-16 sm:py-20 px-4" ref={galleryRef}>
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              Art-Tech Education & Workshops
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our innovative programs that blend creativity, technology, and hands-on learning to inspire the next generation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {educationProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
              >
                <div className="h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <motion.div
                    className="inline-block p-3 bg-white/10 rounded-xl mb-4 shadow-[0_0_10px_rgba(147,51,234,0.2)]"
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.icon}
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{project.title}</h3>
                  <p className="text-gray-300 text-base sm:text-lg">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-900/70 to-black">
        <Newsletter />
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

export default Studio;