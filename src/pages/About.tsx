interface AboutProps {
  onNavigate?: (page: string) => void;
}

const About = ({ onNavigate: _onNavigate }: AboutProps) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center about-hero-bg">
        <div className="absolute inset-0 bg-chocolate/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4">
            Pain Pâtisserie – L’adresse gourmande du quartier Paduwa, Bruxelles
          </h1>
          <div className="w-24 h-px bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Artisanat, humour et gourmandise à Evere depuis 2022 (oui, on est jeunes, mais on a déjà des rides de croissants !)
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Notre Passion</h2>
              <h3 className="text-3xl md:text-4xl font-playfair text-chocolate mb-8 font-light">
                Une aventure sucrée-salée née en 2022 à Bruxelles
              </h3>
              <div className="w-24 h-px bg-gold mb-8"></div>
              
              <div className="space-y-4 text-chocolate/80">
                <p>
                  Oubliez 1987, ici tout a commencé en 2022, dans le quartier Paduwa à Evere, Bruxelles, à deux pas de la sortie d’autoroute Evere-Woluwe (A3), entre la place Meiser et la place de la Paix. 
                  Notre mission ? Réveiller vos papilles, même le lundi matin, avec des créations artisanales qui font sourire et saliver.
                </p>
                <p>
                  Chez Pain Pâtisserie, on ne fait pas que du pain : on façonne des trompe-l’œil bluffants, des cheesecakes qui font voyager, des mini-pâtisseries pour les grandes faims, et des viennoiseries qui rendent jaloux les croissants parisiens (mention spéciale au croissant amandes et à l’éclair pistache).
                </p>
                <p>
                  Envie d’un brunch oriental à Bruxelles ? Commandez nos msemen, baghrir ou harcha, tout juste sortis du four. Plutôt sucré ou salé ? Notre service traiteur régale vos événements avec des tartes, tartelettes, mini-pâtisseries, et bien plus encore. Ici, la gourmandise n’a pas de frontières !
                </p>
                <p>
                  <strong>Petit-déjeuner à emporter :</strong> 
                  <br />
                  Testez nos msemen fourrés au chocolat, accompagnés d’un café ou d’un thé (à la menthe bientôt, promis, on s’entraîne !). Baghrir au fromage frais, croissants, et mini-viennoiseries : le client est roi, même au saut du lit.
                </p>
                <p>
                  <strong>Accès facile :</strong> 
                  <br />
                  En voiture : Sortie Evere-Woluwe (A3), parking facile, GPS heureux.
                  <br />
                  En transports : Arrêts Mommaert et Paduwa à quelques minutes à pied, desservis par les bus 21, 66, 80, R90, 819 et R81. Même votre chauffeur de bus connaît notre adresse !
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="/photos/entre.jpeg" alt="Devanture de Pain Pâtisserie à Evere, quartier Paduwa, Bruxelles" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img src="/photos/comptoir2.jpeg" alt="Comptoir gourmand de Pain Pâtisserie à Bruxelles" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="/photos/mix2.jpeg" alt="Préparation artisanale de pâtisseries à Bruxelles" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img src="/photos/grandgat4.jpeg" alt="Gâteau trompe-l’œil et spécialités maison à Bruxelles" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Nos Valeurs</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
              L’excellence, la créativité… et un brin de folie
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-chocolate/80 leading-relaxed">
              Chez Pain Pâtisserie, on croit que la gourmandise est un art de vivre. Ici, chaque création est pensée pour surprendre, régaler et donner le sourire, du croissant du matin à la pièce montée du dimanche.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cream rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                {/* Qualité */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-chocolate mb-4 text-center">Qualité</h4>
              <p className="text-chocolate/80 text-center">
                Ingrédients triés sur le volet, recettes testées (et retestées) : ici, pas de compromis, sauf sur les calories.
              </p>
            </div>
            
            <div className="bg-chocolate text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                {/* Créativité */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-gold mb-4 text-center">Créativité</h4>
              <p className="text-white/80 text-center">
                Trompe-l’œil, mini-pâtisseries, éclairs pistache ou cheescakes : on adore surprendre vos papilles et vos invités.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                {/* Tradition */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-chocolate mb-4 text-center">Tradition</h4>
              <p className="text-chocolate/80 text-center">
                On respecte les classiques : pain croustillant, viennoiseries dorées, et recettes familiales transmises… depuis au moins 2022 !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Specialties */}
      <div className="py-20 bg-cover bg-center relative about-specialties-bg">
        <div className="absolute inset-0 bg-chocolate/70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Notre Savoir-Faire</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-white mb-8 font-light">
              Spécialités signatures à croquer
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Trompe-l’œil Pâtissiers</h4>
              <p className="text-white/90 mb-4">
                Des fruits ? Non, des gâteaux ! Nos trompe-l’œil bluffent vos invités et régalent les gourmands.
              </p>
              <a href="/trompe-l-oeil" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Cheesecake & Mini-Pâtisseries</h4>
              <p className="text-white/90 mb-4">
                Cheesecake crémeux, tartelettes fruitées, mini-éclairs pistache : la gourmandise en format mini (ou maxi).
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Viennoiseries & Spécialités orientales</h4>
              <p className="text-white/90 mb-4">
                Croissants, croissants amandes, msemen, msemen fourré chocolat, baghrir au fromage frais, harcha… Ici, le petit-déjeuner à emporter à Bruxelles dure toute la journée. Café ou thé ? Pas encore à la menthe mais c'est prévu !
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Élément de transition vers la section Contact */}
      <div className="about-contact-transition w-full bg-gradient-to-b from-cream to-white h-32 -mb-1 relative z-20"></div>
    </div>
  );
};

export default About;
