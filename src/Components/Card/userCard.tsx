import type React from "react";
import { useState, useEffect, useRef } from "react";
import type { Item } from "../../Interfaces/interfacesIndex";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Info, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
  models,
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

  // Función para truncar el summary si es muy largo
  const truncateSummary = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

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
        <div className="rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-sky-300 w-full max-w-[270px] sm:max-w-[270px] md:max-w-[300px] lg:max-w-[330px] xl:max-w-[360px] 2xl:max-w-[390px] bg-white shadow-lg hover:shadow-2xl relative">
          {/* Shadow gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-transparent to-purple-100/20 rounded-xl pointer-events-none group-hover:from-sky-200/50 group-hover:to-purple-200/30 transition-all duration-300"></div>
          {/* Image Container - proporción optimizada para carrusel */}
          <div className="relative w-full pt-[70%] sm:pt-[75%] md:pt-[80%] lg:pt-[85%] z-10">
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
                    className="absolute top-1/2 left-1 sm:left-2 transform -translate-y-1/2 bg-black/40 hover:bg-white text-gray-800 rounded-full p-1 sm:p-1.5 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-1 sm:right-2 transform -translate-y-1/2 bg-black/40 hover:bg-white text-gray-800 rounded-full p-1 sm:p-1.5 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </>
              )}

              {/* Price Tag */}
              <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 font-semibold py-0.5 px-1 sm:px-1.5 rounded-sm text-xs shadow-lg">
                {formatPrice(price)}
              </div>

              {/* Offer Badge */}
              {offer && (
                <div className="absolute top-0 right-0 bg-red-600 text-white font-semibold py-0.5 px-1 sm:px-1.5 rounded-sm text-xs shadow-lg z-20">
                  ¡OFERTA!
                </div>
              )}

              {/* Wholesale Badge */}
              {wholesalePrice !== "0" && wholesalePrice && (
                <div className="absolute bottom-0 w-full bg-gradient-to-r from-red-600 to-red-500 py-0.5 sm:py-1 text-center shadow-lg">
                  <p className="text-xs text-white font-bold tracking-wide">
                    OFERTA POR CANTIDAD
                  </p>
                </div>
              )}
            </div>
            {colours && colours.length > 0 && (
              <div className="absolute bottom-0 left-1 sm:left-2 mb-6 sm:mb-4 md:mb-5 lg:mb-6 bg-white/90 text-white text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded-sm shadow-lg z-10">
               <span
                    className="text-xs font-bold bg-clip-text text-transparent"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4, #6366f1, #f59e42, #e11d48)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Variedad de colores
                  </span>
              </div>
            )}
             {models && models.length > 1 && (
              <div className="absolute bottom-0 left-1 sm:left-2 mb-6 sm:mb-4 md:mb-5 lg:mb-6 bg-white/90 text-white text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded-sm shadow-lg z-10">
               <span
                    className="text-xs font-bold bg-clip-text text-transparent"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4, #6366f1, #f59e42, #e11d48)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Variedad de modelos
                  </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 relative z-10">
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
            <h2 className="text-gray-800 font-bold text-xs sm:text-sm mb-1 sm:mb-1.5 md:mb-2 line-clamp-2 min-h-[1.25rem] sm:min-h-[1.5rem] md:min-h-[1.75rem] lg:min-h-[2rem] xl:min-h-[2.25rem]">
              {displayName}
            </h2>

            {/* Summary */}
            {summary && (
              <p className="text-gray-600 text-xs mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 line-clamp-1 flex-grow">
                {truncateSummary(summary, 40)}
              </p>
            )}

            {/* Action Button */}
            <div className="py-4 sm:py-2 md:py-3 lg:py-4">
            <button
              className="w-full mt-auto py-1 sm:py-1.5 md:py-2 absolute bottom-1.5 sm:bottom-2 md:bottom-3 lg:bottom-4 left-0 bg-sky-400 hover:bg-sky-700 text-white transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm"
              onClick={handleMoreInfo}
            >
              <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Más información</span>
              <span className="sm:hidden">Info</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
