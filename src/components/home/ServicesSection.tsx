import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  FileText, 
  CreditCard, 
  Wrench, 
  BarChart3, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { GradientButton } from '../ui/GradientButton';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Building2,
      title: 'Gestion des Biens',
      description: 'Administration complète de votre parc immobilier avec suivi en temps réel.',
      features: ['Enregistrement des biens', 'Catégorisation avancée', 'Suivi des statuts', 'Gestion documentaire'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: FileText,
      title: 'Gestion des Contrats',
      description: 'Création, suivi et gestion automatisée de tous vos contrats immobiliers.',
      features: ['Contrats de gestion', 'Baux de location', 'Échéances automatiques', 'Renouvellements'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: CreditCard,
      title: 'Gestion Financière',
      description: 'Suivi complet des paiements, quittances et gestion des impayés.',
      features: ['Encaissement loyers', 'Génération quittances', 'Suivi impayés', 'Relances automatiques'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Wrench,
      title: 'Maintenance',
      description: 'Gestion proactive de la maintenance avec réseau de prestataires qualifiés.',
      features: ['Déclaration incidents', 'Planification interventions', 'Suivi réparations', 'Réseau prestataires'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: BarChart3,
      title: 'Reporting & Analytics',
      description: 'Tableaux de bord avancés et rapports détaillés pour optimiser vos investissements.',
      features: ['Tableaux de bord', 'Analyses performance', 'Rapports personnalisés', 'Métriques ROI'],
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      icon: Users,
      title: 'Gestion Clients',
      description: 'Interface dédiée pour propriétaires et locataires avec espaces personnalisés.',
      features: ['Espaces personnalisés', 'Communication intégrée', 'Documents partagés', 'Notifications temps réel'],
      color: 'from-teal-500 to-blue-500',
      bgColor: 'from-teal-50 to-blue-50'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
            Nos Services
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Une solution complète pour
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              votre gestion immobilière
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services conçus pour simplifier 
            et optimiser la gestion de votre patrimoine immobilier.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <AnimatedCard
              key={index}
              delay={index * 0.1}
              className="group cursor-pointer"
            >
              {/* Service Header */}
              <div className="mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`
                    w-16 h-16 rounded-2xl mb-4
                    bg-gradient-to-br ${service.color}
                    flex items-center justify-center
                    shadow-lg group-hover:shadow-xl transition-all duration-300
                  `}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + featureIndex * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>En savoir plus</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.div>

              {/* Decorative gradient */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl
                bg-gradient-to-r ${service.color}
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
              `} />
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à transformer votre gestion immobilière ?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez comment notre plateforme peut simplifier et optimiser 
            la gestion de votre patrimoine immobilier.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Demander une démonstration
            </GradientButton>
            
            <GradientButton
              variant="outline"
              size="lg"
            >
              Télécharger la brochure
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};