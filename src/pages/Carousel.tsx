import React, { useState, useEffect } from 'react';
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
    <div className={`relative overflow-hidden ${className}`}>
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
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-300"
            onClick={goToNext}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </>
      )}

      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gold w-6' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;