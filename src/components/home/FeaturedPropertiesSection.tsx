import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star, 
  Heart, 
  Eye,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Données des propriétés à la une
const featuredProperties = [
  {
    id: 1,
    title: "Villa moderne avec piscine",
    location: "Kaloum, Conakry",
    price: "2,500,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    rating: 4.8,
    isNew: true,
    isFeatured: true,
    description: "Magnifique villa moderne avec piscine privée, jardin paysager et garage pour 2 voitures."
  },
  {
    id: 2,
    title: "Appartement haut standing",
    location: "Dixinn, Conakry",
    price: "1,800,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    rating: 4.6,
    isNew: false,
    isFeatured: true,
    description: "Appartement moderne au cœur de Dixinn avec vue sur l'océan et accès aux commodités."
  },
  {
    id: 3,
    title: "Maison familiale spacieuse",
    location: "Matam, Conakry",
    price: "1,500,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop",
    bedrooms: 5,
    bathrooms: 3,
    area: 220,
    rating: 4.7,
    isNew: true,
    isFeatured: false,
    description: "Parfaite pour une famille nombreuse, cette maison offre espace et confort dans un quartier calme."
  },
  {
    id: 4,
    title: "Studio meublé centre-ville",
    location: "Sandervalia, Conakry",
    price: "1,000,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500&h=300&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    rating: 4.5,
    isNew: false,
    isFeatured: true,
    description: "Studio entièrement meublé, idéal pour jeunes professionnels, proche des transports."
  },
  {
    id: 5,
    title: "Duplex avec terrasse",
    location: "Ratoma, Conakry",
    price: "2,200,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=300&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    rating: 4.9,
    isNew: true,
    isFeatured: true,
    description: "Duplex moderne avec grande terrasse, vue panoramique et accès direct à la plage."
  },
  {
    id: 6,
    title: "Maison traditionnelle rénovée",
    location: "Matoto, Conakry",
    price: "1,400,000",
    currency: "GNF",
    period: "/mois",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop",
    bedrooms: 4,
    bathrooms: 2,
    area: 160,
    rating: 4.4,
    isNew: false,
    isFeatured: false,
    description: "Charme d'antan avec modernité, cette maison rénovée allie tradition et confort contemporain."
  }
];

