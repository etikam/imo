import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

interface ImageStackProps {
  images: string[];
  interval?: number;
  height?: string;
  width?: string;
  className?: string;
  showIndicators?: boolean;
  showParticles?: boolean;
  particleCount?: number;
  stackDepth?: 'subtle' | 'medium' | 'pronounced';
  borderStyle?: 'none' | 'subtle' | 'visible';
  shadowIntensity?: 'light' | 'medium' | 'strong';
}

export const ImageStack: React.FC<ImageStackProps> = ({
  images,
  interval = 4000,
  height = 'h-[300px] sm:h-[350px] lg:h-[400px]',
  width = 'w-[250px] sm:w-[300px] lg:w-[350px]',
  className = '',
  showIndicators = true,
  showParticles = true,
  particleCount = 4,
  stackDepth = 'pronounced',
  borderStyle = 'visible',
  shadowIntensity = 'strong'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Visibilité page / in-view pour contrôler l'autoplay
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onVis = () => setIsPageVisible(!document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotation automatique
  useEffect(() => {
    if (!isPageVisible || !isInView) return;
    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval, isPageVisible, isInView]);

  // Configuration des styles selon les props
  const getStackConfig = () => {
    switch (stackDepth) {
      case 'subtle':
        return {
          scale: { active: 1, next: 0.94, prev: 0.9 },
          opacity: { active: 1, next: 0.92, prev: 0.78 },
          y: { active: 0, next: 10, prev: 20 },
          x: { active: 0, next: 6, prev: 12 },
          rotateY: { active: 0, next: 2, prev: 4 },
          rotateX: { active: 0, next: 3, prev: 6 }
        };
      case 'medium':
        return {
          scale: { active: 1, next: 0.9, prev: 0.82 },
          opacity: { active: 1, next: 0.88, prev: 0.72 },
          y: { active: 0, next: 22, prev: 44 },
          x: { active: 0, next: 12, prev: 24 },
          rotateY: { active: 0, next: 3, prev: 6 },
          rotateX: { active: 0, next: 4, prev: 8 }
        };
      case 'pronounced':
      default:
        return {
          scale: { active: 1, next: 0.86, prev: 0.78 },
          opacity: { active: 1, next: 0.88, prev: 0.68 },
          y: { active: 0, next: 28, prev: 56 },
          x: { active: 0, next: 16, prev: 32 },
          rotateY: { active: 0, next: 4, prev: 8 },
          rotateX: { active: 0, next: 6, prev: 12 }
        };
    }
  };

  const getBorderClasses = () => {
    switch (borderStyle) {
      case 'none':
        return '';
      case 'subtle':
        return 'border border-white/10';
      case 'visible':
      default:
        return 'border border-white/15';
    }
  };

  const getShadowClasses = () => {
    switch (shadowIntensity) {
      case 'light':
        return 'shadow-md';
      case 'medium':
        return 'shadow-lg';
      case 'strong':
      default:
        return 'shadow-xl';
    }
  };

  const config = getStackConfig();

  return (
    <div ref={containerRef} className={`relative ${height} ${width} ${className}`}>
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        {/* Fond pour mieux voir l'empilement */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/30" />
        
        {/* Stack d'images */}
        {images.map((image, index) => {
          const isActive = index === currentImageIndex;
          const isNext = index === (currentImageIndex + 1) % images.length;
          const isPrev = index === (currentImageIndex - 1 + images.length) % images.length;
          
          return (
            <motion.div
              key={index}
              className={`absolute inset-0 rounded-2xl overflow-hidden ${getBorderClasses()} ${
                isActive 
                  ? `shadow-2xl border-2 border-white/30` 
                  : isNext 
                    ? `${getShadowClasses()} border border-white/20` 
                    : `${getShadowClasses()} border border-white/15`
              }`}
              initial={false}
              animate={{
                scale: isActive ? config.scale.active : isNext ? config.scale.next : config.scale.prev,
                opacity: isActive ? config.opacity.active : isNext ? config.opacity.next : config.opacity.prev,
                zIndex: isActive ? 30 : isNext ? 20 : 10,
                y: isActive ? config.y.active : isNext ? config.y.next : config.y.prev,
                x: isActive ? config.x.active : isNext ? config.x.next : config.x.prev,
                rotateY: isActive ? config.rotateY.active : isNext ? config.rotateY.next : config.rotateY.prev,
                rotateX: isActive ? config.rotateX.active : isNext ? config.rotateX.next : config.rotateX.prev,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                scale: { duration: 0.6 },
                opacity: { duration: 0.5 },
                y: { duration: 0.6 },
                x: { duration: 0.6 },
                rotateY: { duration: 0.6 },
                rotateX: { duration: 0.6 }
              }}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
              />
              
              {/* Overlay subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              
              {/* Indicateur de position */}
              {showIndicators && (
                <div className="absolute top-4 right-4">
                  <div className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white' : 'bg-white/50'
                  }`} />
                </div>
              )}
            </motion.div>
          );
        })}
        
        {/* Effet de particules flottantes */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none z-40">
            {Array.from({ length: particleCount }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1 + Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Indicateurs de navigation */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageStack;
