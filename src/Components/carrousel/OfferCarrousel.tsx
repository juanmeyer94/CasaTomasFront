import React, { useState, useEffect, useCallback } from "react";
import UserCard from "../Card/userCard";
import { ChevronLeft, ChevronRight, Tag, Star, Zap, ShoppingCart, Sparkles } from "lucide-react";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";
import { motion } from "framer-motion";

const OfferCarousel: React.FC = () => {
  const { AllObjects} = useUserContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const offerItems = AllObjects.filter((item: ObjectType) => item.offer === true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) {
        setVisibleItems(4); // 4K+ screens
      } else if (width >= 1536) {
        setVisibleItems(3); // 2xl screens
      } else if (width >= 1280) {
        setVisibleItems(3); // xl screens
      } else if (width >= 1024) {
        setVisibleItems(2); // lg screens (1360x768 cae aquí)
      } else if (width >= 768) {
        setVisibleItems(2); // md screens
      } else if (width >= 640) {
        setVisibleItems(1); // sm screens
      } else if (width >= 475) {
        setVisibleItems(1); // xs screens
      } else {
        setVisibleItems(1); // mobile screens (320px+)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offerItems.length);
  }, [offerItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offerItems.length) % offerItems.length);
  }, [offerItems.length]);

  useEffect(() => {
    if (offerItems.length > visibleItems && !isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, offerItems.length, visibleItems, isHovered]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % offerItems.length;
      items.push(offerItems[index]);
    }
    return items;
  };
  if (offerItems.length === 0) return null;

  return (
    <motion.div 
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto my-2 min-[320px]:mt-12 xs:my-4 sm:my-6 md:my-8 lg:my-6 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header mejorado con efectos visuales */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-sky-500 to-sky-700 text-white p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 rounded-t-xl sm:rounded-t-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Efectos de partículas sutiles - ocultos en móvil */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-white/15 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 -right-2 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 right-1/4 w-3 h-3 bg-white/25 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
            <div className="flex items-center mb-2 lg:mb-0">
              <motion.div 
                className="bg-white/20 p-2 sm:p-3 rounded-full mr-2 sm:mr-4 animate-pulse"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              >
                <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-300" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-sm sm:text-lg md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl font-black mb-0.5 sm:mb-1 flex flex-col sm:flex-row sm:items-center">
                  <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                    OFERTAS ESPECIALES
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold text-sky-100">
                  ¡Descubre las mejores oportunidades del mercado!
                </p>
              </div>
            </div>
            
            {/* Badge de calidad - oculto en móvil */}
            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1.5 sm:p-2 md:p-3 lg:p-2 border border-white/30 hidden sm:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center mb-0.5 sm:mb-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-yellow-300" />
                <span className="text-xs sm:text-xs md:text-sm font-bold text-yellow-300">CALIDAD GARANTIZADA</span>
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl font-bold text-white">
                +1000 productos
              </div>
            </motion.div>
          </div>
          
          {/* Badges de beneficios */}
          <motion.div 
            className="flex flex-wrap gap-1 sm:gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {[
              { icon: ShoppingCart, text: "Envíos a todo el país", color: "bg-violet-500/80" },
              { icon: Zap, text: "Ofertas Relámpago", color: "bg-red-400" },
              { icon: Tag, text: "Hasta 50% OFF", color: "bg-pink-500/80" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${badge.color} px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded-sm text-xs sm:text-xs md:text-sm font-semibold`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <badge.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1.5 md:mr-2" />
                <span className="hidden xs:inline">{badge.text}</span>
                <span className="xs:hidden">
                  {badge.text === "Envíos a todo el país" ? "Envíos" :
                   badge.text === "Ofertas Relámpago" ? "Ofertas" :
                   "50% OFF"}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Contenedor del carrusel con gradiente debajo */}
      <motion.div 
        className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-0.5 xs:p-1 sm:p-1.5 md:p-2 lg:p-3 xl:p-4 rounded-b-xl sm:rounded-b-2xl shadow-2xl border-t-2 sm:border-t-4 border-sky-400 items-center justify-center flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="overflow-visible rounded-xl">
          <div className="flex transition-transform duration-700 ease-in-out">
            {getVisibleItems().map((item: ObjectType, index: number) => (
              <div 
                key={`${item._id || index}-${index}`} 
                className={`flex-shrink-0 ${
                  visibleItems === 1 ? 'w-full px-1 py-1' : 
                  visibleItems === 2 ? 'w-1/2 px-1 sm:px-2 py-1 sm:py-2' : 
                  visibleItems === 3 ? 'w-1/3 px-1 sm:px-2 md:px-3 py-1 sm:py-2' : 
                  visibleItems === 4 ? 'w-1/4 px-1 sm:px-2 md:px-3 py-1 sm:py-2' : 
                  visibleItems === 5 ? 'w-1/5 px-1 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-2' :
                  'w-1/6 px-1 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-2'
                }`}
              >
                <div className="relative rounded-xl">
                  <UserCard
                    _id={item._id || `offer-${index}`}
                    marca={item.data?.items[0]?.marca || ''}
                    name={item.data?.items[0]?.name || ''}
                    photo={item.data?.items[0]?.photo}
                    price={item.data?.items[0]?.price}
                    summary={item.data?.items[0]?.summary || ''}
                    description={item.data?.items[0]?.description || ''}
                    specsTecs={item.data?.items[0]?.specsTecs}
                    wholesalePrice={item.data?.items[0]?.wholesalePrice}
                    quantity={item.data?.items[0]?.quantity}
                    offer={item.offer || false}
                    models={item.data?.items[0]?.models}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botones de navegación mejorados */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-1 xs:left-2 sm:left-3 md:left-4 lg:left-5 xl:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 xs:p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 border-2 border-sky-200"
          aria-label="Anterior"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-600" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-1 xs:right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 xs:p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 border-2 border-sky-200"
          aria-label="Siguiente"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-600" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OfferCarousel;