interface AboutProps {
  onNavigate?: (page: string) => void; // Made optional
}

const About = ({}: AboutProps) => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/photos/comptoir3.jpeg')" }}>
        <div className="absolute inset-0 bg-chocolate/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4">Notre Histoire</h1>
          <div className="w-24 h-px bg-gold mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            L'art de la pâtisserie depuis 1987
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Notre Passion</h2>
              <h3 className="text-3xl md:text-4xl font-playfair text-chocolate mb-8 font-light">
                Une Tradition Familiale
              </h3>
              <div className="w-24 h-px bg-gold mb-8"></div>
              
              <div className="space-y-4 text-chocolate/80">
                <p>
                  Depuis notre création en 1987, Pain Pâtisserie perpétue l'art de la pâtisserie artisanale et du pain frais à Evere. 
                  Notre établissement familial s'est construit autour d'une passion pour les saveurs authentiques et les techniques traditionnelles.
                </p>
                <p>
                  Au fil des années, nous avons perfectionné nos recettes, en combinant savoir-faire ancestral et touches contemporaines pour 
                  offrir à nos clients des créations uniques qui éveillent les sens et racontent une histoire.
                </p>
                <p>
                  Chaque jour, nos artisans boulangers et pâtissiers se lèvent aux aurores pour préparer des produits frais, 
                  utilisant exclusivement des ingrédients de première qualité, soigneusement sélectionnés pour leur goût et leur provenance.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="/photos/entre.jpeg" alt="Notre boutique" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img src="/photos/comptoir2.jpeg" alt="Nos produits" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src="/photos/mix2.jpeg" alt="Préparation" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img src="/photos/grandgat4.jpeg" alt="Pâtisseries" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Nos Valeurs</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
              L'Excellence au Quotidien
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-chocolate/80 leading-relaxed">
              Notre philosophie repose sur des valeurs fortes qui guident chacune de nos créations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cream rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-chocolate mb-4 text-center">Qualité</h4>
              <p className="text-chocolate/80 text-center">
                Nous sélectionnons rigoureusement nos ingrédients pour vous garantir des produits d'exception. 
                Aucun compromis n'est fait sur la qualité.
              </p>
            </div>
            
            <div className="bg-chocolate text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-gold mb-4 text-center">Créativité</h4>
              <p className="text-white/80 text-center">
                Notre équipe de pâtissiers est constamment à la recherche de nouvelles idées et saveurs pour surprendre et émerveiller vos papilles.
              </p>
            </div>
            
            <div className="bg-cream rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h4 className="text-xl font-playfair text-chocolate mb-4 text-center">Tradition</h4>
              <p className="text-chocolate/80 text-center">
                Nous respectons les méthodes artisanales et les recettes traditionnelles qui ont fait leurs preuves à travers les générations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialties */}
      <section className="py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('/photos/grandgat7.jpeg')" }}>
        <div className="absolute inset-0 bg-chocolate/70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Notre Savoir-Faire</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-white mb-8 font-light">
              Spécialités Signatures
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Trompe-l'œil Pâtissiers</h4>
              <p className="text-white/90 mb-4">
                Nos créations trompe-l'œil aux fruits frais et secs sont de véritables œuvres d'art gourmandes qui émerveillent autant les yeux que les papilles.
              </p>
              <a href="/trompe-l-oeil" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Gâteaux au Chocolat</h4>
              <p className="text-white/90 mb-4">
                Délicieux et fondants, nos gâteaux au chocolat sont élaborés avec les meilleures fèves, pour une expérience gustative incomparable.
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Tartes aux Fruits</h4>
              <p className="text-white/90 mb-4">
                Nos incontournables tartes aux fraises et framboises de saison sont préparées avec des fruits frais et une pâte croustillante.
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Créations à la Vanille</h4>
              <p className="text-white/90 mb-4">
                Savourez l'onctuosité de nos créations à la vanille de Madagascar, récoltée à maturité pour un arôme intense et subtil.
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Entremets Exotiques</h4>
              <p className="text-white/90 mb-4">
                Ne manquez pas nos entremets exotiques aux fruits de la passion, une explosion de saveurs tropicales pour un voyage gustatif.
              </p>
              <a href="/patisseries" className="text-gold hover:text-white transition-colors inline-flex items-center">
                <span>Découvrir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-xl font-playfair text-gold mb-4">Gâteau 3 Chocolats</h4>
              <p className="text-white/90 mb-4">
                Notre gâteau 3 chocolats signature est un incontournable qui séduit par l'harmonie parfaite entre le chocolat noir, au lait et blanc.
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
      </section>

      {/* Team or Testimonial */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Ils Nous Font Confiance</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
              La Satisfaction de Nos Clients
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-chocolate/80 mb-6 text-center italic">
                "Les meilleurs gâteaux d'Evere ! Je commande tous mes gâteaux d'anniversaire chez Pain Pâtisserie depuis des années. 
                Leur service est impeccable et leurs créations toujours délicieuses."
              </p>
              <div className="text-center">
                <p className="font-playfair text-chocolate">Marie Dupont</p>
                <p className="text-chocolate/60 text-sm">Cliente fidèle</p>
              </div>
            </div>
            
            <div className="bg-chocolate text-white p-8 rounded-xl shadow-lg md:-mt-4">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-white/80 mb-6 text-center italic">
                "J'ai commandé un gâteau trompe-l'œil pour l'anniversaire de ma fille, et tout le monde a été bluffé ! 
                Un travail d'artiste et un goût exceptionnel. Pain Pâtisserie est vraiment au-dessus du lot."
              </p>
              <div className="text-center">
                <p className="font-playfair text-gold">Jean Lefèvre</p>
                <p className="text-white/60 text-sm">Client satisfait</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-chocolate/80 mb-6 text-center italic">
                "Leur pain au levain est le meilleur de Bruxelles ! Je fais un détour chaque matin pour m'en procurer. 
                La qualité est constante et le service toujours chaleureux."
              </p>
              <div className="text-center">
                <p className="font-playfair text-chocolate">Sophie Martens</p>
                <p className="text-chocolate/60 text-sm">Cliente quotidienne</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
