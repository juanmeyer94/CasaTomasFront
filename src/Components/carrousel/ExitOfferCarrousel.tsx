import React, { useState, useEffect, useCallback } from "react";
import UserCard from "../Card/userCard";
import { ChevronLeft, ChevronRight, Tag} from "lucide-react";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";

const ExitOfferCarousel: React.FC = () => {
  const { AllObjects } = useUserContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const offerItems = AllObjects.filter((item: ObjectType) => item.offer === true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    if(offerItems.length > 4){
      const interval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
    }
  }, [nextSlide]);

  const visibleItems = isLargeScreen ? 4 : 1;

  return (
    <div className="w-full mx-auto my-8 px-4 ">
      <div className="bg-gradient-to-r from-sky-400 to-sky-700 text-white p-4 rounded-t-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Tag className="mr-2" />
          No te vayas sin ver nuestras mejores ofertas!
        </h2>
        <p className="text-lg">¡Increíbles oportunidades!</p>
      </div>
      
      <div className="relative bg-gray-100 p-6 rounded-b-lg shadow-lg">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {offerItems.map((item: ObjectType) => (
              <div key={item._id} className={`flex-shrink-0 w-full ${isLargeScreen ? 'md:w-1/4' : ''} p-2`}>
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
                />
              </div>
            ))}
          </div>
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
    </div>
  );
};

export default ExitOfferCarousel;