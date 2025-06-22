import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

function Home({ onNavigate }: HomeProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const slideTimerRef = useRef<number | null>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    {
      id: 'slide1',
      image: '/photos/acceuil.jpeg',
      title: 'Saveurs Artisanales',
      subtitle: 'Des recettes authentiques préparées avec passion'
    },
    {
      id: 'slide2',
      image: '/photos/comptoir.jpeg',
      title: 'Créations Quotidiennes',
      subtitle: 'Une sélection raffinée pour tous les goûts'
    },
    {
      id: 'slide3',
      image: '/photos/acceuil2.jpeg',
      title: 'Expérience Gourmande',
      subtitle: 'Un moment de plaisir dans un cadre chaleureux'
    },
    {
      id: 'slide4',
      image: '/photos/comptoir2.jpeg',
      title: 'Excellence Pâtissière',
      subtitle: 'Savoir-faire et tradition dans chaque création'
    }
  ];

  // Contrôle automatique des slides
  useEffect(() => {
    if (!isHovering) {
      slideTimerRef.current = window.setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    
    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
    };
  }, [activeSlide, isHovering, slides.length]);

  const navigateToSlide = (index: number) => {
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current);
    }
    setActiveSlide(index);
  };

  const scrollToSection = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={slidesRef}
    >
      {/* Particules décoratives flottantes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold opacity-60"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          {slides.map((slide, index) => (
            index === activeSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                {/* Image de fond avec effet parallaxe */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1.0 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                >
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${slide.image})`,
                      filter: 'brightness(0.75)'
                    }}
                  />
                  {/* Superposition artistique subtile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
                </motion.div>

                {/* Contenu du slide - NOUVELLE APPROCHE ARTISTIQUE */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Encadrement artistique avec lignes qui se dessinent */}
                    <motion.div className="artistic-frame relative max-w-3xl mx-auto">
                      {/* Lignes décoratives animées */}
                      <motion.div 
                        className="absolute top-0 left-0 w-0 h-px bg-gold"
                        animate={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                      <motion.div 
                        className="absolute top-0 right-0 w-0 h-px bg-gold"
                        animate={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 w-0 h-px bg-gold"
                        animate={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 right-0 w-0 h-px bg-gold"
                        animate={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                      <motion.div 
                        className="absolute top-0 left-0 h-0 w-px bg-gold"
                        animate={{ height: "30%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <motion.div 
                        className="absolute top-0 right-0 h-0 w-px bg-gold"
                        animate={{ height: "30%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0 w-px bg-gold"
                        animate={{ height: "30%" }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 right-0 h-0 w-px bg-gold"
                        animate={{ height: "30%" }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />

                      {/* Contenu du texte avec effets spéciaux */}
                      <div className="text-center py-12 px-8 relative z-10">
                        {/* Symbole décoratif */}
                        <motion.div 
                          className="mb-6 relative"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                        >
                          <svg className="w-12 h-12 mx-auto text-gold drop-shadow-glow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L9.1 9.1 2 12l7.1 2.9L12 22l2.9-7.1L22 12l-7.1-2.9z"/>
                          </svg>
                        </motion.div>
                        
                        {/* Titre principal avec effet de masque */}
                        <div className="overflow-hidden mb-4">
                          <motion.h1 
                            className="text-5xl md:text-7xl font-playfair font-semibold tracking-tighter text-white relative"
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          >
                            <span className="text-gold relative inline-block">
                              <span className="relative z-10">Pain</span>
                              <motion.span 
                                className="absolute inset-0 bg-gold/20" 
                                initial={{ height: "100%", top: "100%" }}
                                animate={{ top: "0%" }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                              />
                            </span>
                            {" "}
                            <span className="relative inline-block">
                              <span className="relative z-10">Pâtisserie</span>
                              <motion.span 
                                className="absolute inset-0 bg-white/10" 
                                initial={{ height: "100%", top: "100%" }}
                                animate={{ top: "0%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                              />
                            </span>
                          </motion.h1>
                        </div>
                        
                        {/* Séparateur animé */}
                        <div className="relative h-[40px] flex items-center justify-center my-2">
                          <motion.div 
                            className="h-[1px] bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: 120 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                          />
                          <motion.div 
                            className="absolute w-3 h-3 bg-gold rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.3, type: 'spring' }}
                          />
                        </div>
                        
                        {/* Titre du slide avec effet de révélation par caractère */}
                        <div className="overflow-hidden mb-3">
                          <motion.h2 
                            className="text-2xl md:text-3xl font-playfair text-white/90 split-text-animation"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            data-text={slide.title}
                          >
                            {slide.title.split('').map((char, i) => (
                              <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + (i * 0.03), duration: 0.3 }}
                              >
                                {char === ' ' ? '\u00A0' : char}
                              </motion.span>
                            ))}
                          </motion.h2>
                        </div>
                        
                        {/* Sous-titre avec effet de fondu progressif */}
                        <motion.div 
                          className="overflow-hidden mb-10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 1.4, duration: 0.6 }}
                        >
                          <p className="text-lg text-white/80 max-w-xl mx-auto">
                            {slide.subtitle}
                          </p>
                        </motion.div>
                        
                        {/* Bouton d'action avec effet d'encre qui se répand */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                        >
                          <button 
                            onClick={() => scrollToSection('gallery')}
                            className="ink-effect-button group relative overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white border border-gold transition-all duration-300 hover:text-white focus:outline-none"
                          >
                            <span className="relative z-10 flex items-center justify-center tracking-wider uppercase">
                              Découvrir nos créations
                              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Indicateurs de slides - AMÉLIORÉS */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="flex justify-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSlide(index)}
              className="indicator-button focus:outline-none"
              aria-label={`Voir le slide ${index + 1}`}
            >
              <span className={`block h-[3px] rounded-full transition-all duration-500 ${
                activeSlide === index 
                  ? 'w-8 bg-gold opacity-100' 
                  : 'w-4 bg-white/40 opacity-70 hover:opacity-100 hover:bg-white/60'
              }`}></span>
            </button>
          ))}
        </div>
      </div>

      {/* Icône de défilement */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.button
          onClick={() => scrollToSection('gallery')}
          className="text-white/70 hover:text-gold transition-colors duration-300 focus:outline-none"
          aria-label="Défiler vers le bas"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Éléments décoratifs de bordure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent z-40"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent z-40"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent z-40"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent z-40"></div>
    </section>
  );
}

export default Home;