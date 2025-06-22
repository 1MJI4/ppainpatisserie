import Header from './pages/Header';
import Gallery from './pages/Gallery';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Carousel from './pages/Carousel';
import About from './pages/About';
import Contact from './pages/Contact';
import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import PageLoader from './components/PageLoader';
import './styles.css';
import './animations.css';
import './fixes.css'; // Import des correctifs CSS

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animation de défilement fluide
  const scrollToSection = (sectionId: string) => {
    // Ajouter une classe de transition avant le défilement
    document.body.classList.add('page-transitioning');
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculer la position de défilement avec un petit offset pour le header
      const headerHeight = 80; // hauteur approximative du header
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Animation fluide de défilement
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
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
      threshold: 0.1 // Réduit le seuil pour qu'il se déclenche plus tôt
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activer l'animation de la section
          entry.target.classList.add('visible');
          entry.target.classList.add('section-visible');
          
          // Rendre la section explicitement visible
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
          
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
  }, [isPageLoaded]);  // Assurer des transitions fluides entre les sections
  useEffect(() => {
    // Fonction pour gérer le défilement et améliorer les transitions
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY;
      
      // Détecter la section visible
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
          const id = section.getAttribute('id');
          if (id) {
            // Ajouter des classes pour améliorer la transition
            document.getElementById('home')?.classList.add('home-scrolling');
            document.getElementById('about')?.classList.add('about-scrolling');
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation de chargement de la page
  useEffect(() => {
    // Réduire le temps de chargement pour éviter les problèmes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      document.body.classList.add('page-loaded');
      
      // Ajouter une classe pour les animations d'entrée
      document.body.classList.add('content-visible');
      
      // Rendre toutes les sections visibles explicitement
      document.querySelectorAll('.section-home, .section-about, .section-gallery, .section-contact').forEach(section => {
        (section as HTMLElement).style.opacity = '1';
        (section as HTMLElement).style.transform = 'translateY(0)';
        section.classList.add('visible');
        section.classList.add('section-visible');
      });
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
  }, [isPageLoaded]);  return (
    <div className="app w-full overflow-hidden">
      <PageLoader />
      <CustomCursor />
      <Header onNavigate={scrollToSection} currentPage={activeSection} />
      
      {/* Section Home */}
      <section id="home" className="section-home visible section-visible min-h-screen w-full flex flex-col justify-center overflow-hidden m-0 relative">
        <Home onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="gallery" onClick={scrollToSection} />
      </section>
      
      {/* Section Gallery - maintenant juste après Home */}
      <section id="gallery" className="section-gallery visible section-visible min-h-screen w-full flex flex-col justify-center overflow-hidden m-0 relative">
        <Gallery onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="carousel" onClick={scrollToSection} />
      </section>
      <section id="carousel" className="section-carousel visible section-visible min-h-screen w-full flex flex-col justify-center overflow-hidden m-0 relative">
        <Carousel onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="about" onClick={scrollToSection} />
      </section>
      {/* Section About - maintenant après Gallery */}
      <section id="about" className="section-about visible section-visible min-h-screen w-full flex flex-col justify-center overflow-hidden m-0 relative">
        <About onNavigate={scrollToSection} />
        <ScrollIndicator targetSection="contact" onClick={scrollToSection} />
      </section>
      
      {/* Section Contact */}
      <section id="contact" className="section-contact visible section-visible min-h-screen w-full flex flex-col justify-center overflow-hidden m-0 relative">
        <Contact />
      </section>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
