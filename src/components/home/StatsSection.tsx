import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Award, Clock, Shield } from 'lucide-react';
import { AnimatedCard } from '../ui/AnimatedCard';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Building2,
      number: '500+',
      label: 'Biens immobiliers gérés',
      description: 'Appartements, maisons, bureaux et locaux commerciaux',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      number: '1200+',
      label: 'Clients satisfaits',
      description: 'Propriétaires et locataires nous font confiance',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      number: '98%',
      label: 'Taux de satisfaction',
      description: 'Excellence reconnue par nos clients',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Années d\'expérience',
      description: 'Expertise reconnue dans l\'immobilier',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Support disponible',
      description: 'Assistance continue pour nos clients',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      number: '100%',
      label: 'Sécurité garantie',
      description: 'Protection totale de vos données',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Des chiffres qui parlent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              d'excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi ITCHOH GROUP est le partenaire de confiance 
            pour la gestion de votre patrimoine immobilier.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <AnimatedCard
              key={index}
              delay={index * 0.1}
              className="text-center group"
            >
              {/* Icon with gradient background */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl 
                  bg-gradient-to-br ${stat.color}
                  flex items-center justify-center
                  shadow-lg group-hover:shadow-xl transition-all duration-300
                `}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, type: 'spring' }}
                className={`
                  text-5xl md:text-6xl font-bold mb-3
                  bg-gradient-to-r ${stat.color} bg-clip-text text-transparent
                `}
              >
                {stat.number}
              </motion.div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {stat.description}
              </p>

              {/* Decorative element */}
              <div className={`
                w-16 h-1 mx-auto mt-6 rounded-full
                bg-gradient-to-r ${stat.color}
                opacity-50 group-hover:opacity-100 transition-opacity duration-300
              `} />
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" />
            Rejoignez nos clients satisfaits dès aujourd'hui
          </div>
        </motion.div>
      </div>
    </section>
  );
};