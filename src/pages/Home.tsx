function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Bienvenue chez P'Pain Pâtisserie</h1>
        <p>Une odeur de viennoiserie sort du four… entrez et régalez vos yeux 🍩</p>
        <img src="https://images.unsplash.com/photo-1546549039-7c8b93cead09" alt="vitrine de pâtisserie" />
      </section>
      <section className="counter">
  <h2>Notre Comptoir</h2>
  <div className="product-shelf">
    {/* Les cartes produits viendront ici */}
  </div>
</section>
    </main>
  );
}
export default Home;