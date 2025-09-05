import { motion } from 'framer-motion';
import { ArrowRight, Building2, Home } from 'lucide-react';
import { FloatingElement } from '../ui/FloatingElement';
import { ImageStack } from '../ui/ImageStack';
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

  // Phrase d'accroche unique
  const mainSentence = 'La plateforme immobilière qui simplifie tout';

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background sophistiqué - espace-temps qui se tord */}
      <div className="absolute inset-0">
        {/* Base sombre avec dégradé subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Courbes élégantes et fluides */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <linearGradient id="curve-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
            </linearGradient>
            <filter id="curve-glow-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Courbes horizontales élégantes */}
          <motion.path
            d="M 0 20 Q 25 10, 50 20 T 100 20"
            stroke="url(#curve-glow)"
            strokeWidth="0.8"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
          
          <motion.path
            d="M 0 50 Q 30 40, 60 50 T 100 50"
            stroke="url(#curve-glow)"
            strokeWidth="0.6"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 10,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
          
          <motion.path
            d="M 0 80 Q 20 70, 40 80 T 100 80"
            stroke="url(#curve-glow)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 12,
              delay: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
          
          {/* Courbes verticales élégantes */}
          <motion.path
            d="M 20 0 Q 15 25, 20 50 T 20 100"
            stroke="url(#curve-glow)"
            strokeWidth="0.7"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 9,
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 2.5
            }}
          />
          
          <motion.path
            d="M 80 0 Q 85 30, 80 60 T 80 100"
            stroke="url(#curve-glow)"
            strokeWidth="0.6"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 11,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 3.5
            }}
          />
          
          {/* Courbes diagonales fluides */}
          <motion.path
            d="M 0 0 Q 50 25, 100 0"
            stroke="url(#curve-glow)"
            strokeWidth="0.4"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 7,
              delay: 0.8,
              repeat: Infinity,
              repeatDelay: 2.2
            }}
          />
          
          <motion.path
            d="M 0 100 Q 50 75, 100 100"
            stroke="url(#curve-glow)"
            strokeWidth="0.4"
            fill="none"
            filter="url(#curve-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 9,
              delay: 2.2,
              repeat: Infinity,
              repeatDelay: 3.8
            }}
          />
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

        {/* Particules orange flottantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, #f97316 0%, #ea580c 50%, transparent 100%)`,
                boxShadow: `0 0 8px #f97316`
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
            }}
          />
        ))}
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
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center py-12 lg:py-20">
            {/* Contenu gauche */}
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-3 space-y-8 text-center lg:text-left"
          >
              {/* Titre et sous-titre */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              <span className="sr-only">Message principal</span>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-block"
                >
                    {mainSentence}
                </motion.span>
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

            {/* Stack d'images avec transition fluide */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-2 mx-auto lg:mx-0"
            >
              <ImageStack
                images={carouselImages}
                interval={5000}
                height="h-[300px] sm:h-[350px] lg:h-[400px]"
                width="w-[250px] sm:w-[300px] lg:w-[350px]"
                showIndicators={true}
                showParticles={true}
                particleCount={4}
                stackDepth="pronounced"
                borderStyle="visible"
                shadowIntensity="strong"
              />
            </motion.div>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default HeroSection;