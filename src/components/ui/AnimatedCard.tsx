import React from 'react';
import { Card } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  delay = 0,
  duration = 0.6,
  children,
  ...cardProps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card {...cardProps}>
        {children}
      </Card>
    </motion.div>
  );
};