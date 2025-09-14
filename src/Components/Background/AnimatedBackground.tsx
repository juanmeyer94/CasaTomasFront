import React from "react";
import { motion } from "framer-motion";
import { 
  Scissors,  
  Zap, 
  Star, 
  Heart,
  Triangle,
  Sparkles,
  Wand2
} from "lucide-react";

// Iconos relacionados con máquinas de coser y mercería + logos de la empresa
const sewingIcons = [
  { Icon: Scissors, name: "Tijeras", color: "text-blue-500", isLogo: false },
  { Icon: Zap, name: "Máquina", color: "text-yellow-500", isLogo: false },
  { Icon: Star, name: "Estrella", color: "text-purple-500", isLogo: false },
  { Icon: Heart, name: "Corazón", color: "text-red-500", isLogo: false },
  { 
    Icon: null, 
    name: "Logo Principal", 
    color: "text-sky-500", 
    isLogo: true, 
    logoPath: "/logo2025.png" 
  },
  { 
    Icon: null, 
    name: "Logo Móvil", 
    color: "text-blue-500", 
    isLogo: true, 
    logoPath: "/logomobile2025.png" 
  },
  { Icon: Triangle, name: "Triángulo", color: "text-teal-500", isLogo: false },
  { 
    Icon: null, 
    name: "Logo SVG", 
    color: "text-indigo-500", 
    isLogo: true, 
    logoPath: "/logoNavBarByJuliet.svg" 
  },
  { Icon: Sparkles, name: "Brillo", color: "text-amber-500", isLogo: false },
  { Icon: Wand2, name: "Varita", color: "text-violet-500", isLogo: false }
];

// Generar posiciones aleatorias para los elementos
const generateRandomPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotation: Math.random() * 360,
  scale: 0.5 + Math.random() * 1.5,
  delay: Math.random() * 5
});

// Generar múltiples elementos con posiciones aleatorias
const floatingElements = Array.from({ length: 25 }, (_, index) => ({
  ...sewingIcons[index % sewingIcons.length],
  id: index,
  ...generateRandomPosition()
}));

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradiente de fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100" />
      
      {/* Patrones de fondo sutiles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-green-400 rounded-full blur-3xl" />
      </div>

      {/* Elementos flotantes animados */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.color} opacity-20 hover:opacity-40 transition-opacity duration-300`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{
            scale: 0,
            rotate: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, element.scale, element.scale * 1.2, element.scale],
            rotate: [0, element.rotation, element.rotation + 360],
            opacity: [0, 0.2, 0.1, 0.2],
            y: [0, -20, 20, 0],
            x: [0, 10, -10, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{
            scale: element.scale * 1.5,
            opacity: 0.6,
            rotate: element.rotation + 180,
            transition: { duration: 0.3 }
          }}
        >
          {element.isLogo ? (
            <img 
              src={element.logoPath} 
              alt={element.name}
              className="drop-shadow-lg"
              style={{ 
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                objectFit: 'contain'
              }}
            />
          ) : element.Icon ? (
            <element.Icon 
              size={20 + Math.random() * 30} 
              className="drop-shadow-lg"
            />
          ) : null}
        </motion.div>
      ))}

      {/* Partículas de brillo adicionales */}
      {Array.from({ length: 15 }, (_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Ondas de energía sutiles */}
      <motion.div
        className="absolute inset-0 border-2 border-yellow-400/20 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: "20%",
          top: "30%",
          width: "200px",
          height: "200px"
        }}
      />
      
      <motion.div
        className="absolute inset-0 border border-blue-400/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          right: "25%",
          bottom: "20%",
          width: "150px",
          height: "150px"
        }}
      />

      {/* Efecto de costura animado */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(59, 130, 246, 0.05) 10px,
            rgba(59, 130, 246, 0.05) 20px
          )`
        }}
        animate={{
          x: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Líneas de costura flotantes */}
      {Array.from({ length: 8 }, (_, index) => (
        <motion.div
          key={`line-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
