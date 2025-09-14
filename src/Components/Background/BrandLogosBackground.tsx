import React from "react";
import { motion } from "framer-motion";

// Logos de marcas de máquinas de coser (usando texto estilizado como placeholders)
const brandLogos = [
  { name: "CASA TOMAS", color: "text-blue-600", size: "text-2xl" },
  { name: "CASA TOMAS", color: "text-red-600", size: "text-xl" },
  { name: "CASA TOMAS", color: "text-green-600", size: "text-3xl" },
  { name: "CASA TOMAS", color: "text-purple-600", size: "text-xl" },
  { name: "CASA TOMAS", color: "text-orange-600", size: "text-lg" },
  { name: "CASA TOMAS", color: "text-indigo-600", size: "text-2xl" },
  { name: "CASA TOMAS", color: "text-pink-600", size: "text-xl" },
  { name: "CASA TOMAS", color: "text-cyan-600", size: "text-lg" },
  { name: "CASA TOMAS", color: "text-yellow-600", size: "text-xl" },
  { name: "CASA TOMAS", color: "text-teal-600", size: "text-2xl" },
  { name: "CASA TOMAS", color: "text-gray-600", size: "text-3xl" },
  { name: "CASA TOMAS", color: "text-amber-600", size: "text-lg" }
];

// Generar posiciones y propiedades aleatorias
const generateBrandPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotation: (Math.random() - 0.5) * 60, // Rotación entre -30 y 30 grados
  scale: 0.3 + Math.random() * 0.7,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8
});

const brandElements = Array.from({ length: 20 }, (_, index) => ({
  ...brandLogos[index % brandLogos.length],
  id: index,
  ...generateBrandPosition()
}));

const BrandLogosBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Logos de marcas flotantes */}
      {brandElements.map((brand) => (
        <motion.div
          key={brand.id}
          className={`absolute ${brand.color} ${brand.size} font-bold opacity-10 hover:opacity-30 transition-opacity duration-500 cursor-pointer`}
          style={{
            left: `${brand.x}%`,
            top: `${brand.y}%`,
          }}
          initial={{
            scale: 0,
            rotate: 0,
            opacity: 0,
            y: 0
          }}
          animate={{
            scale: [0, brand.scale, brand.scale * 1.1, brand.scale],
            rotate: [0, brand.rotation, brand.rotation + 180, brand.rotation],
            opacity: [0, 0.1, 0.05, 0.1],
            y: [0, -30, 30, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: brand.duration,
            delay: brand.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{
            scale: brand.scale * 1.5,
            opacity: 0.4,
            rotate: brand.rotation + 360,
            transition: { duration: 0.5 }
          }}
        >
          {brand.name}
        </motion.div>
      ))}

      {/* Efectos de costura sutiles */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
                       radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Líneas de costura animadas */}
      {Array.from({ length: 12 }, (_, index) => (
        <motion.div
          key={`sewing-line-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${150 + Math.random() * 300}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0],
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Patrones de agujas flotantes */}
      {Array.from({ length: 8 }, (_, index) => (
        <motion.div
          key={`needle-${index}`}
          className="absolute w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -20, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de hilo */}
      {Array.from({ length: 6 }, (_, index) => (
        <motion.div
          key={`thread-${index}`}
          className="absolute w-0.5 h-32 bg-gradient-to-b from-pink-400/30 to-transparent opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.3, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default BrandLogosBackground;
