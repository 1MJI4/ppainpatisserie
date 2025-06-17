import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Carousel from './Carousel';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [spotlight1Position, setSpotlight1Position] = useState({ x: 25, y: 30 });
  const [spotlight2Position, setSpotlight2Position] = useState({ x: 75, y: 70 });

  // Carousel images
  const carouselImages = [
    { 
      src: "/entre.jpeg", 
      alt: "Devanture de la pâtisserie", 
    },
    { 
      src: "/comptoir.jpeg", 
      alt: "Comptoir de pâtisseries", 
    },
    { 
      src: "/fruit_rouge.jpeg", 
      alt: "Pâtisserie aux fruits rouges", 
    },
    { 
      src: "/gateau personalise.jpeg", 
      alt: "Gâteau personnalisé", 
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    // Animate spotlights slowly
    const spotlightInterval = setInterval(() => {
      setSpotlight1Position({
        x: 15 + Math.sin(Date.now() / 5000) * 15,
        y: 30 + Math.cos(Date.now() / 6000) * 20
      });
      
      setSpotlight2Position({
        x: 75 + Math.sin(Date.now() / 7000) * 15,
        y: 60 + Math.cos(Date.now() / 5000) * 20
      });
    }, 100);

    return () => clearInterval(spotlightInterval);
  }, []);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Carousel Background */}
      <Carousel 
        images={carouselImages}
        autoplay={true}
        interval={6000}
        showArrows={false}
        className="h-screen"
      />

      {/* Spotlight Effects */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle at ${spotlight1Position.x}% ${spotlight1Position.y}%, rgba(218, 165, 32, 0.4) 0%, transparent 25%),
            radial-gradient(circle at ${spotlight2Position.x}% ${spotlight2Position.y}%, rgba(244, 208, 63, 0.3) 0%, transparent 30%)
          `
        }}
      ></div>
      
      {/* Artistic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate/20 via-transparent to-chocolate/40 z-20 pointer-events-none"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className={`text-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="relative inline-block mb-10">
            <span className="absolute -inset-1 -skew-y-3 bg-gold-light/20 blur-sm rounded-lg transform rotate-3"></span>
            <h1 className="relative text-5xl md:text-7xl font-bold font-playfair leading-tight text-white">
              <span className="block transform -rotate-2 hover:rotate-0 transition-transform duration-300">Pain</span>
              <span className="block text-gold-light transform rotate-2 hover:rotate-0 transition-transform duration-300 mt-2">
                Pâtisserie
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-10 font-light leading-relaxed max-w-2xl mx-auto text-white/90 italic">
            <span className="relative">
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              L'art de créer des moments de délice
            </span>
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <button
              onClick={scrollToGallery}
              className="inline-flex items-center px-8 py-4 bg-gold hover:bg-gold-dark text-chocolate font-semibold rounded-full transition-all duration-500 transform hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(218,165,32,0.4)]"
            >
              <span>Découvrir nos Créations</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-full transition-all duration-500 transform hover:translate-y-[-5px]"
            >
              Nous Contacter
            </button>
          </div>
          
          {/* Animated Badge */}
          <div className={`absolute top-0 right-10 md:block hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-45'
          }`}>
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-gold text-chocolate font-playfair font-bold p-2 animate-pulse shadow-lg">
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-chocolate animate-spin-slow"></div>
              <span className="text-center">Fait<br/> Maison</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <ChevronDown 
          className="w-8 h-8 text-white animate-bounce cursor-pointer hover:text-gold-light transition-colors duration-300"
          onClick={scrollToGallery}
        />
      </div>
    </section>
  );
};

export default Hero;