import Carousel from './Carousel';

function Home() {
  const carouselImages = [
    {
      src: "/photos/comptoir2.jpeg",
      alt: "Vitrine de notre pâtisserie à Evere",
      title: "Pain Pâtisserie",
      subtitle: "Artisanal depuis 1987",
      description: "Boulangerie-pâtisserie artisanale à Evere, où nous perpétuons l'art du pain frais, des viennoiseries et des pâtisseries fines"
    },
    {
      src: "/photos/grandgat3.jpeg",
      alt: "Gâteaux artisanaux Pain Pâtisserie",
      title: "Gâteaux Signature",
      subtitle: "L'excellence à chaque bouchée",
      description: "Découvrez nos spécialités : gâteaux au chocolat fondants et notre fameux gâteau 3 chocolats signature"
    },
    {
      src: "/photos/trompeoeil.jpeg",
      alt: "Trompe-l'œil pâtissiers à Evere",
      title: "Trompe-l'œil",
      subtitle: "L'art de la pâtisserie",
      description: "Nos trompe-l'œil pâtissiers aux fruits frais et secs, véritables œuvres d'art gourmandes"
    },
    {
      src: "/photos/tartefraise.jpeg",
      alt: "Tartes aux fraises fraîches",
      title: "Tartes de Saison",
      subtitle: "Fraîcheur et saveur",
      description: "Savourez nos incontournables tartes aux fraises et framboises de saison, préparées avec des fruits frais"
    }
  ];
  const featuredProducts = [
    { name: "Trompe-l'œil aux Fruits", price: "6,50€", image: "/photos/trompeoeil4.jpeg" },
    { name: "Gâteau 3 Chocolats", price: "5,80€", image: "/photos/grandgat2.jpeg" },
    { name: "Tarte aux Fraises", price: "4,90€", image: "/photos/tartefraise2.jpeg" },
    { name: "Entremets Exotique", price: "5,50€", image: "/photos/mix.jpeg" },
  ];
  return (
    <main className="home">
      <section className="hero h-[80vh]">
        <Carousel images={carouselImages} height="80vh" />
      </section>

      <section className="about bg-[#faf7f2] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Bienvenue</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
              Depuis 1987 à Evere
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-10"></div>
            <p className="max-w-2xl mx-auto text-chocolate/80 leading-relaxed">
              Découvrez notre boulangerie-pâtisserie artisanale à Evere, où nous perpétuons l'art du pain frais, 
              des viennoiseries et des pâtisseries fines depuis 1987. Une expérience gustative authentique qui 
              ravira vos sens.
            </p>
          </div>
        </div>
      </section>

      <section className="specialties py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Nos Spécialités</h2>
            <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
              L'Excellence Pâtissière
            </h3>
            <div className="w-24 h-px bg-gold mx-auto mb-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div className="product-card group" key={index}>
                <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl mb-5 aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-playfair text-xl text-chocolate mb-2">{product.name}</h3>
                <p className="text-gold font-semibold mb-4">{product.price}</p>
                <button className="bg-chocolate text-white py-2 px-5 rounded-full text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-300">
                  Découvrir
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hours-contact bg-chocolate/10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="hours">
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Horaires d'ouverture</h2>
              <h3 className="text-2xl md:text-3xl font-playfair text-chocolate mb-8 font-light">
                Venez nous rendre visite
              </h3>
              <div className="w-24 h-px bg-gold mb-10"></div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Lundi</span>
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Mardi</span>
                  <span className="font-medium">Fermé</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Mercredi</span>
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Jeudi</span>
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Vendredi</span>
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Samedi</span>
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-chocolate/20">
                  <span className="font-playfair">Dimanche</span>
                  <span>06:00 - 20:00</span>
                </div>
              </div>
            </div>
            
            <div className="contact">
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Contact</h2>
              <h3 className="text-2xl md:text-3xl font-playfair text-chocolate mb-8 font-light">
                Nous contacter
              </h3>
              <div className="w-24 h-px bg-gold mb-10"></div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-playfair text-lg mb-2">Adresse</h4>
                  <p className="text-chocolate/80">
                    Chaussée de Louvain 906<br />
                    1140 Evere<br />
                    Belgique
                  </p>
                </div>
                
                <div>
                  <h4 className="font-playfair text-lg mb-2">Téléphone</h4>
                  <p className="text-chocolate/80">
                    <a href="tel:+32472250578" className="hover:text-gold transition-colors">0472 25 05 78</a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-playfair text-lg mb-2">Email</h4>
                  <p className="text-chocolate/80">
                    <a href="mailto:contact@painpatisserie.be" className="hover:text-gold transition-colors">
                      contact@painpatisserie.be
                    </a>
                  </p>
                </div>
                
                <button className="bg-chocolate text-white py-3 px-6 rounded-full text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-300 mt-6">
                  Commander en ligne
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;