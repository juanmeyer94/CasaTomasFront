import React from "react";
import { motion } from "framer-motion";

const ParticleEffects: React.FC = () => {
  // Generar partículas con diferentes tipos de animación
  const particles = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    color: [
      "bg-blue-400",
      "bg-pink-400", 
      "bg-yellow-400",
      "bg-green-400",
      "bg-purple-400",
      "bg-cyan-400",
      "bg-orange-400",
      "bg-indigo-400"
    ][Math.floor(Math.random() * 8)],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Partículas flotantes principales */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.color} rounded-full opacity-60`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.2, 0.6],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de costura dinámicos */}
      {Array.from({ length: 15 }, (_, index) => (
        <motion.div
          key={`sewing-effect-${index}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 0.8, 0],
            y: [0, -60, 0],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Líneas de energía */}
      {Array.from({ length: 8 }, (_, index) => (
        <motion.div
          key={`energy-line-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de pulso */}
      {Array.from({ length: 6 }, (_, index) => (
        <motion.div
          key={`pulse-${index}`}
          className="absolute w-20 h-20 border border-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de agujas de coser */}
      {Array.from({ length: 10 }, (_, index) => (
        <motion.div
          key={`sewing-needle-${index}`}
          className="absolute w-0.5 h-6 bg-gradient-to-b from-gray-600 to-gray-400 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            y: [0, -30, 30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de hilos flotantes */}
      {Array.from({ length: 12 }, (_, index) => (
        <motion.div
          key={`floating-thread-${index}`}
          className="absolute w-0.5 h-16 bg-gradient-to-b from-pink-400/40 to-transparent opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.5, 0],
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Efectos de brillo estelar */}
      {Array.from({ length: 20 }, (_, index) => (
        <motion.div
          key={`star-${index}`}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffects;

