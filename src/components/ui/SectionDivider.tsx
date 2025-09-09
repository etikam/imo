import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative my-12 sm:my-16 ${className}`} aria-hidden>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="origin-center h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ willChange: 'transform' }}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
      />
    </div>
  );
};

export default SectionDivider;


