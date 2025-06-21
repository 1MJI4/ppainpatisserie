import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Définition des images de la galerie
const galleryItems = [
    {
        id: 1,
        title: 'Nous mangeons d\'abord avec les yeux.',
        description: 'Ce n\'est pas qu\'une simple vitrine, c\'est une exposition d\'œuvres d\'art éphémères',
        image: '/photos/comptoir2.jpeg',
        category: 'ambiance',
        featured: true
    },
    {
        id: 2,
        title: 'La simplicité est la sophistication suprême',
        description: 'Gâteau d\'exception 4-6-8 personnes',
        image: '/photos/grandgateau.jpeg',
        category: 'gateaux',
        featured: true
    },
    {
        id: 3,
        title: 'Délicatesse Matinale',
        description: 'Nos viennoiseries sélection premium',
        image: '/photos/comptoir.jpeg',
        category: 'petites-douceurs',
        featured: false
    },

    {
        id: 4,
        title: 'L\'art est fait pour troubler.La science rassure.',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/trompeoeil.jpeg',
        category: 'gateaux',
        featured: false
    },
    {
        id: 5,
        title: 'L\'apparence est souvent trompeuse',
        description: 'Nos trompe-l\'œil',
        image: '/photos/trompeoeil4.jpeg',
        category: 'specialites',
        featured: true
    },

    {
        id: 6,
        title: 'La variété est le sel de la vie.',
        description: 'Un kaléidoscope gourmand',
        image: '/photos/tartellet.jpeg',
        category: 'gateaux',
        featured: true
    },
    {
        id: 7,
        title: 'Le bonheur est une petite chose,si on sait la prendre',
        description: 'Création exclusive jusqu\'à 15 personnes',
        image: '/photos/cookies.jpeg',
        category: 'gateaux',
        featured: false
    },
    {
        id: 8,
        title: 'ceci n\'est pas une noisette',
        description: 'Notre boutique, lieu d\'excellence culinaire',
        image: '/photos/trompeoielmain1.jpeg',
        category: 'ambiance',
        featured: true
    },
    {
        id: 9,
        title: 'La vraie beauté est dans le regard de celui qui regarde',
        description: 'Nos tartes d\'exception',
        image: '/photos/tartefraise.jpeg',
        category: 'petites-douceurs',
        featured: true
    }
];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredItems, setFilteredItems] = useState(galleryItems);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [detailView, setDetailView] = useState<number | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const featuredItems = galleryItems.filter(item => item.featured);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(galleryItems);
        } else {
            setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
        }
    }, [activeCategory]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
    };

    // Auto-rotate the showcase
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const openDetail = (id: number) => {
        setDetailView(id);
        document.body.style.overflow = 'hidden';
    };

    const closeDetail = () => {
        setDetailView(null);
        document.body.style.overflow = 'auto';
    };

    const navigateDetail = (direction: 'next' | 'prev') => {
        if (detailView === null) return;

        const currentIndex = filteredItems.findIndex(item => item.id === detailView);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredItems.length;
        } else {
            newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        }

        setDetailView(filteredItems[newIndex].id);
    };

    return (
        <section id="gallery" className="py-32 bg-[#faf7f2] relative overflow-hidden">
            {/* Subtle luxury background elements */}
            <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-t from-gold/5 to-transparent rounded-full filter blur-3xl"></div>
            <div className="absolute left-0 top-40 w-64 h-64 bg-gradient-to-b from-gold/5 to-transparent rounded-full filter blur-3xl"></div>

            <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
                {/* Elegant section heading */}
                <motion.div
                    className="mb-28 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm uppercase tracking-[0.25em] text-gold mb-4 font-medium">Découvrez nos créations</h2>
                    <h3 className="text-3xl md:text-5xl font-playfair text-chocolate mb-8 font-light">
                        L'Art de Pain Patisserie
                    </h3>
                    <div className="w-24 h-px bg-gold mx-auto"></div>
                </motion.div>

                {/* Luxury showcase slider */}
                <div className="mb-36 relative" ref={sliderRef}>
                    <div className="relative h-[70vh] overflow-hidden">
                        {featuredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="absolute inset-0"
                                initial={false}
                                animate={{
                                    opacity: currentSlide === index ? 1 : 0,
                                    scale: currentSlide === index ? 1 : 1.1,
                                }}
                                transition={{
                                    opacity: { duration: 1, ease: 'easeInOut' },
                                    scale: { duration: 1.5, ease: 'easeInOut' }
                                }}
                            >
                                <div className="h-full w-full flex flex-col md:flex-row">
                                    {/* Image panel */}
                                    <div className="w-full md:w-3/4 h-full relative">
                                        {/* Overlay for luxury feel */}
                                        <div className="absolute inset-0 bg-black/20 z-10"></div>

                                        {/* Image with subtle zoom effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                            initial={{ scale: 1.05 }}
                                            animate={{
                                                scale: currentSlide === index ? 1 : 1.05,
                                            }}
                                            transition={{ duration: 10, ease: 'linear' }}
                                        />

                                        {/* Gold detail element */}
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-gold/40 to-transparent"></div>
                                    </div>

                                    {/* Content panel */}
                                    <div className="w-full md:w-1/4 bg-white p-8 md:p-12 flex flex-col justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: currentSlide === index ? 1 : 0,
                                                y: currentSlide === index ? 0 : 20
                                            }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                        >
                                            <h4 className="font-playfair text-3xl text-chocolate mb-4">
                                                {item.title}
                                            </h4>
                                            <p className="text-chocolate-light mb-8 font-light">
                                                {item.description}
                                            </p>


                                            <button
                                                onClick={() => openDetail(item.id)}
                                                className="border border-chocolate text-chocolate px-8 py-3 hover:bg-chocolate hover:text-white transition-colors duration-300"
                                            >
                                                Découvrir
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Navigation controls */}
                        <div className="absolute bottom-8 right-8 z-20 flex gap-4">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/40 text-white hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full flex items-center justify-center border border-white/40 text-white hover:bg-white/10 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Elegant pagination */}
                        <div className="absolute bottom-8 left-8 z-20 flex items-center space-x-3">
                            {featuredItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`transition-all duration-500 ${currentSlide === index
                                            ? 'w-8 h-[2px] bg-gold'
                                            : 'w-4 h-[1px] bg-white/60 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Elegant category filter */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors ${activeCategory === 'all'
                                    ? 'text-gold border-b border-gold'
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}
                        >
                            Tout voir
                        </button>
                        <button
                            onClick={() => setActiveCategory('ambiance')}
                            className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors ${activeCategory === 'ambiance'
                                    ? 'text-gold border-b border-gold'
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}
                        >
                            Notre boutique
                        </button>
                        <button
                            onClick={() => setActiveCategory('viennoiseries')}
                            className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors ${activeCategory === 'petites-douceurs'
                                    ? 'text-gold border-b border-gold'
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}
                        >
                            viennoiseries
                        </button>
                        <button
                            onClick={() => setActiveCategory('Trompe-l\'œil')}
                            className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors ${activeCategory === 'specialites'
                                    ? 'text-gold border-b border-gold'
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}
                        >
                            Trompe-l'œil
                        </button>
                        <button
                            onClick={() => setActiveCategory('salées')}
                            className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors ${activeCategory === 'gateaux'
                                    ? 'text-gold border-b border-gold'
                                    : 'text-chocolate/60 hover:text-chocolate/90'
                                }`}
                        >
                            salées
                        </button>
                    </div>
                </div>

                {/* Luxury grid layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                    layout
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoverIndex(item.id)}
                            onMouseLeave={() => setHoverIndex(null)}
                            className="relative group"
                        >
                            {/* Image container with luxury effect */}
                            <div
                                className="aspect-[4/5] overflow-hidden relative cursor-pointer shadow-xl mb-6"
                                onClick={() => openDetail(item.id)}
                            >
                                {/* Product image with zoom effect */}
                                <motion.div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                />

                                {/* Luxurious overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-chocolate/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ mixBlendMode: "multiply" }}
                                />

                                {/* Luxury "plus" icon */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                                        <Plus className="w-6 h-6 text-white" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Product information with subtle animations */}
                            <div className="text-center px-4">
                                <motion.h4
                                    className="font-playfair text-xl text-chocolate mb-2 group-hover:text-gold transition-colors duration-300"
                                    animate={{ color: hoverIndex === item.id ? "#DAA520" : "#2F1B14" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.title}
                                </motion.h4>

                                <p className="text-chocolate-light/80 font-light mb-3">
                                    {item.description}
                                </p>


                            </div>

                            {/* Decorative line beneath */}
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
            </div>

            {/* Luxury detail view */}
            <AnimatePresence>
                {detailView !== null && (
                    <motion.div
                        className="fixed inset-0 bg-chocolate/90 z-50 flex items-center justify-center p-4 md:p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeDetail}
                            className="absolute top-8 right-8 z-20 text-white/80 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation arrows */}
                        <button
                            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 hover:text-white"
                            onClick={() => navigateDetail('prev')}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white/70 hover:text-white"
                            onClick={() => navigateDetail('next')}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Content container */}
                        <motion.div
                            className="max-w-6xl w-full bg-white flex flex-col md:flex-row max-h-[80vh]"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Large product image */}
                            <div className="w-full md:w-2/3 relative">
                                <div className="h-full">
                                    <img
                                        src={galleryItems.find(item => item.id === detailView)?.image}
                                        alt={galleryItems.find(item => item.id === detailView)?.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Product details */}
                            <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-[#faf7f2]">
                                <div className="w-16 h-px bg-gold mb-6"></div>

                                <h3 className="font-playfair text-3xl text-chocolate mb-4">
                                    {galleryItems.find(item => item.id === detailView)?.title}
                                </h3>

                                <p className="text-chocolate-light mb-8">
                                    {galleryItems.find(item => item.id === detailView)?.description}
                                </p>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;