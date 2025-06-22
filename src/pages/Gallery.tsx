import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css'; // Nous utiliserons un CSS dédié pour les cartes


// --- Interfaces et Données ---

interface GalleryProps {
  // La prop onNavigate a été supprimée car elle n'était pas utilisée.
}

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  featured: boolean;
  altText?: string;
  tags?: string[];
}

interface Category {
  id: string;
  label: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: 'Nous mangeons d\'abord avec les yeux',
        description: 'Ce n\'est pas qu\'une simple vitrine, c\'est une exposition d\'œuvres d\'art éphémères qui évoque tous vos sens avant même la première bouchée.',
        longDescription: 'Notre vitrine est conçue comme une galerie d\'art où chaque pâtisserie raconte sa propre histoire. L\'élégance visuelle de nos créations est le reflet de notre engagement envers l\'excellence et l\'innovation culinaire. Chaque visite devient une expérience multisensorielle unique.',
        image: '/photos/comptoir2.jpeg',
        category: 'ambiance',
        featured: true,
        altText: 'Vitrine élégante de la pâtisserie Pain Pâtisserie avec une présentation artistique de gâteaux et viennoiseries',
        tags: ['boutique', 'vitrine', 'art culinaire', 'pâtisserie artisanale']
    },
    {
        id: 2,
        title: 'La simplicité est la sophistication suprême',
        description: 'Gâteau d\'exception pour 4-6-8 personnes, où chaque couche révèle une nouvelle harmonie de saveurs.',
        longDescription: 'Cette création emblématique associe une base croustillante à une mousse légère et aérienne. Le cœur cache un insert fruité qui apporte fraîcheur et équilibre à l\'ensemble. La finition miroir reflète notre souci du détail et notre quête de perfection esthétique.',
        image: '/photos/grandgateau.jpeg',
        category: 'gateaux',
        featured: true,
        altText: 'Gâteau élégant à plusieurs étages avec finition miroir et décoration minimaliste',
        tags: ['gâteau', 'entremets', 'dessert', 'création signature']
    },
    {
        id: 3,
        title: 'Délicatesse Matinale',
        description: 'Nos viennoiseries sélection premium, façonnées à la main chaque matin pour un petit-déjeuner d\'exception.',
        longDescription: 'Chaque viennoiserie est le fruit d\'un savoir-faire transmis de génération en génération. Notre pâte feuilletée, développée sur trois jours, offre ce feuilletage incomparable et cette texture à la fois croustillante et fondante qui fait notre renommée.',
        image: '/photos/comptoir.jpeg',
        category: 'petites-douceurs',
        featured: false,
        altText: 'Assortiment de viennoiseries artisanales fraîchement préparées exposées au comptoir',
        tags: ['viennoiserie', 'croissant', 'petit-déjeuner', 'artisanal']
    },
    {
        id: 4,
        title: 'L\'art est fait pour troubler.La science rassure.',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/trompeoeil.jpeg',
        category: 'gateaux',
        featured: false,
        altText: 'Création pâtissière trompe-l\'œil',
        tags: ['trompe-l\'œil', 'création exclusive']
    },
    {
        id: 5,
        title: 'L\'apparence est souvent trompeuse',
        description: 'Nos trompe-l\'œil',
        image: '/photos/trompeoeil4.jpeg',
        category: 'specialites',
        featured: true,
        altText: 'Pâtisserie trompe-l\'œil artistique',
        tags: ['trompe-l\'œil', 'art culinaire']
    },
    {
        id: 6,
        title: 'La variété est le sel de la vie.',
        description: 'Un kaléidoscope gourmand',
        image: '/photos/tartellet.jpeg',
        category: 'gateaux',
        featured: true,
        altText: 'Assortiment de tartelettes colorées',
        tags: ['tartelettes', 'assortiment']
    },
    {
        id: 7,
        title: 'Le bonheur est une petite chose,si on sait la prendre',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/cookies.jpeg',
        category: 'gateaux',
        featured: false,
        altText: 'Cookies artisanaux',
        tags: ['cookies', 'gourmandise']
    },
    {
        id: 8,
        title: 'ceci n\'est pas une noisette',
        description: 'Notre boutique, lieu d\'excellence culinaire',
        image: '/photos/trompeoielmain1.jpeg',
        category: 'ambiance',
        featured: true,
        altText: 'Trompe-l\'œil en forme de noisette',
        tags: ['trompe-l\'œil', 'boutique']
    },
    {
        id: 9,
        title: 'La vraie beauté est dans le regard de celui qui regarde',
        description: 'Nos tartes d\'exception',
        image: '/photos/tartefraise.jpeg',
        category: 'petites-douceurs',
        featured: true,
        altText: 'Tarte aux fraises fraîches',
        tags: ['tarte', 'fraise', 'pâtisserie fine']
    }
];

const categories: Category[] = [
    { id: 'all', label: 'Tout voir' },
    { id: 'ambiance', label: 'Notre boutique' },
    { id: 'petites-douceurs', label: 'Viennoiseries' },
    { id: 'specialites', label: 'Trompe-l\'œil' },
    { id: 'gateaux', label: 'Salées' },
];

// --- Composant Galerie "Card Stack" ---
// La prop onNavigate a été retirée.
const Gallery: React.FC<GalleryProps> = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [cardStack, setCardStack] = useState<GalleryItem[]>([]);

    // Initialise et filtre le stack de cartes
    const initialItems = useMemo(() => {
        if (activeCategory === 'all') return galleryItems;
        return galleryItems.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        setCardStack(initialItems);
    }, [initialItems]);

    const handleSwipe = (itemToRemove: GalleryItem) => {
        // Optimistic update: remove the card immediately from the state
        setCardStack(currentStack => currentStack.filter(item => item.id !== itemToRemove.id));
    };

    const resetStack = () => {
        setCardStack(initialItems);
    };

    return (
        <section id="gallery" className="gallery-section-stacked">
            <div className="gallery-container">
                {/* En-tête de section */}
                <div className="gallery-header">
                    <h2 className="gallery-title">Nos Créations</h2>
                    <p className="gallery-subtitle">Glissez pour découvrir nos délices.</p>
                </div>

                {/* Filtres de catégories */}
                <div className="filter-bar">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Conteneur pour la pile de cartes */}
                <div className="card-stack-container">
                    <AnimatePresence custom>
                        {cardStack.map((item, index) => {
                            // On n'affiche que les 3 premières cartes pour la performance
                            if (index > 2) return null;

                            const isTopCard = index === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="swipe-card"
                                    // Propriétés de drag uniquement pour la carte du dessus
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    // 'e' est préfixé par '_' pour indiquer qu'il est intentionnellement non utilisé.
                                    onDragEnd={(_e, { offset, velocity }) => {
                                        if (isTopCard) {
                                            const swipeThreshold = 80;
                                            if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 200) {
                                                handleSwipe(item);
                                            }
                                        }
                                    }}
                                    // Applique les styles de la pile (échelle, position)
                                    animate={{
                                        scale: 1 - (index * 0.05),
                                        y: index * 12,
                                        zIndex: cardStack.length - index,
                                    }}
                                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                >
                                    <img src={item.image} alt={item.altText || item.title} className="card-image" draggable="false" />
                                    <div className="card-info-overlay">
                                        <div className="card-info-content">
                                            <h3 className="card-title">{item.title}</h3>
                                            <p className="card-description">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* État lorsque la pile est vide */}
                    {cardStack.length === 0 && (
                        <div className="empty-stack-state">
                            <p>Vous avez vu toutes nos créations !</p>
                            <button onClick={resetStack} className="reset-button">
                                Recommencer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gallery;