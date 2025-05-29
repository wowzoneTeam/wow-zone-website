import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Lightbulb, Target, MonitorSmartphone, Rocket, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';

const CorporateEvents = () => {
  // Observer to trigger animations when in view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Features list for corporate events
  const features = [
    {
      icon: <Building2 className="w-8 h-8" />, 
      title: "Immersive Brand Activations",
      description: "Craft unforgettable brand experiences that seamlessly blend physical and digital worlds using XR, AI-driven storytelling, and interactive installations.",
      image: "https://i.ibb.co/wN1796Df/image99.jpg"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Next-Gen Team Building",
      description: "Transform corporate bonding with AI-powered challenges, interactive VR & AR team-building experiences, and immersive game-based problem-solving.",
      image: "https://i.ibb.co/W4w0gQCr/ar-gif-2-768x329.gif"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Interactive Corporate Training",
      description: "Upgrade learning with virtual training environments, AI-powered simulations, and 360-degree storytelling that drive deep engagement and retention.",
      image: "https://i.ibb.co/Fkhm7vbF/touch-screen.gif"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Immersive Product Launches",
      description: "Introduce products through holograms, real-time interactive projections, and VR showcases, creating powerful, lasting impressions.",
      image: "https://i.ibb.co/0VdKfzDT/VR-IN-AND-OUT-GIF.gif"
    },
    {
      icon: <MonitorSmartphone className="w-8 h-8" />,
      title: "Digital-Physical Fusion Experiences",
      description: "Break traditional event boundaries with immersive pop-ups, projection mapping activations, and interactive hybrid experiences for maximum impact.",
      image: "https://i.ibb.co/b5tQRqFq/Video-Capture-20240721-014245.jpg"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation Labs & Hackathons",
      description: "Host AI-driven creativity labs, immersive startup incubators, and multi-sensory brainstorming to fuel corporate innovation and strategic growth.",
      image: "https://i.ibb.co/jvYwq4PR/Presentation1-768x432.png"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global & Hybrid Corporate Experiences",
      description: "Connect worldwide with real-time XR-based corporate meetups, hybrid digital networking, and immersive conference experiences.",
      image: "https://i.ibb.co/JR2T57sb/image34.png"
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <PageHero
        title="Corporate Experiences Redefined"
        subtitle="Beyond Events: Immersion, Innovation, Impact"
        description="WOW Zone transforms corporate events into multi-sensory, next-gen experiences. Whether it’s brand activations, team-building, or high-tech product showcases, we bring immersive storytelling and interactive engagement to the forefront."
        imageUrl="https://i.ibb.co/QvvPJSMJ/image20.jpg"
      />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">The Future of Corporate Engagement</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Step into a world where corporate events are dynamic, interactive, and deeply impactful. WOW Zone brings together immersive tech, creative storytelling, and digital artistry to revolutionize business experiences.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="inline-block p-3 bg-purple-600/20 rounded-xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Elevate Your Corporate Vision</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Whether you’re looking to engage customers, unite teams, or revolutionize training, WOW Zone delivers high-tech, immersive corporate solutions that drive real impact.
        </p>
        <a
          href="/contact"
          className="px-6 py-3 bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Book a Consultation
        </a>
      </section>
    </div>
  );
};

export default CorporateEvents;
