import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base sombre avec dégradé subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Réseau de connectivité - points et connexions */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="connection-glow-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
          </linearGradient>
          <filter id="connection-glow-effect-bg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="node-glow-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        
        {/* Points de connexion (nœuds) - version plus subtile */}
        {[
          { x: 20, y: 20, size: 0.6, delay: 0 },
          { x: 40, y: 25, size: 0.4, delay: 0.5 },
          { x: 60, y: 15, size: 0.8, delay: 1 },
          { x: 80, y: 22, size: 0.5, delay: 1.5 },
          { x: 95, y: 20, size: 0.7, delay: 2 },
          { x: 15, y: 45, size: 0.4, delay: 0.3 },
          { x: 35, y: 50, size: 0.6, delay: 0.8 },
          { x: 55, y: 48, size: 0.5, delay: 1.3 },
          { x: 75, y: 52, size: 0.7, delay: 1.8 },
          { x: 90, y: 49, size: 0.4, delay: 2.3 },
          { x: 25, y: 75, size: 0.6, delay: 0.6 },
          { x: 45, y: 80, size: 0.5, delay: 1.1 },
          { x: 65, y: 78, size: 0.7, delay: 1.6 },
          { x: 85, y: 85, size: 0.4, delay: 2.1 },
          { x: 95, y: 80, size: 0.6, delay: 2.6 }
        ].map((node, index) => (
          <motion.circle
            key={`node-bg-${index}`}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="url(#node-glow-bg)"
            filter="url(#connection-glow-effect-bg)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.3, 0.6],
              scale: [0, 1.1, 0.7, 1]
            }}
            transition={{
              duration: 4,
              delay: node.delay,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
        
        {/* Connexions entre les points - lignes dynamiques plus subtiles */}
        {[
          // Ligne du haut
          { from: { x: 20, y: 20 }, to: { x: 40, y: 25 }, delay: 0.2 },
          { from: { x: 40, y: 25 }, to: { x: 60, y: 15 }, delay: 0.4 },
          { from: { x: 60, y: 15 }, to: { x: 80, y: 22 }, delay: 0.6 },
          { from: { x: 80, y: 22 }, to: { x: 95, y: 20 }, delay: 0.8 },
          
          // Ligne du milieu
          { from: { x: 15, y: 45 }, to: { x: 35, y: 50 }, delay: 0.3 },
          { from: { x: 35, y: 50 }, to: { x: 55, y: 48 }, delay: 0.5 },
          { from: { x: 55, y: 48 }, to: { x: 75, y: 52 }, delay: 0.7 },
          { from: { x: 75, y: 52 }, to: { x: 90, y: 49 }, delay: 0.9 },
          
          // Ligne du bas
          { from: { x: 25, y: 75 }, to: { x: 45, y: 80 }, delay: 0.4 },
          { from: { x: 45, y: 80 }, to: { x: 65, y: 78 }, delay: 0.6 },
          { from: { x: 65, y: 78 }, to: { x: 85, y: 85 }, delay: 0.8 },
          { from: { x: 85, y: 85 }, to: { x: 95, y: 80 }, delay: 1.0 },
          
          // Connexions verticales
          { from: { x: 20, y: 20 }, to: { x: 15, y: 45 }, delay: 0.1 },
          { from: { x: 40, y: 25 }, to: { x: 35, y: 50 }, delay: 0.3 },
          { from: { x: 60, y: 15 }, to: { x: 55, y: 48 }, delay: 0.5 },
          { from: { x: 80, y: 22 }, to: { x: 75, y: 52 }, delay: 0.7 },
          { from: { x: 95, y: 20 }, to: { x: 90, y: 49 }, delay: 0.9 },
          
          // Connexions diagonales
          { from: { x: 15, y: 45 }, to: { x: 25, y: 75 }, delay: 0.2 },
          { from: { x: 35, y: 50 }, to: { x: 45, y: 80 }, delay: 0.4 },
          { from: { x: 55, y: 48 }, to: { x: 65, y: 78 }, delay: 0.6 },
          { from: { x: 75, y: 52 }, to: { x: 85, y: 85 }, delay: 0.8 },
          { from: { x: 90, y: 49 }, to: { x: 95, y: 80 }, delay: 1.0 }
        ].map((connection, index) => (
          <motion.line
            key={`connection-bg-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="url(#connection-glow-bg)"
            strokeWidth="1.5"
            filter="url(#connection-glow-effect-bg)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 6,
              delay: connection.delay,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
        
        {/* Connexions aléatoires supplémentaires pour plus de complexité */}
        {Array.from({ length: 8 }, (_, i) => {
          const nodes = [
            { x: 20, y: 20 }, { x: 40, y: 25 }, { x: 60, y: 15 }, { x: 80, y: 22 },
            { x: 95, y: 20 }, { x: 15, y: 45 }, { x: 35, y: 50 }, { x: 55, y: 48 },
            { x: 75, y: 52 }, { x: 90, y: 49 }, { x: 25, y: 75 }, { x: 45, y: 80 },
            { x: 65, y: 78 }, { x: 85, y: 85 }, { x: 95, y: 80 }
          ];
          const from = nodes[Math.floor(Math.random() * nodes.length)];
          const to = nodes[Math.floor(Math.random() * nodes.length)];
          
          return (
            <motion.line
              key={`random-bg-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#connection-glow-bg)"
              strokeWidth="0.8"
              filter="url(#connection-glow-effect-bg)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 8,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 4 + Math.random() * 3
              }}
            />
          );
        })}
      </svg>

      {/* Particules orange flottantes - version plus subtile */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              }, transparent)`,
              boxShadow: `0 0 6px ${
                ['#f97316', '#ea580c', '#dc2626'][Math.floor(Math.random() * 3)]
              }`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Overlay subtil pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/30" />
    </div>
  );
};

export default AnimatedBackground;
