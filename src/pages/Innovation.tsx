import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Wand2, Shapes, Zap } from 'lucide-react';
import PageHero from '../components/PageHero';

const Innovation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const innovations = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI Integration",
      description: "Cutting-edge artificial intelligence powering interactive experiences",
      image: "https://i.ibb.co/9HBTjwVN/tech-ai-2-768x432.gif"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Extended Reality",
      description: "Pushing boundaries with AR, VR, and mixed reality solutions",
      image: "https://i.ibb.co/gZ4Zb6vm/image82.png"
    },
    {
      icon: <Shapes className="w-8 h-8" />,
      title: "Interactive Media",
      description: "Dynamic content that responds to human interaction",
      image: "https://i.ibb.co/spbj2Jzw/IMG03394.jpg"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Future Tech",
      description: "Exploring emerging technologies and their creative applications",
      image: "https://i.ibb.co/TsV5cBh/tech-ai-4-576x1024.gif"
    }
  ];

  return (
    <div className="bg-black text-white">
      <PageHero
        title="Innovation Hub"
        subtitle="Shaping the Future of Interactive Experiences"
        description="Explore our latest technological innovations and creative solutions that are pushing the boundaries of what's possible in immersive entertainment."
        imageUrl="https://i.ibb.co/N2bNJ5ZZ/image56.png"
      />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Innovation Areas</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our cutting-edge technological innovations that are reshaping the future of interactive experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={innovation.image}
                    alt={innovation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="inline-block p-3 bg-purple-600/20 rounded-xl mb-4">
                    {innovation.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{innovation.title}</h3>
                  <p className="text-gray-300">{innovation.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Innovation;