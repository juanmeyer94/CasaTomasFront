import React, { useState } from "react";
import { Item } from "../../../../Interfaces/interfacesIndex";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ArchiveBoxIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import useAdminContext from "../../../../Utils/contextAdminHook";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface AdminCardProps extends Item {
  handleRemoveImage?: (indice: number) => void; 
}

const AdminCard: React.FC<AdminCardProps> = ({
  photo,
  price,
  name,
  summary,
  marca,
  _id,
  isAuth,
  handleRemoveImage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const toNumberPrice = Number(price)
  const formattedPrice = formatPrice(toNumberPrice);
  const navigate = useNavigate();
  const { handleDeleteProduct } = useAdminContext();

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí llamarías a la función para eliminar el producto
        handleDeleteProduct(_id)
        Swal.fire("Eliminado!", "Tu producto ha sido eliminado.", "success");
      }
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${_id}`);
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

  const handleImageDelete = (index: number) => {
    if(handleRemoveImage){
      handleRemoveImage(index);
    setCurrentImageIndex((prevIndex) => {

      if (photo && photo.length === 1) {
        return 0; 
      }
      if (photo && index === prevIndex) {
        return (prevIndex + (prevIndex < photo.length - 1 ? 0 : -1)) % photo.length;
      }
      return prevIndex;
    });
    }
  };

  return (
    <div className="max-w-[280px] min-h-[300px] border-sky-200 border-4 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 my-4 border-dashed relative flex flex-col justify-between bg-white">
      {isAuth && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={handleDelete}
            aria-label="Eliminar"
            
          >
            <ArchiveBoxIcon className="w-6 h-6" />
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={handleEdit}
            aria-label="Editar"
          >
            <PencilSquareIcon className="w-6 h-6" />
          </button>
        </div>
      )}
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

        {photo && (
          <button
            onClick={() => handleImageDelete(currentImageIndex)}
            className="text-red-500 hover:text-red-700  text-xs"
            aria-label="Eliminar Imagen"
          >
            Eliminar Imagen Actual
          </button>
        )}

        <div className="my-1 text-gray-800 font-semibold text-center">
          <p className="text-sm">{summary}</p>
        </div>
      </div>
      <Link
        to={`/moreInfo/${_id}`}
        target={isAuth ? "_blank" : ""}
        className="w-full flex justify-center"
        rel="noopener noreferrer"
      >
        <button className="text-sm w-[80%] text-white bg-sky-600 py-2 my-4 rounded-xl shadow-lg">
          Más información
        </button>
      </Link>
    </div>
  );
};

export default AdminCard;

