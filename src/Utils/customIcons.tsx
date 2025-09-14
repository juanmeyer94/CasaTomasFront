import React from "react";

// Componente para iconos personalizados que pueden ser imágenes o iconos de Lucide
interface CustomIconProps {
  icon?: React.ComponentType<{ className?: string }>;
  imageSrc?: string;
  alt?: string;
  className?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({ 
  icon: Icon, 
  imageSrc, 
  alt = "Icon", 
  className = "w-4 h-4" 
}) => {
  if (imageSrc) {
    return (
      <img 
        src={imageSrc} 
        alt={alt}
        className={`${className} object-contain`}
      />
    );
  }
  
  if (Icon) {
    return <Icon className={className} />;
  }
  
  return null;
};

// Iconos personalizados de la marca
export const BrandIcons = {
  // Logo principal para elementos importantes
  LOGO_MAIN: "/logo2025.png",
  // Logo móvil para elementos secundarios
  LOGO_MOBILE: "/logomobile2025.png",
  // Otros elementos de marca que podrías agregar
  LOGO_ICON: "/logoNavBarByJuliet.svg",
  // Iconos de productos
  MACHINE_ICON: "/maqdash.jpg",
  MERCERY_ICON: "/merceria.jpg",
  // Iconos de estado
  CART_ICON: "/carritologo.png",
  SEARCH_ICON: "/lupa.png",
} as const;

export default CustomIcon;
