import Header from './pages/Header';
import Gallery from './pages/Gallery';
import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import PageLoader from './components/PageLoader';
import './styles.css';
import './animations.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animation de défilement fluide
  const scrollToSection = (sectionId: string) => {
    // Ajouter une classe de transition avant le défilement
    document.body.classList.add('page-transitioning');
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Animation fluide de défilement
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setActiveSection(sectionId);
      
      // Supprimer la classe de transition après le défilement
      setTimeout(() => {
        document.body.classList.remove('page-transitioning');
      }, 800); // Correspond à la durée de l'animation
    }
  };

  // Observer les sections pour détecter quand elles sont visibles
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activer l'animation de la section
          entry.target.classList.add('visible');
          entry.target.classList.add('section-visible');
          
          // Mettre à jour la section active
          const id = entry.target.id;
          setActiveSection(id);
          
          // Mettre à jour l'URL sans recharger la page
          window.history.pushState(null, '', `#${id}`);
        }
      });
    }, options);

    // Observer toutes les sections
    const sectionElements = document.querySelectorAll('section[id]');
    const sections = Array.from(sectionElements) as HTMLElement[];
    
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [isPageLoaded]);
  // Animation de chargement de la page
  useEffect(() => {
    // Réduire le temps de chargement pour éviter les problèmes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      document.body.classList.add('page-loaded');
      
      // Ajouter une classe pour les animations d'entrée
      document.body.classList.add('content-visible');
    }, 1000); // Réduit à 1 seconde au lieu de 2

    return () => clearTimeout(timer);
  }, []);

  // Détecter la section active au chargement de la page (pour les liens directs)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 1500); // Réduit à 1.5 secondes pour être plus réactif
    }
  }, [isPageLoaded]);
  return (
    <div className="app w-full overflow-hidden">
      <PageLoader />
      <CustomCursor />
      <Header onNavigate={scrollToSection} currentPage={activeSection} />
      
      {/* Section Home */}
      <section id="home" className="section-home min-h-screen w-full flex flex-col justify-center overflow-hidden m-0">
        <Home onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="about" onClick={scrollToSection} />
      </section>
      
      {/* Section About */}
      <section id="about" className="section-about min-h-screen w-full flex flex-col justify-center overflow-hidden m-0">
        <About onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="gallery" onClick={scrollToSection} />
      </section>
      
      {/* Section Gallery */}
      <section id="gallery" className="section-gallery min-h-screen w-full flex flex-col justify-center overflow-hidden m-0">
        <Gallery onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="contact" onClick={scrollToSection} />
      </section>
      
      {/* Section Contact */}
      <section id="contact" className="section-contact min-h-screen w-full flex flex-col justify-center overflow-hidden m-0">
        <Contact />
      </section>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
