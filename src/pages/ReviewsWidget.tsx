import React, { useRef, useEffect } from 'react';

// Déclaration pour TypeScript
declare global {
  interface Window {
    iFrameResize: any;
  }
}

const ReviewsWidget: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Charger le script iframe-resizer
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js';
    script.async = true;
    
    script.onload = () => {
      // Appliquer iFrameResize une fois que le script est chargé
      if (iframeRef.current && window.iFrameResize) {
        window.iFrameResize({}, iframeRef.current);
      }
    };
    
    document.body.appendChild(script);
    
    // Nettoyer le script lors du démontage du composant
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="reviews-widget-container">
      <iframe 
        ref={iframeRef}
        src="https://bff2cdc683ca4309a438d969d07781ce.elf.site"
        style={{ 
          border: 'none', 
          width: '100%', 
          minHeight: '400px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        title="Avis clients Pain Patisserie"
        loading="lazy"
      />
    </div>
  );
};

export default ReviewsWidget;
