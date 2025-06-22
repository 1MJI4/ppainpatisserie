import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
}

export const Seo = ({ title, description, canonicalUrl, imageUrl }: SeoProps) => {
  // Données structurées pour le Local SEO (crucial pour une boulangerie)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Pain Pâtisserie",
    "image": imageUrl,
    "url": canonicalUrl,
    "telephone": "+32472250578",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chaussée de Louvain 906",
      "addressLocality": "Evere",
      "postalCode": "1140",
      "addressCountry": "BE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.867813,
      "longitude": 4.408696
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "06:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "00:00", "closes": "00:00" }
    ],
    "servesCuisine": "Pâtisserie, Trompe l'œil, Boulangerie", // Mot-clé ajouté ici
    "priceRange": "€€"
  };

  return (
    <Helmet>
      {/* Balises SEO standards */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Balises Open Graph pour le partage sur les réseaux sociaux (Facebook, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pain Pâtisserie" />

      {/* Balises Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Données structurées JSON-LD (très important pour Google) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};