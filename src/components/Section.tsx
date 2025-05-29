import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

const Section = ({ icon, title, subtitle, description, imageUrl, reverse = false }: SectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
    >
      <div className="flex-1 space-y-6">
        <div className="inline-block p-3 bg-purple-600/20 rounded-xl">
          {icon}
        </div>
        <h2 className="text-4xl font-bold">{title}</h2>
        <h3 className="text-2xl text-purple-400">{subtitle}</h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-1">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </motion.div>
  );
};

export default Section;