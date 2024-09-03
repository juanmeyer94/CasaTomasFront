import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";
import coloursIndex from "../../../public/colours/coloursIndex.json";
import Swal from "sweetalert2";

const coloursMap = coloursIndex.reduce((acc, colour) => {
  acc[colour.name] = colour;
  return acc;
}, {} as Record<string, { path: string }>);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ObjectType | null>(null);
  const { FilteredObjects, addToCart } = useUserContext();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [modelQuantities] = useState<Record<string, number>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const producto = FilteredObjects.find((item) => item._id === id);
    setProduct(producto || null);
  }, [id, FilteredObjects]);

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás
  };

  // loading
  if (!product) {
    return (
      <div className="flex rounded-xl items-center justify-center flex-col p-8 font-bold text-2xl">
        <h1>Cargando...</h1>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="gray"
            stroke-width="5"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="blue"
            stroke-width="5"
            stroke-dasharray="126"
            stroke-dashoffset="0"
            fill="none"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;126"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <p>Casa Tomas - 100 años cosiendo juntos.</p>
      </div>
    );
  }

  const colours = product.data?.items?.[0]?.colours || [];
  const models = product.data?.items?.[0]?.models || [];
  const photos = product.data?.items?.[0]?.photo || [];
  const hasColours = colours.length > 0;
  const hasModels = models.length > 0;

  const productColours = colours
    .map((colourName) => {
      const colour = coloursMap[colourName];
      return colour ? { name: colourName, path: colour.path } : null;
    })
    .filter((colour) => colour !== null);

  const handleDecrease = (name: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [name]: Math.max((prevQuantities[name] || 0) - 1, 0),
    }));
  };

  const handleIncrease = (name: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [name]: (prevQuantities[name] || 0) + 1,
    }));
  };

  const handleModelDecrease = (model: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [model]: Math.max((prevQuantities[model] || 0) - 1, 0),
    }));
  };

  const handleModelIncrease = (model: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [model]: (prevQuantities[model] || 0) + 1,
    }));
  };

  const handleAddToCart = () => {
    const selectedItems = Object.entries(quantities).filter(
      ([_, qty]) => qty > 0
    );
    const selectedModels = Object.entries(modelQuantities).filter(
      ([_, qty]) => qty > 0
    );

    if (selectedItems.length > 0 || selectedModels.length > 0) {
      const productToAdd = {
        ...product.data,
        quantities,
        models: modelQuantities, // Add the model quantities here
      };
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartToPush = {
        id: productToAdd._id,
        quantities: productToAdd.quantities,
        models: productToAdd.models,
      };
      addToCart(cartToPush);
      cart.push(cartToPush);
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        icon: "success",
        title: "El producto fue añadido correctamente",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Selecciona una cantidad",
        text: "Debes seleccionar al menos una cantidad antes de añadir al carrito",
      });
    }
  };

  const handleNextImage = () => {
    if (photos.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }
  };

  const handlePrevImage = () => {
    if (photos.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="w-full h-38 sm:h-38 bg-cover bg-center -mb-2 rounded-full"
        style={{ backgroundImage: "url('/articulos-merceria-destcada.jpg')" }}
      >
        <h1 className="text-3xl font-bold text-white p-8">PRODUCTOS</h1>
        <h2 className="font-bold text-white -mt-8 p-8">
          {product.section} / {product.subsection}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row 2xl:px-44 xl:px-38 lg:px-30 md:px-26 sm:px-12 mt-4">
        <div className="md:w-1/2 w-full p-4">
          <div className="relative">
            <img
              src={photos[currentImageIndex]}
              alt="Product"
              className="w-full h-[350px] 2xl:h-[500px] mb-4"
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Thumbnail ${index}`}
                className="w-full cursor-pointer border-2 border-gray-200 h-[120px] xl:h-[140px] 2xl:h-[170px]"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full p-4">
          <h2 className="text-2xl font-bold mb-4">
            {product.data.items[0].marca
              ? product.data.items[0].marca + " " + product.data.items[0].name
              : product.data.items[0].name}
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Precio:</h3>
            <p className="text-base">
              ${product.data.items[0].price}
            </p>
          </div>
          <p className="mb-4">
            <span className="font-semibold">
              Descripción General: {product.data.items[0].description}
            </span>
          </p>

          {hasColours && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">
                Variedad de colores
              </h3>
              <p className="mb-2 text-xs">*Los colores son orientativos.</p>
              <div className="grid grid-cols-2 gap-4">
                {productColours.map((colour, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <p>{colour?.name}</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={colour?.path}
                        alt={colour?.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrease(colour.name)}
                            className="bg-gray-200 px-1.5 rounded"
                          >
                            -
                          </button>
                          <span>{quantities[colour.name] || 0}</span>
                          <button
                            onClick={() => handleIncrease(colour.name)}
                            className="bg-gray-200 px-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasModels && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">
                Modelos Disponibles
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {models.map((model, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <p>{model}</p>
                    <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleModelDecrease(model)}
                          className="bg-gray-200 px-1.5 rounded"
                        >
                          -
                        </button>
                        <span>{quantities[model] || 0}</span>
                        <button
                          onClick={() => handleModelIncrease(model)}
                          className="bg-gray-200 px-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Agregar al carrito
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded ml-4"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
