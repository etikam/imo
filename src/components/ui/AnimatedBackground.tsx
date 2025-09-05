import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base sombre avec dégradé subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Bulles orange qui circulent */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              } 0%, transparent 70%)`,
              boxShadow: `0 0 15px ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              }`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Bulles plus petites qui montent */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `radial-gradient(circle, ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              } 0%, transparent 80%)`,
              boxShadow: `0 0 8px ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              }`
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Overlay subtil pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20" />
    </div>
  );
};

export default AnimatedBackground;
