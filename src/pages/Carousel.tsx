import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
    description?: string;
  }>;
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  height?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
  height = '70vh',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoplay, interval]);

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center h-full" style={{ backgroundImage: `url(${image.src})` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/60 to-transparent"></div>
            </div>
            
            {(image.title || image.subtitle || image.description) && (
              <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-4/5 md:w-3/4 lg:w-2/3">
                {image.title && (
                  <h2 className="text-4xl md:text-6xl font-bold font-playfair text-white mb-4 tracking-wider animate-fade-in drop-shadow-lg">
                    {image.title}
                  </h2>
                )}
                {image.subtitle && (
                  <p className="text-xl md:text-2xl text-gold-light font-serif mb-4 animate-slide-up">
                    {image.subtitle}
                  </p>
                )}
                {image.description && (
                  <p className="text-base md:text-lg text-white/90 mt-2 max-w-2xl mx-auto font-light animate-fade-in delay-300">
                    {image.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>      {showArrows && (
        <>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-gold/20 hover:bg-gold/40 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-gold/30"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-gold/20 hover:bg-gold/40 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-gold/30"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </>
      )}

      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 transition-all duration-300 ${
                index === currentIndex ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/70 w-3'
              } rounded-full`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;