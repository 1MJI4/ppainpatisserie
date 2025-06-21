import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Pain Pâtisserie</h1>
        </div>
        
        <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/patisseries">Pâtisseries</a></li>
            <li><a href="/viennoiseries">Viennoiseries</a></li>
            <li><a href="/about">Notre histoire</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        
        <div className="cart-icon">
          <ShoppingBag size={24} />
          <span className="cart-count">0</span>
        </div>
      </div>
    </header>
  );
}

export default Header;