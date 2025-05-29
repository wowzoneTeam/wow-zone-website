import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="https://example.com/your-video.mp4" type="video/mp4" />
          <img
            src="https://youtu.be/a-w8031NM6s?si=npVCjRCUCcvO-28R"
            alt="Fallback Background"
            className="w-full h-full object-cover opacity-50"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90 backdrop-blur-sm" />
        {/* Glowing Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-50"
              initial={{ x: Math.random() * 100 - 50 + '%', y: Math.random() * 100 - 50 + '%', scale: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-600 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          >
            <Sparkles className="w-16 h-16 text-white animate-pulse" />
          </motion.div>
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 drop-shadow-[0_0_25px_rgba(147,51,234,0.8)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            WOW Immersive
          </motion.h1>
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl text-gray-200 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Step into a world where <span className="font-bold text-purple-300">digital innovation</span> merges with reality, crafting 
            <span className="font-bold text-pink-300"> unforgettable immersive experiences</span> that ignite your imagination.
          </motion.p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <motion.a
            href="#explore"
            className="inline-block px-10 py-4 text-xl sm:text-2xl font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-[0_4px_15px_rgba(147,51,234,0.4)]"
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(147,51,234,0.7)", rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our World
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;