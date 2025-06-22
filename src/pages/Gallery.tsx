import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable'; // Pour les interactions tactiles
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Gallery.css'; // Assurez-vous de créer ce fichier CSS

// Importation des icônes en tant que composants React
const ChevronLeft: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const Plus: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Heart: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Share: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

interface GalleryProps {
  onNavigate: (sectionId: string) => void;
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

// Structure de données améliorée avec des champs SEO
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

// Extraction des catégories pour la navigation dynamique
const categories: Category[] = [
    { id: 'all', label: 'Tout voir' },
    { id: 'ambiance', label: 'Notre boutique' },
    { id: 'petites-douceurs', label: 'Viennoiseries' },
    { id: 'specialites', label: 'Trompe-l\'œil' },
    { id: 'gateaux', label: 'Salées' },
];

const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
    // États et références
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [detailView, setDetailView] = useState<number | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [interactionCount, setInteractionCount] = useState(0);
    const [shareMenuOpenItem, setShareMenuOpenItem] = useState<number | null>(null);
    
    // Refs pour les sections observables
    const featuredItems = galleryItems.filter(item => item.featured);
    const sliderRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    
    // Déterminer si l'utilisateur est sur mobile
    const [isMobile, setIsMobile] = useState(false);

    // Détecter la taille de l'écran
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Filtrage de la galerie
    useEffect(() => {
        // Animation de chargement
        setIsLoading(true);
        
        const timeoutId = setTimeout(() => {
            if (activeCategory === 'all') {
                setFilteredItems(galleryItems);
            } else {
                setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
            }
            setIsLoading(false);
        }, 300);
        
        return () => {
            clearTimeout(timeoutId);
        };
    }, [activeCategory]);    // Préchargement des images pour éviter les flashs
    useEffect(() => {
        const preloadImages = () => {
            featuredItems.forEach(item => {
                const img = new Image();
                img.src = item.image;
            });
        };
        preloadImages();
    }, [featuredItems]);// Configuration des swipes pour le mobile - Simplifiée
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
            setInteractionCount(prev => prev + 1);
        },
        onSwipedRight: () => {
            setCurrentSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
            setInteractionCount(prev => prev + 1);
        },
        preventScrollOnSwipe: false,
        trackMouse: false,
        swipeDuration: 500,
        touchEventOptions: { passive: true }
    });    // Auto-rotation du slider avec pause au survol - Temps augmenté pour éviter les flashs
    useEffect(() => {
        if (isScrolled) return; // Ne pas faire défiler si l'utilisateur a scrollé plus bas
        
        const interval = setInterval(() => {
            if (!isShareMenuOpen && document.visibilityState === 'visible') {
                setCurrentSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
            }
        }, 8000); // Augmenté à 8 secondes pour laisser plus de temps à chaque image
        
        return () => clearInterval(interval);
    }, [currentSlide, isShareMenuOpen, featuredItems.length, isScrolled]);

    // Détection du scroll pour arrêter l'auto-rotation
    useEffect(() => {
        const handleScroll = () => {
            if (sliderRef.current) {
                const rect = sliderRef.current.getBoundingClientRect();
                setIsScrolled(rect.bottom < 0);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Gestion de la vue détaillée
    const openDetail = useCallback((id: number) => {
        setDetailView(id);
        document.body.style.overflow = 'hidden';
        // Analytics
        setInteractionCount(prev => prev + 5); // Interaction majeure
    }, []);

    const closeDetail = useCallback(() => {
        setDetailView(null);
        document.body.style.overflow = 'auto';
    }, []);

    const navigateDetail = useCallback((direction: 'next' | 'prev') => {
        if (detailView === null) return;

        const currentIndex = filteredItems.findIndex(item => item.id === detailView);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredItems.length;
        } else {
            newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        }

        setDetailView(filteredItems[newIndex].id);
        setInteractionCount(prev => prev + 1);
    }, [detailView, filteredItems]);

    // Configuration des gestes tactiles pour la vue détaillée - CORRIGÉ
    const detailSwipeHandlers = useSwipeable({
        onSwipedLeft: () => navigateDetail('next'),
        onSwipedRight: () => navigateDetail('prev'),
        onSwipedDown: closeDetail,
        preventScrollOnSwipe: false, // Permet le défilement pendant le swipe
        trackMouse: false,
        swipeDuration: 500, // AJOUT: rend la détection de swipe plus permissive
        touchEventOptions: { passive: true } // AJOUT: améliore les performances tactiles
    });

    // Gestion des favoris
    const toggleLike = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setLikedItems(prev => 
            prev.includes(id) 
                ? prev.filter(itemId => itemId !== id) 
                : [...prev, id]
        );
        setInteractionCount(prev => prev + 2); // Interaction moyenne
    }, []);

    // Gestion du menu partage - CORRIGÉ
    const toggleShareMenu = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // AJOUT: Empêche les clics accidentels
        setShareMenuOpenItem(prev => prev === id ? null : id);
        setIsShareMenuOpen(prev => !prev);
    }, []);

    // Partage sur les réseaux sociaux
    const shareItem = useCallback((id: number, platform: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // AJOUT: Empêche les clics accidentels
        const item = galleryItems.find(i => i.id === id);
        if (!item) return;
        
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Découvrez "${item.title}" chez Pain Pâtisserie!`);
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                break;
            case 'instagram':
                // Instagram ne permet pas le partage direct, mais on peut simuler un message
                alert("Pour partager sur Instagram, veuillez capturer une image et la partager directement dans l'application Instagram.");
                setInteractionCount(prev => prev + 1);
                return;
            default:
                // Partage natif si disponible
                if (navigator.share) {
                    try {
                        navigator.share({
                            title: item.title,
                            text: item.description,
                            url: window.location.href
                        }).catch(error => console.log('Erreur de partage:', error));
                        setInteractionCount(prev => prev + 3);
                    } catch (error) {
                        console.error('Erreur de partage:', error);
                    }
                    return;
                }
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer'); // CORRECTION: ajoute des paramètres de sécurité
        }
        setInteractionCount(prev => prev + 3);
        
        // Fermer le menu après partage
        setShareMenuOpenItem(null);
        setIsShareMenuOpen(false);
    }, []);

    // Fermer le menu de partage lorsqu'on clique ailleurs - CORRIGÉ
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Vérifiez si le clic est en dehors des menus de partage
            const isOutsideShareMenu = !(e.target as Element)?.closest('.share-menu');
            const isNotShareButton = !(e.target as Element)?.closest('[data-share-button]');
            
            if (isOutsideShareMenu && isNotShareButton) {
                setShareMenuOpenItem(null);
                setIsShareMenuOpen(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);    // Prévention du défilement excessif pour iOS
    useEffect(() => {
        // Variable pour stocker la position Y initiale
        let touchStartY = 0;

        const preventOverScroll = (e: TouchEvent) => {
            const element = e.target as HTMLElement;
            const isDetailContent = element.closest('.detail-content');
            
            if (!isDetailContent) return;
            
            const scrollTop = isDetailContent.scrollTop;
            const scrollHeight = isDetailContent.scrollHeight;
            const height = isDetailContent.clientHeight;
            
            // Stocker la position Y de départ
            if (e.type === 'touchstart') {
                touchStartY = e.touches[0].clientY;
                return;
            }
            
            // Calculer le delta depuis le début du toucher
            const delta = e.touches[0].clientY - touchStartY;
            
            // Empêcher le défilement vers le haut quand on est déjà en haut
            if (scrollTop <= 0 && delta > 0) {
                e.preventDefault();
            }
            
            // Empêcher le défilement vers le bas quand on est déjà en bas
            if (scrollTop + height >= scrollHeight && delta < 0) {
                e.preventDefault();
            }
        };
        
        // iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        
        if (isIOS) {
            document.addEventListener('touchstart', preventOverScroll, { passive: false });
            document.addEventListener('touchmove', preventOverScroll, { passive: false });
        }
        
        return () => {
            if (isIOS) {
                document.removeEventListener('touchstart', preventOverScroll);
                document.removeEventListener('touchmove', preventOverScroll);
            }
        };
    }, []);

    // Handle background images with data attributes
    useEffect(() => {
        const updateBackgroundImages = () => {
            const elements = document.querySelectorAll('.gallery-item-image[data-bg-url]');
            elements.forEach(el => {
                const bgUrl = el.getAttribute('data-bg-url');
                if (bgUrl) {
                    (el as HTMLElement).style.backgroundImage = `url(${bgUrl})`;
                }
            });
        };
        
        updateBackgroundImages();
        
        // Also update on window resize to handle any dynamic changes
        window.addEventListener('resize', updateBackgroundImages);
        
        return () => {
            window.removeEventListener('resize', updateBackgroundImages);
        };
    }, [filteredItems, currentSlide, detailView]);

    // Fix ARIA attributes for browsers with strict validation
    useEffect(() => {
        // Update aria-pressed attributes
        document.querySelectorAll('[aria-pressed]').forEach(el => {
            const value = el.getAttribute('aria-pressed');
            if (value === 'true' || value === 'false') {
                // Already a string, no need to change
                return;
            }
            
            // Set the string value based on the expression evaluation
            if (el.classList.contains('filter-button')) {
                const categoryId = el.getAttribute('data-category-id');
                el.setAttribute('aria-pressed', categoryId === activeCategory ? 'true' : 'false');
            }
        });
        
        // Update aria-expanded attributes
        document.querySelectorAll('[aria-expanded]').forEach(el => {
            const value = el.getAttribute('aria-expanded');
            if (value === 'true' || value === 'false') {
                // Already a string, no need to change
                return;
            }
            
            // Set the string value based on the expression evaluation
            if (el.hasAttribute('data-share-button')) {
                const itemId = el.getAttribute('data-item-id');
                el.setAttribute('aria-expanded', itemId === shareMenuOpenItem?.toString() ? 'true' : 'false');
            }
        });
    }, [activeCategory, shareMenuOpenItem]);

    return (
        <div 
            className="py-20 sm:py-32 bg-[#faf7f2] relative overflow-hidden w-full" 
            ref={galleryRef}
            id="gallery"
        >
            {/* Éléments de design d'arrière-plan */}
            <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
            
            <motion.div 
                className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-t from-gold/5 to-transparent rounded-full filter blur-3xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <motion.div 
                className="absolute left-0 top-40 w-64 h-64 bg-gradient-to-b from-gold/5 to-transparent rounded-full filter blur-3xl"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 relative z-10">
                {/* En-tête de section avec animation */}
                <motion.div
                    className="mb-16 sm:mb-28 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">
                        <motion.span
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="inline-block overflow-hidden whitespace-nowrap"
                        >
                            Découvrez nos créations
                        </motion.span>
                    </h2>
                    
                    <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
                        L'Art de Pain Pâtisserie
                    </h3>
                    
                    <motion.div
                        className="w-24 h-px bg-gold mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.div>

                {/* Showcase slider avec effet cinématique - CORRIGÉ */}
                <div 
                    className="mb-24 sm:mb-36 relative showcase-slider touch-auto" // AJOUT: touch-auto pour améliorer la gestion tactile
                    {...swipeHandlers}
                    ref={(el) => {
                        // Combine both refs
                        sliderRef.current = el;
                        if (swipeHandlers.ref) {
                            // @ts-ignore - swipeHandlers.ref is a valid RefCallback
                            swipeHandlers.ref(el);
                        }
                    }}
                >
                    <div className="relative h-[50vh] sm:h-[70vh] overflow-hidden rounded-lg shadow-xl">
                        {/* Indicateur de chargement */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-chocolate/10 z-50">
                                <div className="loader-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        )}
                          {/* Instructions de swipe pour mobile */}
                        {isMobile && (
                            <motion.div 
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-black/30 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm"
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: interactionCount > 0 ? 0 : 1, y: interactionCount > 0 ? -10 : 0 }}
                            >
                                <span>Glissez pour explorer</span>
                            </motion.div>
                        )}
                          {/* Slides - Correction pour éviter les flashs d'images */}
                        <AnimatePresence initial={false}>
                            {featuredItems.map((item, index) => (
                                <motion.div
                                    key={`showcase-${item.id}`}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: currentSlide === index ? 1 : 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                                    style={{ zIndex: currentSlide === index ? 1 : 0 }}
                                >
                                    <div className="h-full w-full flex flex-col md:flex-row">
                                        {/* Panneau image avec parallaxe */}
                                        <div className="w-full md:w-3/4 h-full relative overflow-hidden cursor-pointer" onClick={() => openDetail(item.id)}>
                                            {/* Superposition artistique */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/10 z-10"></div>
                                            
                                            {/* Image principale avec préchargement pour éviter les flashs */}
                                            <div className="absolute inset-0">                                                <img 
                                                    src={item.image} 
                                                    alt={item.altText || item.title}
                                                    className={`carousel-image ${currentSlide === index ? 'active' : 'inactive'}`}
                                                />
                                            </div>

                                            {/* Élément design doré */}
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gold/40 to-transparent"></div>
                                            
                                            {/* Watermark / Branding subtil */}
                                            <div className="absolute bottom-4 left-4 text-white/30 text-xs font-light tracking-widest z-10">
                                                PAIN PÂTISSERIE
                                            </div>
                                        </div>

                                        {/* Panneau contenu avec animation séquentielle */}
                                        <div className="w-full md:w-1/4 bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                                            {/* Forme décorative */}
                                            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gold/5"></div>
                                            
                                            <div className="relative z-10">
                                                {/* Numéro de slide artistique */}
                                                <div className="text-gold/30 text-6xl font-playfair absolute -top-10 -left-2 opacity-50">
                                                    {index + 1}
                                                </div>
                                                
                                                {/* Titre */}
                                                <div className="overflow-hidden mb-4">
                                                    <h4 className="font-playfair text-2xl sm:text-3xl text-chocolate relative">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                
                                                {/* Description */}
                                                <p className="text-chocolate-light mb-8 font-light">
                                                    {item.description}
                                                </p>
                                                
                                                {/* Badges de catégorie */}
                                                <div className="mt-6 flex items-center gap-2">
                                                    <span className="text-xs uppercase tracking-wider text-gold/70 border border-gold/30 px-2 py-1 rounded-sm">
                                                        {categories.find(c => c.id === item.category)?.label || item.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>{/* Contrôles de navigation retirés */}
                        
                        {/* Pagination élégante et accessible */}
                        <div className="absolute bottom-8 left-8 z-20 flex items-center space-x-3">
                            {featuredItems.map((_, index) => (
                                <button
                                    key={`indicator-${index}`}
                                    type="button"
                                    onClick={() => setCurrentSlide(index)}
                                    className="slider-indicator transition-all duration-500 focus:outline-none group touch-manipulation px-2 py-2" // AJOUT: padding et touch-manipulation
                                    aria-label={`Afficher l'image ${index + 1}`}
                                >
                                    <span className={`block ${currentSlide === index 
                                        ? 'w-8 h-[2px] bg-gold' 
                                        : 'w-4 h-[1px] bg-white/60 group-hover:bg-white/80'
                                    }`}></span>
                                    <span className="sr-only">Diapositive {index + 1}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filtre de catégories avec animation */}
                <motion.div 
                    className="mb-12 sm:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-4 px-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setActiveCategory(category.id)}
                                className="filter-button px-4 sm:px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden focus:outline-none touch-manipulation" // AJOUT: touch-manipulation                                aria-label={`Filtrer par ${category.label}`}
                                aria-pressed="false"
                                data-category-id={category.id}
                            >
                                <span className={`relative z-10 ${activeCategory === category.id 
                                    ? 'text-gold' 
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}>{category.label}</span>
                                
                                {activeCategory === category.id && (
                                    <motion.span 
                                        className="absolute bottom-0 left-0 h-[1px] bg-gold"
                                        layoutId="categoryUnderline"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grille de galerie avec animations d'apparition */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-24"
                    layout
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={`grid-${item.id}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="relative group gallery-item"
                            onMouseEnter={() => setHoverIndex(item.id)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            {/* Container d'image avec effets avancés */}
                            <div
                                className="aspect-[4/5] overflow-hidden relative cursor-pointer shadow-xl mb-6 rounded-sm"
                                onClick={() => openDetail(item.id)}
                            >
                                {/* Image de produit avec effet de zoom */}
                                <motion.div
                                    className="h-full w-full bg-cover bg-center relative"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <LazyLoadImage
                                        src={item.image}
                                        alt={item.altText || item.title}
                                        effect="blur"
                                        className="w-full h-full object-cover"
                                        wrapperClassName="w-full h-full"
                                        threshold={300}
                                        placeholderSrc="/placeholder-image.jpg"
                                    />
                                </motion.div>

                                {/* Superposition artistique au survol */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ mixBlendMode: "multiply" }}
                                />
                                
                                {/* Indicateur "plus" avec animation */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                                        <Plus />
                                    </div>
                                </motion.div>
                                
                                {/* Actions rapides (like et partage) - CORRIGÉ */}
                                <div className="absolute top-4 right-4 flex flex-col space-y-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {/* Bouton J'aime */}
                                    <button
                                        type="button"
                                        onClick={(e) => toggleLike(item.id, e)}
                                        className="action-button w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform hover:scale-110 touch-manipulation" // AJOUT: touch-manipulation
                                        aria-label={likedItems.includes(item.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                        <Heart filled={likedItems.includes(item.id)} />
                                    </button>
                                    
                                    {/* Bouton Partager - CORRIGÉ */}
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            type="button"
                                            onClick={(e) => toggleShareMenu(item.id, e)}
                                            className="action-button w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform hover:scale-110 touch-manipulation" 
                                            aria-label="Partager cette création"
                                            title="Partager cette création"
                                            aria-expanded="false"
                                            data-share-button="true"
                                            data-item-id={item.id.toString()}
                                        >
                                            <Share />
                                        </button>
                                        
                                        {/* Menu de partage */}
                                        {shareMenuOpenItem === item.id && (
                                            <div className="absolute right-0 mt-2 p-2 bg-white rounded-md shadow-lg z-30 share-menu">
                                                <button 
                                                    type="button"
                                                    onClick={(e) => shareItem(item.id, 'facebook', e)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-chocolate hover:bg-gold/10 rounded touch-manipulation" // AJOUT: touch-manipulation
                                                >
                                                    Facebook
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={(e) => shareItem(item.id, 'twitter', e)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-chocolate hover:bg-gold/10 rounded touch-manipulation" // AJOUT: touch-manipulation
                                                >
                                                    Twitter
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={(e) => shareItem(item.id, 'instagram', e)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-chocolate hover:bg-gold/10 rounded touch-manipulation" // AJOUT: touch-manipulation
                                                >
                                                    Instagram
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Informations produit avec animations */}
                            <div className="text-center px-4">
                                {/* Titre avec effet de couleur au survol */}
                                <motion.h4
                                    className="font-playfair text-xl text-chocolate mb-2 group-hover:text-gold transition-colors duration-300"
                                    animate={{ color: hoverIndex === item.id ? "var(--color-gold)" : "var(--color-chocolate)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.title}
                                </motion.h4>
                                
                                {/* Description concise */}
                                <p className="text-chocolate-light/80 font-light mb-3 line-clamp-2">
                                    {item.description}
                                </p>
                                
                                {/* Tags de catégorie */}
                                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                                    {item.tags && item.tags.slice(0, 2).map((tag, i) => (
                                        <span 
                                            key={`tag-${item.id}-${i}`}
                                            className="text-[10px] uppercase tracking-wider text-gold/70 border border-gold/20 px-2 py-0.5 rounded-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Ligne décorative animée */}
                            <motion.div
                                className="absolute bottom-[-12px] left-1/2 h-[1px] bg-gold"
                                initial={{ width: "0%", x: "-50%" }}
                                animate={{
                                    width: hoverIndex === item.id ? "60%" : "0%",
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Message si aucun résultat */}
                {filteredItems.length === 0 && !isLoading && (
                    <div className="py-16 text-center">
                        <p className="text-chocolate text-lg">Aucune création trouvée dans cette catégorie.</p>
                        <button 
                            type="button"
                            onClick={() => setActiveCategory('all')}
                            className="mt-4 underline text-gold hover:text-chocolate transition-colors touch-manipulation" // AJOUT: touch-manipulation
                        >
                            Voir toutes nos créations
                        </button>
                    </div>
                )}
                
                {/* Section "Vous aimerez aussi" */}
                {filteredItems.length > 0 && activeCategory !== 'all' && (
                    <div className="mt-24 pt-16 border-t border-gold/10">
                        <h4 className="text-2xl font-playfair text-chocolate mb-12 text-center">
                            Vous aimerez aussi
                        </h4>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {galleryItems
                                .filter(item => item.category !== activeCategory)
                                .slice(0, 4)
                                .map((item, index) => (
                                    <motion.div
                                        key={`suggestion-${item.id}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="cursor-pointer group suggestion-item touch-manipulation" // AJOUT: touch-manipulation
                                        onClick={() => openDetail(item.id)}
                                    >
                                        <div className="aspect-square overflow-hidden rounded-sm relative mb-3">
                                            <img 
                                                src={item.image} 
                                                alt={item.altText || item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-chocolate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <h5 className="text-sm text-chocolate/80 group-hover:text-gold transition-colors duration-300 text-center line-clamp-1">
                                            {item.title}
                                        </h5>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>

            {/* Vue détaillée avec animations fluides - CORRIGÉ */}
            <AnimatePresence>
                {detailView !== null && (
                    <motion.div
                        className="fixed inset-0 bg-chocolate/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-12 detail-view touch-auto" // AJOUT: touch-auto
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        {...detailSwipeHandlers}
                    >
                        {/* Indicateur de swipe pour mobile */}
                        {isMobile && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/70 text-xs font-light swipe-hint">
                                Glissez pour naviguer • Balayez vers le bas pour fermer
                            </div>
                        )}
                        
                        {/* Bouton fermer amélioré */}
                        <button
                            type="button"
                            onClick={closeDetail}
                            className="close-button absolute top-8 right-8 z-20 text-white/80 h-10 w-10 flex items-center justify-center rounded-full bg-chocolate/40 backdrop-blur-sm touch-manipulation" // AJOUT: touch-manipulation
                            aria-label="Fermer la vue détaillée"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Flèches de navigation - CORRIGÉ */}
                        <button
                            type="button"
                            className="nav-arrow absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 h-12 w-12 md:h-16 md:w-16 flex items-center justify-center rounded-full bg-chocolate/20 backdrop-blur-sm touch-manipulation" // AJOUT: touch-manipulation
                            onClick={() => navigateDetail('prev')}
                            aria-label="Image précédente"
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            type="button"
                            className="nav-arrow absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 h-12 w-12 md:h-16 md:w-16 flex items-center justify-center rounded-full bg-chocolate/20 backdrop-blur-sm touch-manipulation" // AJOUT: touch-manipulation
                            onClick={() => navigateDetail('next')}
                            aria-label="Image suivante"
                        >
                            <ChevronRight />
                        </button>

                        {/* Contenu avec animations élégantes - CORRIGÉ */}
                        <motion.div
                            className="max-w-6xl w-full bg-white flex flex-col md:flex-row max-h-[90vh] overflow-auto rounded shadow-2xl detail-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring", damping: 25 }}
                        >
                            {/* Image produit avec zoom au survol */}
                            <div className="w-full md:w-2/3 relative overflow-hidden group detail-image-container">
                                <motion.div 
                                    className="h-full bg-gray-100"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img
                                        src={galleryItems.find(item => item.id === detailView)?.image}
                                        alt={galleryItems.find(item => item.id === detailView)?.altText || 
                                             galleryItems.find(item => item.id === detailView)?.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                </motion.div>
                                
                                {/* Badges flottants (featured, nouveau, etc.) */}
                                {galleryItems.find(item => item.id === detailView)?.featured && (
                                    <div className="absolute top-4 left-4 bg-gold text-white text-xs px-3 py-1 rounded-sm uppercase tracking-wide feature-badge">
                                        Signature
                                    </div>
                                )}
                                
                                {/* Actions sociales en superposition - CORRIGÉ */}
                                <div className="absolute bottom-4 left-4 flex space-x-3 detail-actions">
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const id = detailView;
                                            if (id !== null) { // CORRECTION: vérification de nullité
                                                setLikedItems(prev => 
                                                    prev.includes(id) 
                                                        ? prev.filter(itemId => itemId !== id) 
                                                        : [...prev, id]
                                                );
                                            }
                                        }}
                                        className="detail-action-button bg-white/90 rounded-full h-10 w-10 flex items-center justify-center shadow-lg touch-manipulation" // AJOUT: touch-manipulation
                                        aria-label={likedItems.includes(detailView || 0) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                        <Heart filled={likedItems.includes(detailView || 0)} />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const item = galleryItems.find(i => i.id === detailView);
                                            if (!item) return;
                                            
                                            if (navigator.share) {
                                                try {
                                                    navigator.share({
                                                        title: item.title,
                                                        text: item.description,
                                                        url: window.location.href
                                                    }).catch(error => console.log('Erreur de partage:', error));
                                                } catch (error) {
                                                    console.error('Erreur de partage:', error);
                                                    // Fallback en cas d'erreur
                                                    const url = encodeURIComponent(window.location.href);
                                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
                                                }
                                            } else {                                                // Fallback
                                                const url = encodeURIComponent(window.location.href);
                                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        className="detail-action-button bg-white/90 rounded-full h-10 w-10 flex items-center justify-center shadow-lg touch-manipulation" // AJOUT: touch-manipulation
                                        aria-label="Partager cette création"
                                    >
                                        <Share />
                                    </button>
                                </div>
                            </div>

                            {/* Détails produit */}
                            <div className="w-full md:w-1/3 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-[#faf7f2] relative overflow-hidden detail-info">
                                {/* Élément décoratif */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/5 z-0 decorative-circle"></div>
                                
                                <motion.div
                                    className="relative z-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <motion.div 
                                        className="w-16 h-px bg-gold mb-6 decorative-line"
                                        initial={{ width: 0 }}
                                        animate={{ width: 64 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    />

                                    <motion.h3 
                                        className="font-playfair text-2xl sm:text-3xl text-chocolate mb-4 detail-title"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        {galleryItems.find(item => item.id === detailView)?.title}
                                    </motion.h3>
                                    
                                    <motion.div
                                        className="detail-description"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <p className="text-chocolate-light mb-6">
                                            {galleryItems.find(item => item.id === detailView)?.description}
                                        </p>
                                        
                                        <p className="text-chocolate-light/80 font-light mb-8 text-sm">
                                            {galleryItems.find(item => item.id === detailView)?.longDescription || 
                                             galleryItems.find(item => item.id === detailView)?.description}
                                        </p>
                                    </motion.div>
                                    
                                    {/* Tags et catégories */}
                                    <motion.div 
                                        className="flex flex-wrap gap-2 mb-8 detail-tags"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    >
                                        {galleryItems.find(item => item.id === detailView)?.tags?.map((tag, i) => (
                                            <span 
                                                key={`detail-tag-${i}`}
                                                className="text-xs uppercase tracking-wider text-gold/70 border border-gold/30 px-2 py-1 rounded-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>
                                    
                                    {/* Bouton d'action - CORRIGÉ */}
                                    <motion.div
                                        className="detail-cta"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                    >
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                closeDetail();
                                                onNavigate('contact');
                                            }}
                                            className="cta-button relative border border-chocolate text-chocolate px-8 py-3 overflow-hidden w-full touch-manipulation" // AJOUT: touch-manipulation
                                        >
                                            <span className="relative z-10">
                                                Commander cette création
                                            </span>
                                        </button>
                                    </motion.div>
                                    
                                    {/* Informations supplémentaires */}
                                    <div className="mt-8 pt-6 border-t border-gold/10 text-xs text-chocolate-light/60 detail-footer">
                                        <p>Nos créations sont disponibles sur commande.</p>
                                        <p className="mt-1">Contactez-nous pour plus d'informations.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transition vers la section suivante */}
            <div className="gallery-about-transition w-full bg-gradient-to-b from-[#faf7f2] to-cream h-32 -mb-1 relative z-20"></div>
        </div>
    );
};

export default Gallery;