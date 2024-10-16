import React, { useState, useEffect, useCallback } from "react";
import UserCard from "../Card/userCard";
import { ChevronLeft, ChevronRight, Tag, Clock } from "lucide-react";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";

const OfferCarousel: React.FC = () => {
  const { AllObjects} = useUserContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const offerItems = AllObjects.filter((item: ObjectType) => item.offer === true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1736) {
        setVisibleItems(4); // 2xl
      } else if (window.innerWidth >= 1500) {
        setVisibleItems(4); // xl
      } else if (window.innerWidth >= 1280) {
        setVisibleItems(3); // lg
      } else if (window.innerWidth >= 1024) {
        setVisibleItems(2); // md
      } else {
        setVisibleItems(1); // sm
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
    if (offerItems.length > visibleItems) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, offerItems.length, visibleItems]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % offerItems.length;
      items.push(offerItems[index]);
    }
    return items;
  };
  return (
    <div className="w-full mx-auto my-8 px-4 min-[320px]:px-0 sm:px-2">
      <div className="bg-gradient-to-r from-sky-400 to-sky-700 text-white p-4 rounded-t-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Tag className="mr-2" />
          Ofertas Especiales
        </h2>
        <p className="text-lg">¡No te pierdas estas increíbles oportunidades!</p>
      </div>
      
      <div className="relative flex justify-center items-center  bg-gray-100 p-4 md:p-6 rounded-b-lg shadow-lg">
        <div className="overflow-hidden">
          {AllObjects.length === 0 ? "Cargando" : <div className="flex transition-transform duration-500 ease-in-out"
          >
            {getVisibleItems().map((item: ObjectType, index: number) => (
              <div 
                key={`${item._id || index}-${index}`} 
                className={`flex-shrink-0 w-full px-2 sm:w-full md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 min-[320px]:px-0 sm:px-2`}
              >
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
                />
              </div>
            ))}
          </div>}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700 flex items-center justify-center">
          <Clock className="mr-2" />
          ¡Ofertas por tiempo limitado!
        </p>
        <p className="text-sm text-gray-600">
          Aprovecha ahora antes de que se agoten
        </p>
      </div>
    </div>
  );
};

export default OfferCarousel;