import { useEffect, useState, useRef } from 'react';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

function Home({ onNavigate }: HomeProps) {  const [activeImage, setActiveImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationRef = useRef<number | null>(null); // Correction du type pour le navigateur
  
  const carouselImages = [
    {
      src: "/photos/acceuil.jpeg",
      alt: "Vitrine de notre pâtisserie à Evere",
      title: "Pain Pâtisserie",
      subtitle: "Artisanal",
      description: "Boulangerie-pâtisserie artisanale à Evere, où nous perpétuons l'art du pain frais, des viennoiseries et des pâtisseries fines"
    },
    {
      src: "/photos/comptoir.jpeg",
      alt: "Comptoir de notre pâtisserie",
      title: "Pain Pâtisserie",
      subtitle: "Artisanal",
      description: "Découvrez nos créations gourmandes, élaborées avec passion et savoir-faire"
    },
    {
      src: "/photos/acceuil2.jpeg",
      alt: "Intérieur de notre pâtisserie",
      title: "Pain Pâtisserie",
      subtitle: "Artisanal",
      description: "Un lieu chaleureux où l'art de la pâtisserie prend vie chaque jour"
    },
    {
      src: "/photos/comptoir2.jpeg",
      alt: "Sélection de nos pâtisseries",
      title: "Pain Pâtisserie",
      subtitle: "Artisanal",
      description: "Des pâtisseries fines et gourmandes, préparées chaque jour avec des produits de qualité"
    }
  ];
  // Removed unused featuredProducts array
    const changeImage = (newIndex: number) => {
    if (isTransitioning) return;
    
    setActiveImage(newIndex);
    setIsTransitioning(true);
    
    // Réinitialiser l'état de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Animation de changement d'image toutes les 7 secondes
    animationRef.current = window.setInterval(() => {
      const nextImage = (activeImage + 1) % carouselImages.length;
      changeImage(nextImage);
    }, 7000);
    
    return () => {
      if (animationRef.current) {
        window.clearInterval(animationRef.current);
      }
    };
  }, [activeImage, carouselImages.length, isTransitioning]);
  
  const scrollToSection = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <main className="home overflow-hidden">
      {/* Hero Section avec Animation Zoom/Dézoom améliorée */}      <section className="hero min-h-screen h-[100vh] relative overflow-hidden w-full">
        {/* Conteneur de fond avec effet de parallaxe */}
        <div className="absolute inset-0 w-full h-full z-0">
          {carouselImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-out ${
                index === activeImage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: index === activeImage 
                  ? 'scale(1.08)' 
                  : 'scale(1)',
                transition: 'transform 10s ease-out, opacity 1.5s ease-out',
                animation: index === activeImage 
                  ? 'kenBurnsEffect 15s ease-out forwards' 
                  : 'none',
                width: '100%',
                height: '100%'
              }}
            ></div>
          ))}
            {/* Overlay renforcé pour une meilleure visibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-chocolate/80"></div>
          
          {/* Couche d'assombrissement supplémentaire pour le texte */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Contenu centré avec animation améliorée */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8">
          <div 
            className="text-center transform transition-all duration-1500 ease-out hero-content w-full max-w-4xl mx-auto py-10 px-6 rounded-xl backdrop-blur-sm bg-black/10"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              animation: 'fadeInUpDelayed 1.8s ease-out'
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-4 md:mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] tracking-wider font-semibold text-shadow-lg">
              Pain Pâtisserie
            </h1>
            <div className="w-24 h-px bg-gold mx-auto mb-6 md:mb-8 animate-expand"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-xl mx-auto mb-8 md:mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] font-normal tracking-wide text-shadow">
              L'art de la pâtisserie artisanale
            </p>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="relative overflow-hidden bg-gold/80 hover:bg-gold text-white py-2 sm:py-3 px-8 sm:px-10 rounded-full text-sm uppercase tracking-widest transition-all duration-700 transform hover:scale-105 hover:shadow-lg group"
            >
              <span className="relative z-10">Découvrir nos créations</span>
              <span className="absolute inset-0 bg-chocolate scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></span>
            </button>
          </div>
        </div>
        
        {/* Indicateurs de slide avec effet amélioré */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center space-x-3 sm:space-x-4 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => changeImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                index === activeImage 
                  ? 'bg-gold w-10 shadow-gold/50 shadow-lg' 
                  : 'bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Voir l'image ${index + 1}`}
            ></button>
          ))}
        </div>
          {/* Supprimé le séparateur SVG qui créait de l'espace blanc */}
      </section>
        
      {/* Transition vers Gallery */}
      <div className="home-gallery-transition"></div>
    </main>
  );
}

export default Home;