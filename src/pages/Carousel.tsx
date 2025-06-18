import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
  }>;
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  
  const TRANSITION_DURATION = 1000; // Match this with CSS duration

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning, images.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning, images.length]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning, currentIndex]);

  // Handle autoplay with pause functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, isPaused, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current || carouselRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch events for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Swipe threshold (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    touchStartX.current = null;
  };

  return (
    <div 
      ref={carouselRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={String(index !== currentIndex)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center h-full" 
              style={{ backgroundImage: `url(${image.src})` }}
              role="img"
              aria-label={image.alt}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/60 to-transparent"></div>
            </div>
            
            {(image.title || image.subtitle) && (
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                {image.title && (
                  <h2 className="text-4xl md:text-6xl font-bold font-playfair text-white mb-4 tracking-wider animate-fade-in">
                    {image.title}
                  </h2>
                )}
                {image.subtitle && (
                  <p className="text-xl md:text-2xl text-gold-light animate-slide-up">
                    {image.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-300"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-300"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </>
      )}

      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gold w-6' : 'bg-white/50 hover:bg-white'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;