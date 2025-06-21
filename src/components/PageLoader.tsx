import { useEffect, useState } from 'react';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour montrer l'animation
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.add('page-loaded');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-playfair text-3xl md:text-4xl text-chocolate mb-6 animate-pulse">
          Pain Pâtisserie
        </h1>
        
        <div className="loader">
          <div className="spinner"></div>
        </div>
        
        <p className="text-chocolate-light mt-4 text-sm">
          Chargement de l'expérience gourmande...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
