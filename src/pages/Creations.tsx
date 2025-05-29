import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PageHero from "../components/PageHero";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";

const Creations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Creative Arts",
      description: "Unleashing creativity through immersive art and experiences.",
      image: "https://i.ibb.co/Z1pQz2Bm/image21.png",
      link: "/creative-arts",
    },
    {
      title: "Entertainment",
      description: "Where entertainment meets immersion.",
      image: "https://i.ibb.co/N6YGy0gL/VR-GIF.gif",
      link: "/entertainment",
    },
  ];

  const heroSlides = [
    {
      image: "https://i.ibb.co/d02934Vn/image11.jpg",
      title: "WOW Zone",
      subtitle: "Where Digital Meets Reality"
    },
    {
      image: "https://i.ibb.co/Z1pQz2Bm/image21.png",
      title: "Creative Arts",
      subtitle: "Unleashing Creativity"
    },
    {
      image: "https://i.ibb.co/N6YGy0gL/VR-GIF.gif",
      title: "Entertainment",
      subtitle: "Immersive Experiences"
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="absolute inset-0"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-5xl md:text-7xl font-bold mb-6"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-xl md:text-2xl text-gray-300"
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

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8">Where the Digital and Physical Worlds Blur</h2>
            <p className="text-xl text-gray-300 mb-12">
              Immerse yourself in WOW Zone, our experiential space, creative tech hub and showroom, powered by Magic Tech. WOW Zone serves both as a creative entertaining location-based audience-centered playground, and as a hub for cutting-edge tech solutions.
            </p>
            <div className="video-container mb-8">
              <iframe
                src="https://www.youtube.com/embed/SjfDTTO44Eo?controls=1&rel=0&playsinline=0&modestbranding=1&autoplay=0"
                title="WOW Zone"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="rounded-2xl shadow-2xl"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Zones */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Experience Zones</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore specialized zones where creativity, technology, and entertainment come together to create unique experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer relative overflow-hidden rounded-2xl"
                onClick={() => window.location.href = experience.link}
              >
                <div className="relative h-80">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-3xl font-bold mb-2">{experience.title}</h3>
                    {experience.title === "Creative Arts" ? (
                      <p className="text-gray-300 text-lg">Unleashing Creativity Through Immersive Art and Experiences</p>
                    ) : (
                      <p className="text-gray-300 text-lg">Entertainment Meets Immersion</p>
                    )}
                    <p className="text-gray-400 mt-2">
                      {experience.title === "Creative Arts" ? 
                        "Our hub for human-centered meaningful inspiring and creative experiences connecting art, creative expression, immersive storytelling, art-tech education and edutainment, wellbeing" : 
                        "Our hub for unforgettable fun, featuring VR multiplayer games, karaoke, disco experiences, and more."}
                    </p>
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

export default Creations;