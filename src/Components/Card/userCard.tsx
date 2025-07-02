import type React from "react";
import { useState, useEffect, useRef } from "react";
import type { Item } from "../../Interfaces/interfacesIndex";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Info, Tag } from "lucide-react";
import { Helmet } from "react-helmet";

const UserCard: React.FC<Item> = ({
  photo,
  price,
  name,
  summary,
  marca,
  _id,
  offer,
  wholesalePrice,
  code,
  colours,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  // Lazy loading for images
  useEffect(() => {
    if (imageRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || "";
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
    window.scrollTo(0, 0);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photo && photo.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photo.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photo && photo.length > 1) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + photo.length) % photo.length
      );
    }
  };

  // Modificar la función optimizeImageUrl para mejorar la calidad de las imágenes
  const optimizeImageUrl = (url: string) => {
    if (!url) return "";
    const parts = url.split("upload/");
    if (parts.length !== 2) return url;

    const baseUrl = parts[0] + "upload/";
    const imagePath = parts[1];
    // Usar mejor calidad y limitar el ancho a 600px para mantener buena calidad sin sobrecargar
    return `${baseUrl}q_100,f_auto,w_600/${imagePath}`;
  };

  const imageUrl =
    photo && photo.length > 0 ? optimizeImageUrl(photo[currentImageIndex]) : "";

  const formatPrice = (price: any): string => {
    if (!price) return "Consultar";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayName =
    marca && name ? `${marca} ${name}` : marca || name || "Producto";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: displayName,
    image: photo && photo.length > 0 ? photo[0] : "",
    description: summary || "",
    sku: code || "",
    brand: {
      "@type": "Brand",
      name: marca || "Casa Tomas",
    },
    offers: {
      "@type": "Offer",
      url: `${window.location.origin}/moreInfo/${_id}`,
      priceCurrency: "ARS",
      price: price ? Number.parseFloat(price).toString() : "",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Casa Tomas",
      },
    },
  };

  return (
    <>
      {/* Schema.org markup para SEO y vista previa en WhatsApp */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <div className="group w-full h-full">
        <div className="rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-sky-300">
          {/* Image Container - ajustar la proporción para que sea un poco más pequeña */}
          <div className="relative w-full pt-[90%]">
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                ref={imageRef}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                data-src={imageUrl || "/placeholder.svg"}
                alt={displayName}
                loading="lazy"
              />

              {/* Image Navigation */}
              {photo && photo.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Price Tag */}
              <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 font-bold py-1.5 px-3 rounded-br-lg">
                {formatPrice(price)}
              </div>

              {/* Offer Badge */}
              {offer && (
                <div className="absolute top-0 right-0 bg-red-600 text-white font-bold py-1.5 px-3 rounded-bl-lg z-10">
                  ¡OFERTA!
                </div>
              )}

              {/* Wholesale Badge */}
              {wholesalePrice !== "0" && wholesalePrice && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-500 py-1.5 text-center">
                  <p className="text-xs text-white font-bold tracking-wide">
                    OFERTA POR CANTIDAD
                  </p>
                </div>
              )}
            </div>
            {colours && colours.length > 0 && (
              <div className="absolute bottom-6 left-0 mb-2 ml-2 bg-gray-800 opacity-75 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow z-10">
               <span
                    className="text-sm font-bold bg-clip-text text-transparent"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4, #6366f1, #f59e42, #e11d48)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Variedad
                    de colores
                  </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-4">
            {/* Product Code */}
            {/* Product Code y Variedad de colores */}
            {(code || (colours && colours.length > 0)) && (
              <div className="flex items-center mb-1 gap-2 flex-wrap">
                {code && (
                  <div className="flex items-center">
                    <Tag className="w-3.5 h-3.5 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500">
                      Código: {code}
                    </span>
                  </div>
                )}
                {/* {colours && colours.length > 0 && (
                  <span
                    className="text-sm font-bold bg-clip-text text-transparent"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4, #6366f1, #f59e42, #e11d48)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Variedad de colores
                  </span>
                )} */}
              </div>
            )}

            {/* Product Name */}
            <h2 className="text-gray-800 font-bold text-sm sm:text-base mb-2 line-clamp-2">
              {displayName}
            </h2>

            {/* Summary */}
            {summary && (
              <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">
                {summary}
              </p>
            )}

            {/* Action Button */}
            <button
              className="w-full mt-auto py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
              onClick={handleMoreInfo}
            >
              <Info className="w-4 h-4" />
              <span>Más información</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
