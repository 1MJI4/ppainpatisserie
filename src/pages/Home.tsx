import Carousel from './Carousel';

function Home() {
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1546549039-7c8b93cead09",
      alt: "Vitrine de pâtisserie",
      title: "Nos créations",
      description: "Des pâtisseries artisanales préparées avec passion"
    },
    {
      src: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94",
      alt: "Viennoiseries fraîches",
      title: "Viennoiseries",
      description: "Fraîchement sorties du four chaque matin"
    },
    {
      src: "https://images.unsplash.com/photo-1609197532395-5745d6249e8a",
      alt: "Gâteau d'anniversaire",
      title: "Gâteaux sur mesure",
      description: "Pour vos occasions spéciales"
    }
  ];

  const featuredProducts = [
    { name: "Croissant", price: "2,20€", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
    { name: "Pain au Chocolat", price: "2,50€", image: "https://images.unsplash.com/photo-1623334044303-241d3a5fcd72" },
    { name: "Tarte aux Fraises", price: "4,80€", image: "https://images.unsplash.com/photo-1488477304112-4944851de03d" },
    { name: "Éclair Chocolat", price: "3,50€", image: "https://images.unsplash.com/photo-1604404806820-254e4a7055ef" },
  ];

  return (
    <main className="home">
      <section className="hero">
        <h1>Bienvenue chez P'Pain Pâtisserie</h1>
        <p>Une odeur de viennoiserie sort du four… entrez et régalez vos yeux 🍩</p>
        <Carousel images={carouselImages} />
      </section>

      <section className="featured">
        <h2>Nos spécialités</h2>
        <p>Découvrez nos créations les plus appréciées</p>
        <div className="product-shelf">
          {featuredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="add-to-cart">Ajouter au panier</button>
            </div>
          ))}
        </div>
      </section>

      <section className="counter">
        <h2>Notre Comptoir</h2>
        <div className="product-shelf">
          {/* Future product cards */}
        </div>
      </section>
    </main>
  );
}

export default Home;