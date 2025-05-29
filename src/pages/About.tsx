import React from "react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";

// Preload critical image
const preloadImage = new Image();
preloadImage.src = "https://i.ibb.co/SXsmN7F6/image18.gif";

const About = () => {
  const sections = [
    {
      title: "Step into Wonder",
      description:
        "WOW Zone is a space where creativity, technology, and innovation merge to create immersive experiences. As Egypt’s first fully immersive experiential space, it combines digital art, gaming, and education into an interactive and evolving environment.",
      image: "https://i.ibb.co/xtMpcrv5/Nice-slides-WOW-768x432.png",
    },
    {
      title: "Beyond Reality: Our Vision",
      description:
        "WOW Zone redefines entertainment by blending digital and physical experiences. It offers an innovative approach to interaction, learning, and play through extended reality, artificial intelligence, and immersive storytelling.",
      image: "https://i.ibb.co/k2L6TkFc/Screenshot-2024-11-21-202830-768x427.png",
    },
    {
      title: "A Flexible and Transformative Space",
      description:
        "WOW Zone is designed to adapt and transform. It can function as a high-energy gaming space, a digital art exhibition, an interactive storytelling venue, or a learning hub. This modular design allows for a constantly evolving experience.",
      image: "https://i.ibb.co/jvYwq4PR/Presentation1-768x432.png",
    },
    {
      title: "Innovation through AI and Extended Reality",
      description:
        "WOW Zone integrates artificial intelligence, projection-mapped storytelling, and interactive performances. Every visit offers new and engaging experiences powered by advanced immersive technology.",
      image: "https://i.ibb.co/bgq9rSBk/ar-gif-2-1-1024x439.gif",
    },
    {
      title: "For All Generations, All Experiences",
      description:
        "WOW Zone welcomes children, teenagers, and adults. Whether visitors come to play, learn, or explore, the space adapts to provide unique and engaging experiences.",
      image: "https://i.ibb.co/9HBTjwVN/tech-ai-2-768x432.gif",
    },
    {
      title: "A Platform for Creativity and Collaboration",
      description:
        "WOW Zone provides a space for creators, artists, and technology enthusiasts to experiment with immersive storytelling and interactive content. It serves as a hub for innovation in digital entertainment and learning.",
      image: "https://i.ibb.co/4R6FMxq0/20241113-174549-1.gif",
    },
  ];

  const additionalDetails = [
    {
      title: "Our Journey",
      description: "Since its inception, WOW Zone has been a pioneer in immersive technology, starting as a small project and growing into Egypt’s leading experiential space.",
      image: "https://i.ibb.co/SXsmN7F6/image18.gif",
    },
    {
      title: "Meet the Team",
      description: "Our team of innovators, artists, and technologists work together to bring WOW Zone to life, pushing the boundaries of what’s possible.",
      image: "https://i.ibb.co/k2L6TkFc/Screenshot-2024-11-21-202830-768x427.png",
    },
    {
      title: "Our Partners",
      description: "We collaborate with leading tech companies and creative studios to deliver cutting-edge experiences that captivate and inspire.",
      image: "https://i.ibb.co/jvYwq4PR/Presentation1-768x432.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white relative overflow-hidden">
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

      <PageHero
        title="About WOW Immersive"
        subtitle="A New Era of Immersive Entertainment"
        description="WOW Zone creates interactive digital worlds that redefine storytelling, learning, and entertainment."
        imageUrl="https://i.ibb.co/SXsmN7F6/image18.gif"
      />

      <main className="container mx-auto px-4 py-32 relative z-10">
        {/* Main Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`mb-20 flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div className="md:w-1/2 p-6 bg-gray-900/80 backdrop-blur-md rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {section.title}
              </motion.h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
            <div className="md:w-1/2 p-4">
              <motion.img
                src={section.image}
                alt={section.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </motion.div>
        ))}

        {/* Additional Details Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            More About WOW Zone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-gray-900/80 backdrop-blur-md rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300"
              >
                <img
                  src={detail.image}
                  alt={detail.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-2xl font-semibold mb-3 text-indigo-400">{detail.title}</h3>
                <p className="text-gray-300 leading-relaxed">{detail.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default About;