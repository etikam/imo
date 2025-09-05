import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Home } from 'lucide-react';
import { FloatingElement } from '../ui/FloatingElement';
import React from 'react';
import { Link } from 'react-router-dom';

// Importation des images pour garantir qu'elles sont bien chargées par Vite
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';

export const HeroSection = () => {
  const floatingIcons = [
    { Icon: Building2, delay: 0, position: 'top-20 left-20' },
    { Icon: Home, delay: 0.5, position: 'bottom-20 right-20' },
  ];

  const carouselImages = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Crossfade entre deux phrases (sans dactylo)
  const sentences = [
    'La plateforme immobilière qui simplifie tout',
    'Une expérience moderne pour locataires et propriétaires',
  ];
  const [idx, setIdx] = React.useState(0);
  
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % sentences.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Rotation des images du carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background sophistiqué avec lignes de méridien et espace-temps */}
      <div className="absolute inset-0">
        {/* Grille de méridiens animés */}
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1000 1000" fill="none">
          <defs>
            <linearGradient id="meridian" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-meridian" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Lignes de méridien verticales */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="1000"
              stroke="url(#meridian)"
              strokeWidth="1"
              filter="url(#glow-meridian)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                strokeWidth: [1, 3, 1]
              }}
              transition={{
                duration: 8,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
          
          {/* Lignes de méridien horizontales */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2="1000"
              y2={i * 50}
              stroke="url(#meridian)"
              strokeWidth="1"
              filter="url(#glow-meridian)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                strokeWidth: [1, 2.5, 1]
              }}
              transition={{
                duration: 10,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </svg>

        {/* Effets de distorsion espace-temps */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, -180, -360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Overlay gradient sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-blue-950/30 to-slate-950/40" />
      </div>

      {/* Hero Content */}
      <section className="relative z-10 px-4 pt-24 lg:px-6 w-full">
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <FloatingElement
            key={index}
            delay={delay}
            duration={4 + index * 0.5}
            amplitude={15 + index * 5}
            className={`absolute ${position} hidden lg:block`}
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center border border-white/20">
              <Icon className="w-8 h-8 text-blue-400" />
            </div>
          </FloatingElement>
        ))}

        {/* Main Content - Layout gauche/droite */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Contenu gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Titre et sous-titre */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                  <span className="sr-only">Message principal</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      {sentences[idx]}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-[50ch] mx-auto lg:mx-0 leading-relaxed">
                  Gérez vos biens ou trouvez votre logement idéal avec une expérience 
                  moderne et intuitive, conçue pour les propriétaires et locataires.
                </p>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.div>

            {/* Carousel d'images à droite */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Indicateurs de navigation */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Overlay avec informations */}
              <div className="absolute top-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Découvrez nos propriétés
                  </h3>
                  <p className="text-white/80 text-sm">
                    Plus de 1000 biens disponibles dans toute la région
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default HeroSection;