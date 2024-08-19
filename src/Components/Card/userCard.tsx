import React, {useState} from "react";
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
  const priceToNumber =Number(price)
  const formattedPrice = formatPrice(priceToNumber);
  const navigate = useNavigate();

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

  return (
    <div className="max-w-[280px] min-h-[300px] border-sky-200 border-4 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 my-4 border-dashed relative flex flex-col justify-between">
      <div>
        <div className="min-h-[3rem] mb-2">
          {" "}
          {/* Asegura que todos los títulos tengan el mismo espacio */}
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
            className="rounded-xl h-[150px] w-full object-cover"
            src={photo ? photo[currentImageIndex] : ""}
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
          className="text-sm w-[80%] text-white bg-sky-600 py-2 my-4 rounded-xl shadow-lg"
          onClick={handleMoreInfo}
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default UserCard;
