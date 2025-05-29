import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Glasses, Camera, Bot, Cpu, Projector, Gamepad, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Newsletter from '../components/Newsletter';

const Technologies = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const galleryRef = useRef(null);

  const techCategories = [
    {
      title: 'Augmented Reality (AR)',
      description: 'Seamlessly blending digital content with the physical world for interactive experiences.',
      items: [
        { title: 'Marker based AR', description: 'Connected to immersive projected environments', image: 'https://i.ibb.co/gZ4Zb6vm/image82.png' },
        { title: 'Body detection AR', description: 'Integrated into immersive entertainment and creative edutaining workshops', image: 'https://i.ibb.co/bgq9rSBk/ar-gif-2-1-1024x439.gif' },
        { title: 'Spatial AR', description: 'Enhancing gamified interactive storytelling with spatial awareness', image: 'https://i.ibb.co/zHLf3dkB/ar-m1-768x358-1.jpg' },
      ],
    },
    {
      title: 'Virtual Reality (VR)',
      description: 'Immersive digital realms that transport users to new dimensions.',
      items: [
        { title: 'VR Multiplayer Game – UBR', description: 'Free-roaming VR multiplayer game with virtual maps synced to physical spaces', image: 'https://i.ibb.co/XfxHrpZj/VR-IN-AND-OUT-GIF-3.gif' },
        { title: 'VR Art', description: 'Prototyping, game environments, storytelling, performances, and workshops', image: 'https://i.ibb.co/F4J0jDpb/1121-1-1-768x357.gif' },
        { title: 'WebVR – Virtual Worlds', description: 'VR headset and web 3.0 platform experiences', image: 'https://i.ibb.co/TqnFZKQZ/Screenshot-2024-11-21-212418-2.png' },
      ],
    },
    {
      title: 'Projection',
      description: 'Dynamic visual displays that redefine spaces and objects.',
      items: [
        { title: 'Screen-based with adapted content', description: 'Indoors, Outdoors, Facades, Objects, People', image: 'https://i.ibb.co/PvjmsC6g/SR-games-gif.gif' },
      ],
    },
    {
      title: 'Generative / Interactive Media Tech',
      description: 'Real-time responsive content creation using advanced technology.',
      items: [
        { title: 'Generative Visuals', description: 'Infinite real-time visuals powered by algorithms and genAI tools', image: 'https://i.ibb.co/4R6FMxq0/20241113-174549-1.gif' },
        { title: 'Interactive Touch & Motion', description: 'Touchscreen, hand tracking, and body detection for games and experiences', image: 'https://i.ibb.co/Fkhm7vbF/touch-screen.gif' },
        { title: 'Remote Connectivity & Audiovisual Interaction', description: 'Real-time audio-visual control for gamified solutions and events', image: 'https://i.ibb.co/V1fmxhG/Video-Capture-20241006-205628-e1733089111541-1024x511.jpg' },
      ],
    },
    {
      title: 'Artificial Intelligence (AI)',
      description: 'Intelligent systems enhancing creativity and interactivity.',
      items: [
        { title: 'Generative AI + Real time prompts', description: 'Live immersive video formats from real-time prompts', image: 'https://i.ibb.co/xKjbV8kQ/promt-AI-Desert-1.gif' },
        { title: 'Generative AI + Live Painting', description: 'Live painting transformed into dynamic immersive imagery', image: 'https://i.ibb.co/67QnqtDy/art-ai.gif' },
        { title: 'Generative AI + Live Camera', description: 'Live camera input with prompts for transformative imagery', image: 'https://i.ibb.co/4R6FMxq0/20241113-174549-1.gif' },
        { title: '3D Capture Technologies', description: 'Photogrammetry, NeRFs, and Gaussian Splats for 3D object creation', image: 'https://i.ibb.co/X067S4R/3d-scan-3-D-selfie-hologram-volumetric-3.gif' },
      ],
    },
  ];

  const innovationPoints = [
    'We harness Generative AI to revolutionize design, content creation, and storytelling.',
    'Our WOW Group collaborates with global XR and AI innovators to develop cutting-edge tools and products.',
    'WOW Technologies drives innovation, creating transformational experiences that inspire and connect through technology.',
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
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.ibb.co/PX9BKTw/image113.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] neon-text">
              WOW Technologies
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-purple-300 mb-6 font-semibold tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              Your Portal to Immersive Technology
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed drop-shadow-sm mb-6">
              Where Creativity Fuels Transformative Innovation
            </p>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed drop-shadow-sm max-w-4xl mx-auto">
              At WOW Technologies, we innovate by integrating cutting-edge tools with creative applications, unlocking new possibilities for experiential design and next-gen engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Innovation Points */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black/70 to-gray-900/70">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
              Transforming Experiences with Technology
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {innovationPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-400">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Categories */}
      {techCategories.map((category, categoryIndex) => (
        <section key={category.title} className="py-16 sm:py-20 px-4" ref={galleryRef}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] neon-text">
                {category.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{category.description}</p>
            </motion.div>

            <div className="mt-8">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-12"
              >
                {category.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden h-full border border-indigo-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300"
                    >
                      <div className="h-56 sm:h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{item.title}</h3>
                        <p className="text-gray-300 text-base sm:text-lg">{item.description}</p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      ))}

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

export default Technologies;