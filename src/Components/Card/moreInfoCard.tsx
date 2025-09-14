import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ObjectType } from "../../Interfaces/interfacesIndex";
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
  Tag,
  Info,
  ArrowLeft,
  Plus,
  Minus,
  Check,
  Palette,
  Layers,
} from "lucide-react";
import MoreOfferCarousel from "../carrousel/MoreOfferCarrousel";
import { Helmet } from "react-helmet-async";

// Crear mapa de colores para acceso rápido
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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  // Extraer datos del producto
  const colours = product.data?.items?.[0]?.colours || [];
  const models = product.data?.items?.[0]?.models || [];
  const photos = product.data?.items?.[0]?.photo || [];
  const hasColours = colours.length > 0;
  const hasModels = models.length > 0;
  const productName = product.data.items[0].name;
  const productBrand = product.data.items[0].marca;
  const productCode = product.data.items[0].code;
  const productDescription = product.data.items[0].description;
  const regularPrice = product.data.items[0].price;
  const wholesalePrice = product.data.items[0].wholesalePrice;
  const minQuantity = product.data.items[0].quantity;

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
    const productInfo = `¡Hola! Me interesa este producto:
  
  *${productBrand || ""} ${productName}*
  Código: ${productCode || "N/A"}
  Precio: ${formatPrice(regularPrice)}
  
  ¿Podrían darme más información?
  
  ${window.location.href}`;

    return encodeURIComponent(productInfo);
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productBrand ? `${productBrand} ${productName}` : productName,
    image: photos.map((photo) => photo),
    description: productDescription,
    sku: productCode || "",
    mpn: productCode || "",
    brand: {
      "@type": "Brand",
      name: productBrand || "Casa Tomas",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "ARS",
      price: regularPrice,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Casa Tomas",
        logo: "https://www.casatomas.com.ar/logo.png", // Reemplaza con la URL real de tu logo
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "100",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Cliente Casa Tomas",
      },
      datePublished: new Date().toISOString().split("T")[0],
      reviewBody: "Excelente producto, muy buena calidad y precio.",
    },
  };

  // Optimizar URL de imagen para mejor calidad
  const optimizeImageUrl = (url: string) => {
    if (!url) return "";
    const parts = url.split("upload/");
    if (parts.length !== 2) return url;

    const baseUrl = parts[0] + "upload/";
    const imagePath = parts[1];
    return `${baseUrl}q_100,f_auto,w_800/${imagePath}`;
  };

  return (
    <>
      {/* Schema.org markup para SEO y vista previa en WhatsApp */}
      <Helmet>
        <title>
          {productBrand
            ? `${productBrand} ${productName} - Casa Tomas`
            : `${productName} - Casa Tomas`}
        </title>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>

        {/* Meta tags para Open Graph (Facebook, WhatsApp) */}
        <meta
          property="og:title"
          content={
            productBrand ? `${productBrand} ${productName}` : productName
          }
        />
        <meta
          property="og:description"
          content={productDescription || "Producto de Casa Tomas"}
        />
        <meta property="og:image" content={photos[0] || ""} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta property="og:price:amount" content={regularPrice} />
        <meta property="og:price:currency" content="ARS" />
        <meta property="product:brand" content={productBrand || "Casa Tomas"} />
        <meta property="product:availability" content="in stock" />

        {/* Meta tags para Twitter */}
        <meta name="twitter:card" content="product" />
        <meta
          name="twitter:title"
          content={
            productBrand ? `${productBrand} ${productName}` : productName
          }
        />
        <meta
          name="twitter:description"
          content={productDescription || "Producto de Casa Tomas"}
        />
        <meta name="twitter:image" content={photos[0] || ""} />
      </Helmet>
      <div className="bg-gray-50 min-h-screen pb-8">
        {/* Cabecera con navegación */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-sky-700 transition-colors"
                aria-label="Volver atrás"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold leading-tight">
                  {productBrand
                    ? `${productBrand} ${productName}`
                    : productName}
                </h1>
                <p className="text-sm text-sky-100">
                  {product.section} / {product.subsection}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="bg-white shadow-sm rounded-xl overflow-hidden mt-4">
            {/* Galería de imágenes */}
            <div className="relative">
              {/* Imagen principal */}
              <div
                className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src={
                    optimizeImageUrl(photos[currentImageIndex]) ||
                    "/placeholder.svg"
                  }
                  alt={productName}
                  className="w-full h-full object-contain cursor-zoom-in"
                />

                {/* Indicador de posición */}
                {photos.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex
                            ? "bg-sky-600"
                            : "bg-gray-300"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        aria-label={`Ver imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Botones de navegación */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange(-1);
                      }}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange(1);
                      }}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas en horizontal para móvil */}
              {photos.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-2 scrollbar-hide">
                  {photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-sky-500 shadow-md"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="p-3 sm:p-4 md:p-5">
              {/* Código del producto */}
              {productCode && (
                <div className="flex items-center mb-2 text-gray-500">
                  <Tag className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Código: {productCode}</span>
                </div>
              )}

              {/* Nombre y marca */}
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                {productBrand ? `${productBrand} ${productName}` : productName}
              </h1>

              {/* Precios */}
              <div className="flex flex-wrap items-end gap-4 mb-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Precio unitario</p>
                  <p className="text-xl font-bold text-sky-600">
                    {formatPrice(regularPrice)}
                  </p>
                </div>

                {wholesalePrice !== "0" && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Precio mayorista ({minQuantity}+)
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {formatPrice(
                        Number.parseFloat(wholesalePrice) /
                          Number.parseInt(minQuantity.split(" ")[0])
                      )}
                      <span className="text-sm">/u</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Oferta por mayor */}
              {wholesalePrice !== "0" && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3.5 mb-4 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-400 rounded-full p-2 mt-0.5">
                      <Info className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-800 text-sm">
                        ¡OFERTA POR CANTIDAD!
                      </h3>
                      <p className="text-sm text-amber-900 mt-1">
                        Comprando {minQuantity} o más unidades, ahorras{" "}
                        <span className="font-bold text-green-700">
                          {formatPrice(
                            (Number.parseFloat(regularPrice) -
                              Number.parseFloat(wholesalePrice) /
                                Number.parseInt(minQuantity.split(" ")[0])) *
                              Number.parseInt(minQuantity.split(" ")[0])
                          )}
                        </span>
                      </p>

                      {isWholesaleApplicable && (
                        <div className="mt-2 bg-green-100 p-2 rounded-md border border-green-200">
                          <div className="flex items-center">
                            <Check className="w-4 h-4 text-green-600 mr-1.5" />
                            <p className="text-sm font-medium text-green-800">
                              ¡Descuento de {formatPrice(discountAmount)}{" "}
                              aplicado!
                            </p>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-amber-700 mt-2">
                        *Oferta válida solo en compras online
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Descripción */}
              <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {formatDescription(productDescription)}
                </p>
              </div>

              {/* Selección de colores */}
              {hasColours && (
                <div className="mb-5">
                  <div className="flex items-center mb-2.5">
                    <Palette className="w-3.5 h-3.5 text-gray-700 mr-2" />
                    <h2 className="text-sm font-semibold text-gray-700">
                      Colores disponibles
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {productColours.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 w-full bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                      >
                        <div className="relative w-8 h-8">
                          <img
                            src={item.path || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full border border-gray-200"
                          />
                          {quantities[item.name] > 0 && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <span className="text-sm font-medium flex-grow">
                          {item.name}
                        </span>

                        <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                          <button
                            onClick={() => handleDecrease(item.name)}
                            className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5 text-gray-600" />
                          </button>

                          <input
                            type="number"
                            value={quantities[item.name] || 0}
                            onChange={(e) => handleLabelChange(e, item.name)}
                            className="w-10 text-center border-x border-gray-100 py-1 text-sm"
                            min="0"
                            aria-label={`Cantidad de ${item.name}`}
                          />

                          <button
                            onClick={() => handleIncrease(item.name)}
                            className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selección de modelos */}
              {hasModels && (
                <div className="mb-5">
                  <div className="flex items-center mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-gray-700 mr-2" />
                    <h2 className="text-sm font-semibold text-gray-700">
                      Modelos disponibles
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {models.map((model: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 w-full bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                      >
                        <span className="text-sm font-medium flex-grow">
                          {model}
                        </span>

                        <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                          <button
                            onClick={() => handleModelDecrease(model)}
                            className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Disminuir cantidad de ${model}`}
                          >
                            <Minus className="w-3.5 h-3.5 text-gray-600" />
                          </button>

                          <span className="w-10 text-center border-x border-gray-100 py-1.5 text-sm">
                            <span>{quantities[model] || 0}</span>
                          </span>

                          <button
                            onClick={() => handleModelIncrease(model)}
                            className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Aumentar cantidad de ${model}`}
                          >
                            <Plus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen de cantidad */}
              {totalQuantity > 0 && (
                <div className="bg-sky-50 p-2.5 rounded-lg mb-4 border border-sky-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Total seleccionado:
                      </p>
                      <p className="text-lg font-bold text-sky-700">
                        {totalQuantity}{" "}
                        {totalQuantity === 1 ? "unidad" : "unidades"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        Subtotal:
                      </p>
                      <p className="text-lg font-bold text-sky-700">
                        {isWholesaleApplicable
                          ? formatPrice(
                              (Number.parseFloat(wholesalePrice) /
                                Number.parseInt(minQuantity.split(" ")[0])) *
                                totalQuantity
                            )
                          : formatPrice(
                              Number.parseFloat(regularPrice) * totalQuantity
                            )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Botones de acción */}
              <div className="space-y-2.5 mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-3.5 rounded-lg font-medium transition-colors text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar al carrito</span>
                  </button>

                  <a
                    href={`https://wa.me/5493492279892?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white py-2.5 px-3.5 rounded-lg font-medium transition-colors text-sm"
                  >
                    <img src="/whatsapp.png" className="w-6 h-6" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => navigate(-1)}
                  className="w-full flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-colors text-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a productos</span>
                </button>
              </div>
            </div>

            {/* Beneficios de compra */}
            <div className="px-3.5 pb-5 pt-2">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <CreditCard className="text-blue-600 w-6 h-6 mb-2" />
                  <p className="font-semibold text-blue-700 text-center text-xs">
                    PAGÁ EN CUOTAS
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    Aceptamos todas las tarjetas
                  </p>
                </div>

                <div className="flex flex-col items-center bg-green-50 p-3 rounded-lg border border-green-100">
                  <Truck className="text-green-600 w-6 h-6 mb-2" />
                  <p className="font-semibold text-green-700 text-center text-xs">
                    ENVÍO A TODO EL PAÍS
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    Rápido y seguro
                  </p>
                </div>

                <div className="flex flex-col items-center bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <Shield className="text-amber-600 w-6 h-6 mb-2" />
                  <p className="font-semibold text-amber-700 text-center text-xs">
                    COMPRA SEGURA
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    100 años de trayectoria
                  </p>
                </div>

                <div className="flex flex-col items-center bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <ShoppingCart className="text-purple-600 w-6 h-6 mb-2" />
                  <p className="font-semibold text-purple-700 text-center text-xs">
                    CALIDAD GARANTIZADA
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    En todos nuestros productos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">
              También te puede interesar
            </h2>
            <MoreOfferCarousel subsection={product.subsection} />
          </div>
        </div>

        {/* Modal de imagen ampliada */}
        {isImageModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={
                  optimizeImageUrl(photos[currentImageIndex]) ||
                  "/placeholder.svg"
                }
                alt={productName}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange(-1);
                    }}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange(1);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all"
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
