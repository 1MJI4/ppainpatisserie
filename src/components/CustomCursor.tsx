import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsExpanded(true);
    };

    const handleMouseUp = () => {
      setIsExpanded(false);
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Détecter les interactions avec les éléments interactifs
  useEffect(() => {
    const handleInteractiveElementsHover = () => {
      const interactiveElements = document.querySelectorAll('a, button, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsExpanded(true));
        element.addEventListener('mouseleave', () => setIsExpanded(false));
      });

      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', () => setIsExpanded(true));
          element.removeEventListener('mouseleave', () => setIsExpanded(false));
        });
      };
    };

    const cleanup = handleInteractiveElementsHover();
    return cleanup;
  }, []);

  return (
    <div 
      className={`custom-cursor ${isExpanded ? 'expand' : ''}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default CustomCursor;
