import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselPageProps {
  onNavigate?: (page: string) => void;
}

const CarouselPage: React.FC<CarouselPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample carousel images for the page
  const images = [
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

  const interval = 5000; // 5 seconds between slides
  const autoplay = true;
  const showIndicators = true;
  const showArrows = true;

  // Autoplay management
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, images.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, images.length]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, currentIndex]);

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchEnd = e.changedTouches[0].clientX;
    setIsDragging(false);
    setDragOffset(0);
    
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Function to create a dynamic style for the background image
  const getCarouselSlideStyle = (src: string) => {
    return {
      backgroundImage: `url(${src})`,
    } as React.CSSProperties;
  }

  const handleMouseEvents = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
  };
  
  const navigateToPage = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="w-full min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-chocolate text-center mb-8">
          Nos Moments en Images
        </h1>
        
        <p className="text-center text-chocolate/80 max-w-2xl mx-auto mb-12">
          Découvrez notre univers à travers cette sélection de photos qui illustrent notre passion pour la pâtisserie artisanale.
        </p>
          <div 
          ref={carouselRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl group carousel-container mx-auto max-w-full"
          {...handleMouseEvents}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress Bar */}
          {autoplay && (
            <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-black/20">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold/70 transition-all duration-300 ease-out"
                style={{ 
                  width: `${((currentIndex + 1) / images.length) * 100}%`,
                  animation: !isPaused ? `progress ${interval}ms linear` : 'none',
                  animationIterationCount: !isPaused ? '1' : 'none'
                }}
              />
            </div>
          )}

          {/* Main Carousel */}
          <div className="relative h-full">
            {images.map((image, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + images.length) % images.length;
              const isNext = index === (currentIndex + 1) % images.length;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                    isActive 
                      ? 'opacity-100 scale-100 z-20' 
                      : isPrev 
                        ? 'opacity-30 scale-95 -translate-x-full z-10' 
                        : isNext 
                          ? 'opacity-30 scale-95 translate-x-full z-10'
                          : 'opacity-0 scale-90 z-0'
                  }`}
                  style={{
                    transform: isDragging && isActive 
                      ? `translateX(${-dragOffset}px) scale(${1 - Math.abs(dragOffset) * 0.0005})` 
                      : undefined
                  }}
                >                  {/* Background Image with Parallax Effect */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out carousel-image-container"
                    style={{
                      ...getCarouselSlideStyle(image.src),
                      transform: isActive ? 'scale(1.05)' : 'scale(1.1)',
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-chocolate/60 via-transparent to-chocolate/40" />
                  </div>

                  {/* Content */}
                  {(image.title || image.subtitle || image.description) && (                    <div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-20 px-4 sm:px-6 z-10 carousel-text-container"
                    >
                      <div className="text-center max-w-lg space-y-4 carousel-text">
                        {image.title && (
                          <h2 
                            className={`text-2xl sm:text-4xl md:text-5xl font-bold font-playfair text-white leading-tight tracking-wide transition-all duration-1000 ${
                              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                              transitionDelay: isActive ? '200ms' : '0ms'
                            }}
                          >
                            {image.title}
                          </h2>
                        )}
                        
                        {image.subtitle && (
                          <p 
                            className={`text-lg sm:text-xl text-gold font-medium transition-all duration-1000 ${
                              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                              transitionDelay: isActive ? '400ms' : '0ms'
                            }}
                          >
                            {image.subtitle}
                          </p>
                        )}
                        
                        {image.description && (
                          <p 
                            className={`text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 ${
                              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                              transitionDelay: isActive ? '600ms' : '0ms'
                            }}
                          >
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows - Hidden on small screens */}
          {showArrows && (
            <>              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-gold/20 hover:bg-gold/40 active:bg-gold/50 rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-gold/30 hover:border-gold/60 sm:flex items-center justify-center group-hover:scale-110 carousel-arrow touch-manipulation"
                onClick={goToPrev}
                aria-label="Slide précédent"
              >
                <ChevronLeft className="text-white w-5 h-5 drop-shadow-lg" />
              </button>
              
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-gold/20 hover:bg-gold/40 active:bg-gold/50 rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-gold/30 hover:border-gold/60 sm:flex items-center justify-center group-hover:scale-110 carousel-arrow touch-manipulation"
                onClick={goToNext}
                aria-label="Slide suivant"
              >
                <ChevronRight className="text-white w-5 h-5 drop-shadow-lg" />
              </button>
            </>
          )}

          {/* Play/Pause Button */}
          {autoplay && (
            <button
              className="absolute top-4 right-4 z-30 bg-chocolate/20 hover:bg-chocolate/40 rounded-full p-2 transition-all duration-300 backdrop-blur-sm border border-gold/20"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Reprendre" : "Pause"}
            >
              {isPaused ? (
                <Play className="text-white w-4 h-4 ml-0.5" />
              ) : (
                <Pause className="text-white w-4 h-4" />
              )}
            </button>
          )}

          {/* Indicators */}
          {showIndicators && images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller au slide ${index + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    index === currentIndex 
                      ? 'bg-gold w-8 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60 w-2'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Swipe Hint for Mobile */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
            <div className="flex items-center space-x-1 text-white/60 text-xs">
              <div className="w-8 h-0.5 bg-white/40 rounded-full animate-pulse" />
              <span>Glissez pour naviguer</span>
              <div className="w-8 h-0.5 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <h3 className="text-2xl font-playfair text-chocolate mb-6">Découvrez plus</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigateToPage('gallery')}
              className="px-6 py-3 bg-gold/90 hover:bg-gold text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Notre Galerie
            </button>
            
            <button 
              onClick={() => navigateToPage('about')}
              className="px-6 py-3 bg-chocolate/90 hover:bg-chocolate text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Notre Histoire
            </button>
            
            <button 
              onClick={() => navigateToPage('contact')}
              className="px-6 py-3 bg-chocolate/70 hover:bg-chocolate/90 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Nous Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;