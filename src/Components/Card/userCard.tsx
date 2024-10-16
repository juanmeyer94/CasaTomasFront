import React, { useState, useEffect, useRef } from "react";
import { Item } from "../../Interfaces/interfacesIndex";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserCard: React.FC<Item> = ({
  photo,
  price,
  name,
  summary,
  marca,
  _id,
  offer,
  wholesalePrice
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);
  const imageRef = useRef<HTMLImageElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: "200px" }
      );

      observer.observe(imageRef.current);

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }
  }, [currentImageIndex]);

  const handleMoreInfo = () => {
    navigate(`/moreInfo/${_id}`);
  };

  const handleNextImage = () => {
    if (photo && photo.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photo.length);
    }
  };

  const handlePrevImage = () => {
    if (photo && photo.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + photo.length) % photo.length
      );
    }
  };

  // Optimize image URL for Cloudinary
  const optimizeImageUrl = (url: string) => {
    const baseUrl = url.split('upload/')[0] + 'upload/';
    const imagePath = url.split('upload/')[1];
    return `${baseUrl}/${imagePath}`;
  };

  const imageUrl = photo ? optimizeImageUrl(photo[currentImageIndex]) : "";

  const formatPrice = (price:any): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`
        max-w-[270px] min-h-[300px] border-sky-200 border-4 px-4 pt-2 pb-1 rounded-xl shadow-lg 
        transform hover:scale-105 transition duration-500 my-4 border-dashed relative flex flex-col justify-between bg-white
        ${isLargeScreen ? "lg:max-w-[280px]" : "max-w-[200px] min-h-[250px]"}
      `}
    >
      {offer && (
        <div className="absolute top-0 right-0 bg-red-600 text-white font-bold py-1 px-3 rounded-bl-lg rounded-tr-lg text-xs z-10 animate-pulse">
          ¡OFERTA!
        </div>
      )}
      <div>
        <div className="min-h-[4rem] mb-2 xl:min-h-[5rem]">
          <h2 className="mt-4 text-gray-800 font-bold cursor-pointer lg:text-sm xl:text-lg 2xl:text-lg">
            {marca && name ? `${marca} ${name}` : marca}
          </h2>
        </div>
        <div className="relative aspect-w-1 aspect-h-1">
          {photo && photo.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10"
                aria-label="Next Image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          <img
            ref={imageRef}
            className="rounded-xl w-full h-[220px] object-cover"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Tiny placeholder
            data-src={imageUrl}
            alt={`${marca} ${name}`}
            loading="lazy"
          />
          {wholesalePrice !== "0" && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-center rounded-b-xl">
              <p className="text-xs lg:text-[10px] xl:text-xs text-white font-bold">OFERTA COMPRANDO EN CANTIDAD</p>
            </div>
          )}
          <p className="absolute top-0 left-0 bg-yellow-300 text-gray-800 font-bold py-1 px-3 rounded-br-lg rounded-tl-lg text-xs">
            {price ? `${formatPrice(price)}` : "Consultar"}
          </p>
        </div>
        <div className="my-1 text-gray-800 font-semibold text-center h-10">
          <p className="text-sm">{summary}</p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className={`
            text-white bg-sky-600 rounded-xl shadow-lg hover:bg-sky-700 transition duration-300
            ${isLargeScreen ? "text-sm w-[80%] py-2 my-4" : "text-xs w-[70%] py-1 my-2"}
          `}
          onClick={handleMoreInfo}
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default UserCard;