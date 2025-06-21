import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>P'Pain Pâtisserie</h3>
          <p>Artisan pâtissier depuis 2010</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Horaires</h3>
          <p>Lun - Ven: 7h - 19h</p>
          <p>Sam: 7h - 20h</p>
          <p>Dim: 8h - 13h</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p><Phone size={16} /> 01 23 45 67 89</p>
          <p><Mail size={16} /> contact@ppainpatisserie.fr</p>
          <p><MapPin size={16} /> 123 Rue des Gourmands, Paris</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} P'Pain Pâtisserie. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;