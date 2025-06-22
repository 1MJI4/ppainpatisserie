import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Seo } from '../components/Seo';
import './Home.css';
import { ArrowRight, MapPin, Navigation, CheckCircle2 } from 'lucide-react'; // Ajout de CheckCircle2

const specialties = [
  {
    imgSrc: "/photos/trompeoeil.jpeg",
    alt: "Gâteau en trompe-l'œil en forme de fruit par Pain Pâtisserie.",
    title: "Gâteaux Trompe-l'œil",
    description: "Des créations artistiques qui surprennent les yeux et ravissent les papilles."
  },
  {
    imgSrc: "/photos/grandgat3.jpeg",
    alt: "Gâteau signature aux trois chocolats de Pain Pâtisserie.",
    title: "Gâteaux Signature",
    description: "Des recettes uniques, perfectionnées pour un goût inoubliable."
  },
  {
    imgSrc: "/photos/tartefraise.jpeg",
    alt: "Tarte aux fraises fraîches de saison de Pain Pâtisserie.",
    title: "Tartes de Saison",
    description: "La fraîcheur des fruits de saison sur une pâte sablée croustillante."
  }
];

interface HomeProps {
  onNavigate?: (page: string) => void;
}

function Home({ onNavigate }: HomeProps) {
  return (
    <main id="home">
      {/* SEO: Mise à jour du titre et de la description */}
      <Seo
        title="Gâteaux Trompe l'œil & sur mesure | Pain Pâtisserie, Evere"
        description="Spécialiste du gâteau trompe l'œil à Evere, Bruxelles. Pain Pâtisserie crée des pâtisseries uniques et des gâteaux sur mesure pour vos événements."
        canonicalUrl="https://www.votredomaine.be"
        imageUrl="https://www.votredomaine.be/photos/comptoir2.jpeg"
      />

      <section className="hero-section">
        <div className="hero-background">
          <LazyLoadImage
            src="/photos/comptoir2.jpeg"
            alt="Vitrine de la boulangerie-pâtisserie Pain Pâtisserie à Evere, remplie de créations fraîches."
            effect="blur"
            wrapperClassName="hero-image-wrapper"
            className="hero-image"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          {/* Animation directe sans variants */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            Boulangerie Pâtisserie Artisanale à Evere
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          >
            La nouvelle signature gourmande de votre quartier.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          >
            {/* 2. Appeler directement la prop "onNavigate" ici */}
            <button onClick={() => onNavigate && onNavigate('gallery')} className="cta-button">
              <span>Voir nos créations</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="content-section bg-cream">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2>Passion, fraîcheur et créativité</h2>
            <p className="lead">
              Bienvenue chez Pain Pâtisserie. Nous sélectionnons des ingrédients de première qualité pour créer des pains, viennoiseries et pâtisseries qui éveillent les sens chaque jour.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-container">
          <h2 className="section-title">Nos Incontournables</h2>
          <div className="specialties-grid">
            {specialties.map((item, index) => (
              <motion.div 
                className="specialty-card" 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="specialty-image-container">
                  <LazyLoadImage src={item.imgSrc} alt={item.alt} effect="blur" className="specialty-image" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- NOUVELLE SECTION ÉVÉNEMENTS (DESIGN ÉLABORÉ) --- */}
      <section className="content-section events-section-elaborate">
        <div className="content-container">
          <div className="events-layout">
            
            {/* Colonne Image */}
            <motion.div 
              className="events-image-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <LazyLoadImage
                src="/photos/gateauevent.jpeg" // IMPORTANT: Utilisez une belle image de gâteau d'événement
                alt="Gâteau de fête personnalisé créé par Pain Pâtisserie"
                className="events-image"
                effect="blur"
              />
            </motion.div>

            {/* Colonne Contenu */}
            <div className="events-content">
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Une Signature Gourmande Pour Vos Événements
              </motion.h2>
              {/* Mise à jour de la description pour inclure le mot-clé */}
              <motion.p 
                className="events-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Du spectaculaire gâteau trompe l'œil à la pièce montée raffinée, nous accompagnons vos moments les plus précieux avec des créations sur mesure.
              </motion.p>
              
              <ul className="events-feature-list">
                {/* Mise à jour du premier point de la liste */}
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <CheckCircle2 className="feature-icon" />
                  <span>Gâteaux trompe l'œil et pièces montées</span>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <CheckCircle2 className="feature-icon" />
                  <span>Assortiments salés (verrines, mini-sandwichs)</span>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <CheckCircle2 className="feature-icon" />
                  <span>Pauses gourmandes pour entreprises</span>
                </motion.li>
              </ul>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }}>
                <button onClick={() => onNavigate && onNavigate('contact')} className="events-cta-button">
                  Demander un devis
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <section className="content-section bg-cream">
        <div className="content-container location-grid">
          <div className="location-info">
            <h2 className="section-title">Rendez-nous visite</h2>
            <p className="location-address">
              <strong>Pain Pâtisserie</strong><br />
              Chaussée de Louvain 906<br />
              1140 Evere, Bruxelles
            </p>
            <p className="location-hours">
              <strong>Horaires :</strong><br />
              Lundi, Mer-Dim : 06h00 - 20h00<br />
              Mardi : Fermé
            </p>
            <div className="location-buttons">
              <a 
                href="https://waze.com/ul?ll=50.8587009,4.4132547&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="map-button waze-button"
              >
                <Navigation className="button-icon" />
                Itinéraire avec Waze
              </a>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Chaussée+de+Louvain+906,+1140+Evere"
                target="_blank"
                rel="noopener noreferrer"
                className="map-button gmaps-button"
              >
                <MapPin className="button-icon" />
                Itinéraire avec Google Maps
              </a>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.780013592531!2d4.406121376550135!3d50.86781697167618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3e7a0a99999%3A0x3a3c3b3c3b3c3b3c!2sChauss%C3%A9e%20de%20Louvain%20906%2C%201140%20Evere%2C%20Belgium!5e0!3m2!1sen!2sus!4v1687470000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de l'emplacement de Pain Pâtisserie à Evere"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;