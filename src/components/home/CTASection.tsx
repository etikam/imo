import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Star,
  Users,
  Building2
} from 'lucide-react';
import { GradientButton } from '../ui/GradientButton';
import { AnimatedCard } from '../ui/AnimatedCard';

export const CTASection: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      description: 'Lun-Ven 9h-18h',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@itchoh.fr',
      description: 'Réponse sous 24h',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: '123 Avenue des Champs',
      description: '75008 Paris, France',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: 'Lun-Ven 9h-18h',
      description: 'Support 24/7',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Propriétaire de 5 biens',
      content: 'ITCHOH GROUP a révolutionné ma gestion immobilière. Interface intuitive et service client exceptionnel.',
      rating: 5
    },
    {
      name: 'Pierre Martin',
      role: 'Investisseur immobilier',
      content: 'Grâce à leur plateforme, je gagne un temps précieux et mes revenus locatifs ont augmenté de 15%.',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Propriétaire-bailleur',
      content: 'Service professionnel et réactif. Je recommande vivement pour tous les propriétaires.',
      rating: 5
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `,
            backgroundSize: '600px 600px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Contactez-nous
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Prêt à commencer votre
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              transformation digitale ?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Rejoignez plus de 1200 propriétaires qui nous font confiance pour 
            gérer leur patrimoine immobilier. Découvrez la différence ITCHOH GROUP.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <GradientButton
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              className="min-w-[250px] bg-white text-gray-900 hover:bg-gray-100"
            >
              Commencer maintenant
            </GradientButton>
            
            <GradientButton
              variant="outline"
              size="lg"
              className="min-w-[250px] border-white/30 text-white hover:bg-white/10"
            >
              Planifier un appel
            </GradientButton>
          </div>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <AnimatedCard
              key={index}
              delay={index * 0.1}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl
                  bg-gradient-to-br ${info.color}
                  flex items-center justify-center
                  shadow-lg group-hover:shadow-xl transition-all duration-300
                `}
              >
                <info.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-blue-300 font-medium mb-1">{info.value}</p>
              <p className="text-gray-400 text-sm">{info.description}</p>
            </AnimatedCard>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Ce que disent nos clients
            </h3>
            <p className="text-gray-300 text-lg">
              Découvrez pourquoi ils nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard
                key={index}
                delay={0.6 + index * 0.1}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
              >
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-12 h-12 text-blue-400 mr-4" />
            <div className="text-left">
              <h4 className="text-2xl font-bold">ITCHOH GROUP</h4>
              <p className="text-gray-400">Votre partenaire immobilier de confiance</p>
            </div>
          </div>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ne laissez plus la gestion immobilière vous compliquer la vie. 
            Rejoignez la révolution digitale avec ITCHOH GROUP.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center text-blue-300">
              <Phone className="w-5 h-5 mr-2" />
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600" />
            <div className="flex items-center text-blue-300">
              <Mail className="w-5 h-5 mr-2" />
              <span>contact@itchoh.fr</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};