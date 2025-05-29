import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  videoUrl,
  imageUrl,
  ctaText,
  ctaLink
}) => {
  const pageTitle = `${title} | WOW Zone`;
  const pageDescription = description;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
      aria-label="WOW Studio Hero Section"
    >
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl || ''} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
            aria-hidden
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} visual banner`}
            className="w-full h-full object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 drop-shadow-xl">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-purple-300 mb-4 tracking-wider">
            {subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            {description}
          </p>

          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-pink-500 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-300"
              aria-label={`CTA: ${ctaText}`}
            >
              {ctaText}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
