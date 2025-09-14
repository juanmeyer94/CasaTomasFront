import React, { useState, useEffect, useCallback } from "react";
import UserCard from "../Card/userCard";
import { ChevronLeft, ChevronRight, Tag, Clock, Zap, Star} from "lucide-react";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";

interface ExitOfferCarouselProps {
  isModal?: boolean;
}

const ExitOfferCarousel: React.FC<ExitOfferCarouselProps> = ({ isModal = false }) => {
  // Detectar si estamos en un modal basado en el contexto
  const isInModal = isModal || (typeof window !== 'undefined' && window.innerHeight < 800);
  const { AllObjects } = useUserContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('sm');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 horas en segundos
  const [isHovered, setIsHovered] = useState(false);
  const offerItems = AllObjects.filter((item: ObjectType) => item.offer === true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('sm');
      } else if (width < 768) {
        setScreenSize('md');
      } else if (width < 1024) {
        setScreenSize('lg');
      } else if (width < 1280) {
        setScreenSize('xl');
      } else {
        setScreenSize('2xl');
      }
    };

    handleResize(); // Establecer tamaño inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Contador regresivo para crear urgencia
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 24 * 60 * 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === offerItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [offerItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? offerItems.length - 1 : prevIndex - 1
    );
  }, [offerItems.length]);

  // Función para obtener la cantidad de items visibles según el tamaño de pantalla
  const getVisibleItems = () => {
    switch (screenSize) {
      case 'sm': return 1;
      case 'md': return 2;
      case 'lg': return 3;
      case 'xl': return 4;
      case '2xl': return 5;
      default: return 1;
    }
  };

  const visibleItems = getVisibleItems();

  useEffect(() => {
    if(offerItems.length > visibleItems && !isHovered){
      const interval = setInterval(nextSlide, 4000); // Auto-scroll every 4 seconds
      return () => clearInterval(interval);
    }
  }, [nextSlide, isHovered, visibleItems]);

  if (offerItems.length === 0) return null;

  return (
    <div className={`w-full mx-auto px-2 sm:px-4 lg:px-6 relative ${isInModal ? 'my-0' : 'my-4 sm:my-6 md:my-8'}`}>
      {/* Header con efectos visuales y urgencia */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl shadow-2xl ${
        isInModal 
          ? 'p-1 sm:p-1.5 md:p-2 lg:p-3' 
          : 'p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6'
      }`}>
        {/* Efecto de partículas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-2 sm:-right-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white/25 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative z-10">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between ${
            isInModal ? 'mb-1 sm:mb-2' : 'mb-2 sm:mb-3 md:mb-4'
          }`}>
            <div className="flex items-center mb-1 md:mb-0">
              <div className={`bg-white/20 rounded-full mr-1 sm:mr-1.5 md:mr-2 lg:mr-3 animate-pulse ${
                isInModal ? 'p-0.5 sm:p-1 md:p-1.5' : 'p-1 sm:p-1.5 md:p-2 lg:p-3'
              }`}>
                <Zap className={`text-yellow-300 ${
                  isInModal ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4' : 'w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className={`font-black bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent leading-tight ${
                  isInModal 
                    ? 'text-sm sm:text-base md:text-lg lg:text-xl mb-0' 
                    : 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-0.5 sm:mb-1 md:mb-2'
                }`}>
                  ¡OFERTAS RELÁMPAGO!
                </h2>
                <p className={`text-yellow-100 font-semibold leading-tight ${
                  isInModal 
                    ? 'text-xs hidden md:block' 
                    : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl hidden sm:block'
                }`}>
                  No te vayas sin aprovechar estas increíbles oportunidades
                </p>
              </div>
            </div>
            
            {/* Contador regresivo */}
            <div className={`bg-black/30 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl border border-white/20 self-center md:self-auto ${
              isInModal 
                ? 'p-1 sm:p-1.5 md:p-2' 
                : 'p-1.5 sm:p-2 md:p-3 lg:p-4'
            }`}>
              <div className={`flex items-center justify-center md:justify-start ${
                isInModal ? 'mb-0.5' : 'mb-0.5 sm:mb-1 md:mb-2'
              }`}>
                <Clock className={`text-yellow-300 animate-pulse ${
                  isInModal 
                    ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 mr-0.5 sm:mr-1' 
                    : 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-1.5 md:mr-2'
                }`} />
                <span className={`font-bold text-yellow-300 ${
                  isInModal 
                    ? 'text-xs' 
                    : 'text-xs sm:text-sm'
                }`}>OFERTA TERMINA EN:</span>
              </div>
              <div className={`text-center font-mono font-bold text-white ${
                isInModal 
                  ? 'text-xs sm:text-sm md:text-base' 
                  : 'text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          {/* Badges de beneficios */}
          <div className={`flex flex-wrap ${
            isInModal ? 'gap-0.5 sm:gap-1' : 'gap-1 sm:gap-1.5 md:gap-2 lg:gap-3'
          }`}>
            <div className={`flex items-center bg-green-500/80 rounded-full font-bold ${
              isInModal 
                ? 'px-1 py-0.5 text-xs' 
                : 'px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 text-xs sm:text-sm'
            }`}>
              <Star className={`mr-0.5 ${
                isInModal 
                  ? 'w-1.5 h-1.5 sm:w-2 sm:h-2' 
                  : 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 sm:mr-1'
              }`} />
              Calidad Premium
            </div>
          
            <div className={`flex items-center bg-orange-500/80 rounded-full font-bold ${
              isInModal 
                ? 'px-1 py-0.5 text-xs' 
                : 'px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 text-xs sm:text-sm'
            }`}>
              <Tag className={`mr-0.5 ${
                isInModal 
                  ? 'w-1.5 h-1.5 sm:w-2 sm:h-2' 
                  : 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 sm:mr-1'
              }`} />
              Hasta 50% OFF
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenedor del carrusel con efectos mejorados */}
      <div 
        className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl shadow-2xl border-t-4 border-purple-500 ${
          isInModal 
            ? 'p-0.5 sm:p-1 md:p-1.5 lg:p-2' 
            : 'p-1.5 sm:p-2.5 md:p-4 lg:p-5 xl:p-6 2xl:p-8'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-lg sm:rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-1.5 sm:gap-2 md:gap-3 lg:gap-4"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {offerItems.map((item: ObjectType) => (
              <div 
                key={item._id} 
                className={`flex-shrink-0 transform transition-all duration-300 hover:scale-105 ${
                  isInModal ? (
                    screenSize === 'sm' ? 'w-full px-0 py-0.5 pb-1' :
                    screenSize === 'md' ? 'w-1/2 px-0.5 py-1 pb-1.5' :
                    screenSize === 'lg' ? 'w-1/3 px-0.5 py-1.5 pb-2' :
                    screenSize === 'xl' ? 'w-1/4 px-1 py-2 pb-2.5' :
                    'w-1/5 px-1 py-2.5 pb-3'
                  ) : (
                    screenSize === 'sm' ? 'w-full px-0.5 py-2 pb-4' :
                    screenSize === 'md' ? 'w-1/2 px-1 py-3 pb-6' :
                    screenSize === 'lg' ? 'w-1/3 px-1.5 py-4 pb-8' :
                    screenSize === 'xl' ? 'w-1/4 px-2 py-6 pb-10' :
                    'w-1/5 px-2 py-8 pb-12'
                  )
                }`}
              >
                <div className="relative group">
                  {/* Efecto de brillo en hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-300 "></div>
                  
                  <div className="relative bg-transparent rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <UserCard
                      _id={item._id}
                      marca={item.data.items[0].marca}
                      name={item.data.items[0].name}
                      photo={item.data.items[0].photo}
                      price={item.data.items[0].price}
                      summary={item.data.items[0].summary}
                      description={item.data.items[0].description}
                      specsTecs={item.data.items[0].specsTecs}
                      wholesalePrice={item.data.items[0].wholesalePrice}
                      quantity={item.data.items[0].quantity}
                      offer={item.offer}
                      models={item.data.items[0].models}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botones de navegación mejorados */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-2 md:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full shadow-lg sm:shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 border border-purple-200 sm:border-2"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-2 md:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full shadow-lg sm:shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 border border-purple-200 sm:border-2"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-600" />
        </button>
        
        {/* Indicadores de progreso */}
        <div className="flex justify-center mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 space-x-1 sm:space-x-1.5 md:space-x-2">
          {Array.from({ length: Math.ceil(offerItems.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-600 scale-125' 
                  : 'bg-gray-300 hover:bg-purple-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExitOfferCarousel;