import React from 'react';
import { motion } from 'framer-motion';

interface CarouselCardProps {
  role: 'prev' | 'active' | 'next';
  direction: 1 | -1; // 1: forward (right->left), -1: backward
  className?: string;
  children: React.ReactNode;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({ role, direction, className = '', children }) => {
  const variants = {
    prev: {
      initial: { opacity: 0, x: -140, scale: 0.9, rotateY: -6 },
      animate: { opacity: 0.85, x: 0, scale: 0.95, rotateY: 0 },
      exit: { opacity: 0.6, x: direction === 1 ? -220 : -40, scale: 0.9, rotateY: -4 }
    },
    active: {
      initial: { opacity: 0.9, x: direction === 1 ? 140 : -140 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0.9, x: direction === 1 ? -140 : 140, scale: 0.98 }
    },
    next: {
      initial: { opacity: 0, x: 140, scale: 0.9, rotateY: 6 },
      animate: { opacity: 0.85, x: 0, scale: 0.95, rotateY: 0 },
      exit: { opacity: 0.6, x: direction === 1 ? 40 : 220, scale: 0.9, rotateY: 4 }
    }
  } as const;

  return (
    <motion.div
      key={`${role}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[role]}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

export default CarouselCard;


