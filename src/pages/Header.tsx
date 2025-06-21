import { Menu, ShoppingBag, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
    }`}>      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="logo cursor-pointer" onClick={() => onNavigate('home')}>
          <h1 className="font-playfair text-2xl md:text-3xl text-chocolate">
            Pain Pâtisserie
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 md:hidden">
          <a 
            href="tel:+32472250578" 
            className="flex items-center text-chocolate hover:text-gold transition-colors"
            aria-label="Appeler Pain Pâtisserie"
          >
            <Phone size={20} />
          </a>
          <button 
            className="text-chocolate hover:text-gold transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
          <nav className={`${isMenuOpen ? 'block fixed inset-0 bg-white/95 pt-20 px-6 z-40' : 'hidden'} md:block md:static md:bg-transparent md:pt-0 md:px-0`}>
          <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
            <li>              <a 
                href="#home" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onNavigate('home'); 
                  setIsMenuOpen(false); 
                }}
                className={`font-medium text-lg md:text-base ${currentPage === 'home' ? 'text-gold' : 'text-chocolate hover:text-gold'} transition-colors block border-b md:border-b-0 pb-2 md:pb-0`}
              >
                Accueil
              </a>
            </li>
            <li>              <a 
                href="#gallery" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onNavigate('gallery'); 
                  setIsMenuOpen(false); 
                }}
                className={`font-medium text-lg md:text-base ${currentPage === 'gallery' ? 'text-gold' : 'text-chocolate hover:text-gold'} transition-colors block border-b md:border-b-0 pb-2 md:pb-0`}
              >
                Nos Pâtisseries
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onNavigate('about'); 
                  setIsMenuOpen(false); 
                }}
                className={`font-medium text-lg md:text-base ${currentPage === 'about' ? 'text-gold' : 'text-chocolate hover:text-gold'} transition-colors block border-b md:border-b-0 pb-2 md:pb-0`}
              >
                À Propos
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onNavigate('contact'); 
                  setIsMenuOpen(false); 
                }}
                className={`font-medium text-lg md:text-base ${currentPage === 'contact' ? 'text-gold' : 'text-chocolate hover:text-gold'} transition-colors block border-b md:border-b-0 pb-2 md:pb-0`}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="tel:+32472250578" 
            className="flex items-center space-x-2 text-chocolate hover:text-gold transition-colors"
          >
            <Phone size={18} />
            <span className="font-medium">0472 25 05 78</span>
          </a>
            <a 
            href="#contact"
            onClick={(e) => { 
              e.preventDefault(); 
              onNavigate('contact'); 
            }}
            className="flex items-center bg-gold text-white py-2 px-5 rounded-full text-sm uppercase tracking-wider hover:bg-chocolate transition-colors duration-300"
          >
            <ShoppingBag size={18} className="mr-2" />
            Commander
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;