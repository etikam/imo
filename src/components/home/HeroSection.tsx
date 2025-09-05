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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background sophistiqué - espace-temps qui se tord */}
      <div className="absolute inset-0">
        {/* Base sombre avec dégradé subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Réseau de connectivité - points et connexions */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <defs>
            <linearGradient id="connection-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
            <filter id="connection-glow-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          
          {/* Points de connexion (nœuds) */}
          {[
            { x: 200, y: 150, size: 8, delay: 0 },
            { x: 400, y: 200, size: 6, delay: 0.5 },
            { x: 600, y: 120, size: 10, delay: 1 },
            { x: 800, y: 180, size: 7, delay: 1.5 },
            { x: 1000, y: 160, size: 9, delay: 2 },
            { x: 150, y: 350, size: 6, delay: 0.3 },
            { x: 350, y: 400, size: 8, delay: 0.8 },
            { x: 550, y: 380, size: 7, delay: 1.3 },
            { x: 750, y: 420, size: 9, delay: 1.8 },
            { x: 950, y: 390, size: 6, delay: 2.3 },
            { x: 250, y: 600, size: 8, delay: 0.6 },
            { x: 450, y: 650, size: 7, delay: 1.1 },
            { x: 650, y: 620, size: 9, delay: 1.6 },
            { x: 850, y: 680, size: 6, delay: 2.1 },
            { x: 1050, y: 640, size: 8, delay: 2.6 }
          ].map((node, index) => (
            <motion.circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="url(#node-glow)"
              filter="url(#connection-glow-effect)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.7, 1],
                scale: [0, 1.2, 0.8, 1]
              }}
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
          
          {/* Connexions entre les points - lignes dynamiques */}
          {[
            // Ligne du haut
            { from: { x: 200, y: 150 }, to: { x: 400, y: 200 }, delay: 0.2 },
            { from: { x: 400, y: 200 }, to: { x: 600, y: 120 }, delay: 0.4 },
            { from: { x: 600, y: 120 }, to: { x: 800, y: 180 }, delay: 0.6 },
            { from: { x: 800, y: 180 }, to: { x: 1000, y: 160 }, delay: 0.8 },
            
            // Ligne du milieu
            { from: { x: 150, y: 350 }, to: { x: 350, y: 400 }, delay: 0.3 },
            { from: { x: 350, y: 400 }, to: { x: 550, y: 380 }, delay: 0.5 },
            { from: { x: 550, y: 380 }, to: { x: 750, y: 420 }, delay: 0.7 },
            { from: { x: 750, y: 420 }, to: { x: 950, y: 390 }, delay: 0.9 },
            
            // Ligne du bas
            { from: { x: 250, y: 600 }, to: { x: 450, y: 650 }, delay: 0.4 },
            { from: { x: 450, y: 650 }, to: { x: 650, y: 620 }, delay: 0.6 },
            { from: { x: 650, y: 620 }, to: { x: 850, y: 680 }, delay: 0.8 },
            { from: { x: 850, y: 680 }, to: { x: 1050, y: 640 }, delay: 1.0 },
            
            // Connexions verticales
            { from: { x: 200, y: 150 }, to: { x: 150, y: 350 }, delay: 0.1 },
            { from: { x: 400, y: 200 }, to: { x: 350, y: 400 }, delay: 0.3 },
            { from: { x: 600, y: 120 }, to: { x: 550, y: 380 }, delay: 0.5 },
            { from: { x: 800, y: 180 }, to: { x: 750, y: 420 }, delay: 0.7 },
            { from: { x: 1000, y: 160 }, to: { x: 950, y: 390 }, delay: 0.9 },
            
            // Connexions diagonales
            { from: { x: 150, y: 350 }, to: { x: 250, y: 600 }, delay: 0.2 },
            { from: { x: 350, y: 400 }, to: { x: 450, y: 650 }, delay: 0.4 },
            { from: { x: 550, y: 380 }, to: { x: 650, y: 620 }, delay: 0.6 },
            { from: { x: 750, y: 420 }, to: { x: 850, y: 680 }, delay: 0.8 },
            { from: { x: 950, y: 390 }, to: { x: 1050, y: 640 }, delay: 1.0 }
          ].map((connection, index) => (
            <motion.line
              key={`connection-${index}`}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke="url(#connection-glow)"
              strokeWidth="2"
              filter="url(#connection-glow-effect)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 4,
                delay: connection.delay,
                repeat: Infinity,
                repeatDelay: 1.5
              }}
            />
          ))}
          
          {/* Connexions aléatoires supplémentaires pour plus de complexité */}
          {Array.from({ length: 12 }, (_, i) => {
            const nodes = [
              { x: 200, y: 150 }, { x: 400, y: 200 }, { x: 600, y: 120 }, { x: 800, y: 180 },
              { x: 1000, y: 160 }, { x: 150, y: 350 }, { x: 350, y: 400 }, { x: 550, y: 380 },
              { x: 750, y: 420 }, { x: 950, y: 390 }, { x: 250, y: 600 }, { x: 450, y: 650 },
              { x: 650, y: 620 }, { x: 850, y: 680 }, { x: 1050, y: 640 }
            ];
            const from = nodes[Math.floor(Math.random() * nodes.length)];
            const to = nodes[Math.floor(Math.random() * nodes.length)];
            
            return (
              <motion.line
                key={`random-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#connection-glow)"
                strokeWidth="1"
                filter="url(#connection-glow-effect)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 6,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 2
                }}
              />
            );
          })}
        </svg>

        {/* Effets de distorsion subtils - harmonie avec les lignes orange */}
        <div className="absolute inset-0">
          {/* Zone de distorsion principale */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, rgba(234,88,12,0.03) 30%, transparent 70%)',
              filter: 'blur(3px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Zone de distorsion secondaire */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, rgba(249,115,22,0.02) 40%, transparent 80%)',
              filter: 'blur(4px)'
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 0, -360],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Particules qui se déplacent le long des connexions */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => {
            const paths = [
              // Lignes horizontales
              { start: { x: 200, y: 150 }, end: { x: 1000, y: 160 } },
              { start: { x: 150, y: 350 }, end: { x: 950, y: 390 } },
              { start: { x: 250, y: 600 }, end: { x: 1050, y: 640 } },
              // Lignes verticales
              { start: { x: 200, y: 150 }, end: { x: 150, y: 350 } },
              { start: { x: 600, y: 120 }, end: { x: 550, y: 380 } },
              { start: { x: 800, y: 180 }, end: { x: 750, y: 420 } },
              // Lignes diagonales
              { start: { x: 150, y: 350 }, end: { x: 250, y: 600 } },
              { start: { x: 750, y: 420 }, end: { x: 850, y: 680 } }
            ];
            
            const path = paths[i % paths.length];
            const progress = Math.random();
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${path.start.x + (path.end.x - path.start.x) * progress}px`,
                  top: `${path.start.y + (path.end.y - path.start.y) * progress}px`,
                  background: `radial-gradient(circle, #f97316 0%, #ea580c 50%, transparent 100%)`,
                  boxShadow: `0 0 12px #f97316`
                }}
                animate={{
                  x: [0, path.end.x - path.start.x],
                  y: [0, path.end.y - path.start.y],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>

        {/* Lignes d'énergie orange qui traversent l'écran */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(90deg, transparent, ${
                  ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
                }, transparent)`,
                filter: 'blur(1px)'
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.7,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Overlay subtil pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20" />
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