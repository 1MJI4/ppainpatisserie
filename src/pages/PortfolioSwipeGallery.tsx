import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const images = [
  { src: "/photos/entremet1.jpg", title: "Entremet", description: "Chocolat & fruits rouges" },
  { src: "/photos/macarons.jpg", title: "Macarons", description: "Assortiment maison" },
  // ...
];

export default function PortfolioSwipeGallery() {
  const [index, setIndex] = useState(0);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left") setIndex((prev) => (prev + 1) % images.length);
    if (dir === "right") setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers} className="w-full h-screen flex items-center justify-center bg-cream relative overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute w-4/5 max-w-md rounded-xl overflow-hidden shadow-xl bg-white z-20"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <img src={images[index].src} alt={images[index].title} className="w-full h-80 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-playfair text-chocolate">{images[index].title}</h3>
            <p className="text-chocolate-light">{images[index].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs */}
      <div className="absolute bottom-8 flex space-x-2 z-30">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-gold" : "bg-chocolate-light"}`}
          />
        ))}
      </div>
    </div>
  );
}
