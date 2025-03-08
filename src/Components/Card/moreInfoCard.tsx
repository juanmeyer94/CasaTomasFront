import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import useUserContext from "../../Utils/contextUserHook";
import coloursIndex from "../../../public/colours/coloursIndex.json";
import Swal from "sweetalert2";
import {
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import MoreOfferCarousel from "../carrousel/MoreOfferCarrousel";

const coloursMap = coloursIndex.reduce((acc, colour) => {
  acc[colour.name] = colour;
  return acc;
}, {} as Record<string, { path: string }>);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ObjectType | null>(null);
  const { FilteredObjects, addToCart } = useUserContext();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [modelQuantities, setModelQuantities] = useState<
    Record<string, number>
  >({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const producto = FilteredObjects.find((item) => item._id === id);
    setProduct(producto || null);
    setQuantities({});
    setModelQuantities({});
  }, [id, FilteredObjects]);

  const totalQuantity = useMemo(() => {
    const colorTotal = Object.values(quantities).reduce(
      (sum, current) => sum + current,
      0
    );
    const modelTotal = Object.values(modelQuantities).reduce(
      (sum, current) => sum + current,
      0
    );
    return colorTotal + modelTotal;
  }, [quantities, modelQuantities]);

  const isWholesaleApplicable = useMemo(() => {
    if (
      !product ||
      product.data.items[0].quantity === "0" ||
      product.data.items[0].wholesalePrice === "0"
    )
      return false;
    const minQuantity = parseInt(product.data.items[0].quantity.split(" ")[0]);
    return totalQuantity >= minQuantity;
  }, [product, totalQuantity]);

  const discountAmount = useMemo(() => {
    if (!product || !isWholesaleApplicable) return 0;
    const regularPrice = parseFloat(product.data.items[0].price);
    const wholesalePrice =
      parseFloat(product.data.items[0].wholesalePrice) /
      parseInt(product.data.items[0].quantity.split(" ")[0]);
    return (regularPrice - wholesalePrice) * totalQuantity;
  }, [product, isWholesaleApplicable, totalQuantity]);

  useEffect(() => {
    if (isWholesaleApplicable) {
      Swal.fire({
        icon: "info",
        title: "¡Descuento por mayor aplicado!",
        text: `Has alcanzado la cantidad mínima para el descuento por mayor. Ahorrarás ${formatPrice(
          discountAmount
        )}.`,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }, [isWholesaleApplicable, discountAmount]);

  if (!product) {
    return (
      <div className="flex rounded-xl items-center justify-center flex-col p-8 font-bold text-2xl">
        <h1>Cargando...</h1>
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
    if (totalQuantity > 0) {
      const productToAdd = {
        ...product.data,
        quantities,
        modelQuantities,
      };
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartToPush = {
        id: productToAdd._id,
        quantities: productToAdd.quantities,
        models: productToAdd.modelQuantities,
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

  const handleImageChange = (direction: number) => {
    if (photos.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + direction + photos.length) % photos.length
      );
    }
  };

  const formatDescription = (description: string): JSX.Element[] => {
    const parts = description.split(/\/{1,2}/);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const formatPrice = (price: any): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    const productInfo = `Información del Producto: Nombre: ${
      product.data.items[0].name
    }, Marca: ${product.data.items[0].marca || "No disponible"}, Precio: $${
      product.data.items[0].price
    }, Descripción: ${product.data.items[0].description}, Enlace: ${
      window.location.href
    }`;
    return productInfo.replace(/\s/g, "%20");
  };

  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName: string
  ) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemName]: value,
      }));
    }
  };

  return (
    <div>
      <div
        className="w-auto h-38 sm:h-38 bg-center"
        style={{ backgroundImage: "url('/articulos-merceria-destcada.jpg')" }}
      >
        <h1 className="text-3xl font-bold text-white p-8">PRODUCTOS</h1>
        <h2 className="font-bold text-white -mt-8 p-8">
          {product.section} / {product.subsection}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto p-4 font-sans">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={photos[currentImageIndex]}
                    alt="Producto"
                    className="w-full h-[542px] object-center"
                  />
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageChange(-1)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleImageChange(1)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Miniatura ${index}`}
                      className="w-full h-32 object-center cursor-pointer rounded-md border-2 border-gray-200 hover:border-blue-500 transition duration-300"
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.data.items[0].marca
                    ? `${product.data.items[0].marca} ${product.data.items[0].name}`
                    : product.data.items[0].name}
                </h1>
                {product.data.items[0].code && (
                  <div className={`inline-flex items-center -mt-2 mb-2`}>
                    <span
                      className={`
                  
                  text-black text-xs  
                
                `}
                    >
                      Código: {product.data.items[0].code}
                    </span>
                  </div>
                )}
                {product.data.items[0].wholesalePrice !== "0" && (
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-100 p-4 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold text-yellow-800 mb-2">
                      ¡OFERTA COMPRANDO {product.data.items[0].quantity} O MAS!
                    </h2>

                    <p className="text-lg text-yellow-900">
                      Comprando {product.data.items[0].quantity} o más, ¡ahorrás{" "}
                      <span className="font-bold text-green-700">
                        {" "}
                        {formatPrice(
                          (parseFloat(product.data.items[0].price) -
                            parseFloat(product.data.items[0].wholesalePrice) /
                              parseInt(
                                product.data.items[0].quantity.split(" ")[0]
                              )) *
                            parseInt(
                              product.data.items[0].quantity.split(" ")[0]
                            )
                        )}{" "}
                      </span>
                      o más !{" "}
                    </p>

                    {isWholesaleApplicable && (
                      <p className="text-lg font-bold text-green-700 mt-2">
                        ¡Descuento aplicado de{" "}
                        <span className="font-bold text-green-700">
                          {" "}
                          {formatPrice(discountAmount)}{" "}
                        </span>
                        , y podes seguir sumando!
                      </p>
                    )}
                    <p className="text-xs">
                      *Las ofertas son válidas únicamente comprando por este
                      medio.
                    </p>
                  </div>
                )}
               
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Precio por unidad
                    </p>
                    <p className="text-3xl font-semibold text-blue-600">
                      {formatPrice(product.data.items[0].price)}
                    </p>
                  </div>
                  {product.data.items[0].wholesalePrice !== "0" && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Precio por mayor ({product.data.items[0].quantity}+)
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {formatPrice(
                          parseFloat(product.data.items[0].wholesalePrice) /
                            parseInt(
                              product.data.items[0].quantity.split(" ")[0]
                            )
                        )}
                        /u
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-4 text-xl font-semibold">
                  {formatDescription(product.data.items[0].description)}
                </p>

                {hasColours && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Variedad de colores
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {productColours.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 w-full bg-gray-100 p-2 rounded-lg"
                        >
                          <img
                            src={item.path}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded-full border-2 border-white"
                          />
                          <span className="text-sm font-medium flex-grow">
                            {item.name}
                          </span>
                          <div className="flex items-center border rounded bg-white">
                            <button
                              onClick={() => handleDecrease(item.name)}
                              className="px-2 py-1 hover:bg-gray-100 transition duration-300"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={quantities[item.name] || 0}
                              onChange={(e) => handleLabelChange(e, item.name)}
                              className="w-12 text-center border-none outline-none appearance-none"
                            />
                            <button
                              onClick={() => handleIncrease(item.name)}
                              className="px-2 py-1 hover:bg-gray-100 transition duration-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hasModels && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Modelos Disponibles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {models.map((model: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 w-full bg-gray-100 p-2 rounded-lg"
                        >
                          <span className="text-sm font-medium flex-grow">
                            {model}
                          </span>
                          <div className="flex items-center border rounded bg-white">
                            <button
                              onClick={() => handleModelDecrease(model)}
                              className="px-2 py-1 hover:bg-gray-100 transition duration-300"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-medium">
                              <span>{quantities[model] || 0}</span>
                            </span>
                            <button
                              onClick={() => handleModelIncrease(model)}
                              className="px-2 py-1 hover:bg-gray-100 transition duration-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex flex-col items-center justify-center bg-blue-600 text-white py-3 px-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      <ShoppingCart className="w-6 h-6 mb-1" />
                      <span className="text-sm">Agregar al carrito</span>
                    </button>
                    <a
                      href={`https://wa.me/5493492279892?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center bg-green-500 text-white py-3 px-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      <Heart className="w-6 h-6 mb-1" />
                      <span className="text-sm">¡Consulta por WhatsApp!</span>
                    </a>
                  </div>

                  <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Volver atrás
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center bg-blue-50 p-3 rounded-lg">
                      <CreditCard className="text-blue-600 w-8 h-8 mb-2" />
                      <p className="font-semibold text-blue-600 text-center text-sm">
                        ¡PAGÁ EN CUOTAS!
                      </p>
                      <p className="text-xs text-gray-600 text-center">
                        Aceptamos todas las tarjetas
                      </p>
                    </div>
                    <div className="flex flex-col items-center bg-green-50 p-3 rounded-lg">
                      <Truck className="text-green-600 w-8 h-8 mb-2" />
                      <p className="font-semibold text-green-600 text-center text-sm">
                        ENVÍO A TODO EL PAÍS
                      </p>
                      <p className="text-xs text-gray-600 text-center">
                        De forma rápida y segura
                      </p>
                    </div>
                    <div className="flex flex-col items-center bg-yellow-50 p-3 rounded-lg">
                      <Shield className="text-yellow-600 w-8 h-8 mb-2" />
                      <p className="font-semibold text-yellow-600 text-center text-sm">
                        TU COMPRA ES SEGURA
                      </p>
                      <p className="text-xs text-gray-600 text-center">
                        100 años de trayectoria nos avalan
                      </p>
                    </div>
                    <div className="flex flex-col items-center bg-purple-50 p-3 rounded-lg">
                      <ShoppingCart className="text-purple-600 w-8 h-8 mb-2" />
                      <p className="font-semibold text-purple-600 text-center text-sm">
                        CALIDAD GARANTIZADA
                      </p>
                      <p className="text-xs text-gray-600 text-center">
                        En todos nuestros productos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MoreOfferCarousel subsection={product.subsection} />
        </div>
      </div>
    </div>
  );
}
