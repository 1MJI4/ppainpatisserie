import { Facebook, Instagram, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-chocolate text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="footer-section fade-in-element footer-delay-1">
            <h3 className="font-playfair text-2xl mb-6 text-gold">Pain Pâtisserie</h3>
            <p className="mb-6 text-white/80 max-w-xs">
              Boulangerie-pâtisserie artisanale à Evere, où nous perpétuons l'art du pain frais,
              des viennoiseries et des pâtisseries fines depuis 1987.
            </p>
            <div className="social-links flex space-x-4 mt-6">
              <a 
                href="https://facebook.com" 
                className="bg-gold/20 hover:bg-gold/40 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                className="bg-gold/20 hover:bg-gold/40 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-section fade-in-element footer-delay-2">
            <h3 className="font-playfair text-2xl mb-6 text-gold">Navigation</h3>            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                  className="inline-flex items-center text-white/80 hover:text-gold transition-colors duration-300"
                >
                  <ChevronRight size={16} className="mr-2" /> Accueil
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} 
                  className="inline-flex items-center text-white/80 hover:text-gold transition-colors duration-300"
                >
                  <ChevronRight size={16} className="mr-2" /> Nos Pâtisseries
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); onNavigate('about'); }} 
                  className="inline-flex items-center text-white/80 hover:text-gold transition-colors duration-300"
                >
                  <ChevronRight size={16} className="mr-2" /> À Propos
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} 
                  className="inline-flex items-center text-white/80 hover:text-gold transition-colors duration-300"
                >
                  <ChevronRight size={16} className="mr-2" /> Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section fade-in-element footer-delay-3">
            <h3 className="font-playfair text-2xl mb-6 text-gold">Horaires d'ouverture</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-white/80">
                <span>Lundi</span>
                <span>06:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Mardi</span>
                <span className="font-medium">Fermé</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Mercredi</span>
                <span>06:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Jeudi</span>
                <span>06:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Vendredi</span>
                <span>06:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Samedi</span>
                <span>06:00 - 20:00</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Dimanche</span>
                <span>06:00 - 20:00</span>
              </li>
            </ul>
          </div>
          
          <div className="footer-section fade-in-element footer-delay-4">
            <h3 className="font-playfair text-2xl mb-6 text-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-gold" />
                <span className="text-white/80">
                  Chaussée de Louvain 906<br />
                  1140 Evere<br />
                  Belgique
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gold" />
                <a href="tel:+32472250578" className="text-white/80 hover:text-gold transition-colors duration-300">
                  0472 25 05 78
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gold" />
                <a href="mailto:contact@painpatisserie.be" className="text-white/80 hover:text-gold transition-colors duration-300">
                  contact@painpatisserie.be
                </a>
              </li>
            </ul>
          </div>
        </div>
          <div className="border-t border-white/10 pt-8 mt-8 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Pain Pâtisserie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;