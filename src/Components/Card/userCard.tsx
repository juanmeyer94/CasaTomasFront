import React, { useState, useEffect } from "react";
import { Item } from "../../Interfaces/interfacesIndex";
import { useNavigate } from "react-router-dom";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const UserCard: React.FC<Item> = ({
  photo,
  price,
  name,
  summary,
  marca,
  _id,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);

  const priceToNumber = Number(price);
  const formattedPrice = formatPrice(priceToNumber);
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

  // Apply both 'f_auto' and 'q_auto' parameters for Cloudinary
  const imageUrl = photo ? `${photo[currentImageIndex]}?f_auto&q_auto` : "";

  return (
    <div
      className={`${
        isLargeScreen
          ? "max-w-[280px] min-h-[300px] border-sky-200 border-4 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 my-4 border-dashed relative flex flex-col justify-between bg-white"
          : "max-w-[200px] min-h-[250px] border-sky-200 border-4 px-2 pt-1 pb-1 rounded-lg shadow-md transform hover:scale-105 transition duration-500 my-2 border-dashed relative flex flex-col justify-between bg-white"
      }`}
    >
      <div>
        <div className="min-h-[3rem] mb-2">
          <h1 className="mt-4 text-gray-800 text-xl font-bold cursor-pointer">
            {marca && name ? `${marca} ${name}` : <div>{marca}</div>}
          </h1>
        </div>
        <div className="relative">
          {photo && photo.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
              aria-label="Previous Image"
            >
              &lt;
            </button>
          )}
          <img
            className={`${
              isLargeScreen
                ? "rounded-xl h-[150px] w-full object-cover"
                : "rounded-lg h-[120px] w-full object-cover"
            }`}
            src={imageUrl}
            alt="Product"
          />
          {photo && photo.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
              aria-label="Next Image"
            >
              &gt;
            </button>
          )}
          <p className="absolute top-0 left-0 bg-yellow-300 text-gray-800 font-bold py-1 px-3 rounded-br-lg rounded-tl-lg text-xs">
            {price ? formattedPrice : "Consultar"}
          </p>
        </div>
        <div className="my-1 text-gray-800 font-semibold text-center">
          <p className="text-sm">{summary}</p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className={`${
            isLargeScreen
              ? "text-sm w-[80%] text-white bg-sky-600 py-2 my-4 rounded-xl shadow-lg"
              : "text-xs w-[70%] text-white bg-sky-600 py-1 my-2 rounded-lg shadow-md"
          }`}
          onClick={handleMoreInfo}
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default UserCard;