// Composant de carte de propriété
const PropertyCard: React.FC<{
  property: typeof featuredProperties[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ property, index, isActive, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        relative cursor-pointer group
        ${isActive ? 'z-20' : 'z-10'}
      `}
      onClick={onClick}
    >
      <div className={`
        relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500
        ${isActive 
          ? 'shadow-2xl ring-2 ring-indigo-500/50 scale-105' 
          : 'shadow-lg hover:shadow-xl'
        }
      `}>
        {/* Image de la propriété */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.isNew && (
              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Nouveau
              </span>
            )}
            {property.isFeatured && (
              <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
                À la une
              </span>
            )}
          </div>

          {/* Bouton favori */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 p-2 bg-slate-800/40 backdrop-blur-sm rounded-full hover:bg-slate-700/50 transition-colors border border-slate-600/30"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'text-red-400 fill-red-400' : 'text-slate-300'
              }`} 
            />
          </motion.button>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-slate-800/40 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">{property.rating}</span>
          </div>
        </div>

        {/* Contenu de la carte */}
        <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-t border-slate-700/50">
          {/* Prix */}
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{property.price}</span>
              <span className="text-sm text-slate-400">{property.currency}</span>
              <span className="text-sm text-slate-500">{property.period}</span>
            </div>
          </div>

          {/* Titre */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {property.title}
          </h3>

          {/* Localisation */}
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.area}m²</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Bouton voir plus */}
          <motion.button
            whileHover={{ x: 5 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>Voir les détails</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedPropertiesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Auto-play avec pause sur hover
  useEffect(() => {
    if (!isAutoPlaying || isHoveringCard) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHoveringCard]);

  const nextProperty = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
  };

  const prevProperty = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background sophistiqué */}
      <div className="absolute inset-0">
        {/* Dégradé de base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Courbes élégantes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <linearGradient id="featured-curve-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <filter id="featured-glow-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Courbes animées */}
          <motion.path
            d="M 0 30 Q 25 20, 50 30 T 100 30"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 0.7, 1],
              strokeWidth: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.path
            d="M 0 70 Q 25 60, 50 70 T 100 70"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 0.7, 1],
              strokeWidth: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4, 
              delay: 1.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Courbes supplémentaires pour plus de dynamisme */}
          <motion.path
            d="M 0 15 Q 30 25, 60 15 T 100 15"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.3"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.6, 0.3, 0.6],
              strokeWidth: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 5, 
              delay: 0.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.path
            d="M 0 85 Q 30 75, 60 85 T 100 85"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.3"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.6, 0.3, 0.6],
              strokeWidth: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 5, 
              delay: 2, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Courbes verticales pour plus de complexité */}
          <motion.path
            d="M 20 0 Q 20 25, 20 50 T 20 100"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.2"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.4, 0.2, 0.4],
              strokeWidth: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6, 
              delay: 1, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.path
            d="M 80 0 Q 80 25, 80 50 T 80 100"
            stroke="url(#featured-curve-glow)"
            strokeWidth="0.2"
            fill="none"
            filter="url(#featured-glow-effect)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.4, 0.2, 0.4],
              strokeWidth: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6, 
              delay: 3, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header avec bouton en coin supérieur droit */}
        <div className="relative mb-12">
          {/* Bouton CTA en coin supérieur droit */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 z-20"
          >
            <Link to="/properties">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-400/30"
              >
                <span className="text-sm">Découvrir tous les logements</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Contenu principal centré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse" />
              À la une
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Propriétés <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">disponibles</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Découvrez notre sélection de propriétés exceptionnelles, 
              soigneusement choisies pour leur qualité et leur emplacement privilégié.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevProperty}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-slate-700/90 hover:shadow-xl transition-all duration-300 border border-slate-600/50 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-slate-300" />
          </button>

          <button
            onClick={nextProperty}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-slate-700/90 hover:shadow-xl transition-all duration-300 border border-slate-600/50 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-slate-300" />
          </button>

          {/* Carousel container - 3 cartes visibles */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex items-center justify-center h-full gap-8">
              {/* Carte précédente */}
              <motion.div
                key={`prev-${currentIndex}`}
                initial={{ opacity: 0, x: -80, scale: 0.8, rotateY: -15 }}
                animate={{ 
                  opacity: 0.7, 
                  x: 0, 
                  scale: 0.85, 
                  rotateY: 0,
                  filter: "blur(1px)"
                }}
                exit={{ opacity: 0, x: -80, scale: 0.8, rotateY: -15 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex-shrink-0"
              >
                <PropertyCard
                  property={featuredProperties[(currentIndex - 1 + featuredProperties.length) % featuredProperties.length]}
                  index={currentIndex - 1}
                  isActive={false}
                  onClick={() => setCurrentIndex((currentIndex - 1 + featuredProperties.length) % featuredProperties.length)}
                />
              </motion.div>

              {/* Carte centrale (active) */}
              <motion.div
                key={`active-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  filter: "blur(0px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                className="flex-shrink-0 z-20"
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => setIsHoveringCard(false)}
              >
                <PropertyCard
                  property={featuredProperties[currentIndex]}
                  index={currentIndex}
                  isActive={true}
                  onClick={() => {}}
                />
              </motion.div>

              {/* Carte suivante */}
              <motion.div
                key={`next-${currentIndex}`}
                initial={{ opacity: 0, x: 80, scale: 0.8, rotateY: 15 }}
                animate={{ 
                  opacity: 0.7, 
                  x: 0, 
                  scale: 0.85, 
                  rotateY: 0,
                  filter: "blur(1px)"
                }}
                exit={{ opacity: 0, x: 80, scale: 0.8, rotateY: 15 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex-shrink-0"
              >
                <PropertyCard
                  property={featuredProperties[(currentIndex + 1) % featuredProperties.length]}
                  index={currentIndex + 1}
                  isActive={false}
                  onClick={() => setCurrentIndex((currentIndex + 1) % featuredProperties.length)}
                />
              </motion.div>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-400 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
