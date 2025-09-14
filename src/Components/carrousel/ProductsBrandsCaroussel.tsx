import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import companies from "../../../public/productsBrands.json";


export default function ProductsBrandsCaroussel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // Triplicar las empresas para un carrusel verdaderamente infinito
  const duplicatedCompanies = [...companies, ...companies, ...companies];
  const mainCompanies = companies.slice(0, 4);

  // Estados para la rotación automática
  const [activeMainIndex, setActiveMainIndex] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotación automática para cards principales
  useEffect(() => {
    if (!isMobile || !isInView) return;

    const interval = setInterval(() => {
      setActiveMainIndex((prev) => (prev + 1) % mainCompanies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMobile, isInView, mainCompanies.length]);

  // Rotación automática para carrusel - sincronizada con 5 segundos
  useEffect(() => {
    if (!isMobile || !isInView) return;

    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % companies.length);
    }, 7000); // 5 segundos para sincronizar con la animación

    return () => clearInterval(interval);
  }, [isMobile, isInView, companies.length]);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const carouselVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pattern-bg"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título principal */}
        <motion.h3
          variants={titleVariants}
          className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-8 sm:mb-12 lg:mb-16 text-sky-400"
        >
          Representantes oficiales de
        </motion.h3>

        {/* Marcas principales */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {mainCompanies.map((company: any, index: number) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              animate={isMobile && activeMainIndex === index ? {
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              } : {}}
              className={`brand-card group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8 flex items-center justify-center border border-gray-100 hover:border-sky-200 overflow-hidden ${
                isMobile && activeMainIndex === index ? 'ring-2 ring-sky-400 ring-opacity-50' : ''
              }`}
            >
              {/* Efecto de brillo en hover */}
              <div className="brand-shine"></div>

              <motion.img
                src={company.logo}
                alt={`Logo de ${company.id}`}
                className={`relative z-10 h-8 sm:h-10 md:h-12 lg:h-16 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${
                  isMobile && activeMainIndex === index ? 'grayscale-0' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                animate={isMobile && activeMainIndex === index ? {
                  scale: 1.1,
                  transition: { duration: 0.3 }
                } : {}}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Subtítulo */}
        <motion.div
          variants={titleVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-sky-700 mb-2">
            ¡También trabajamos con todas estas marcas
          </p>
          <p className="text-base sm:text-lg text-sky-600">
            y muchas más para ofrecerte la mejor calidad
          </p>
        </motion.div>

        {/* Carrusel infinito */}
        <motion.div
          variants={carouselVariants}
          className="relative overflow-hidden w-full max-w-6xl mx-auto"
        >
          {/* Overlays con gradientes mejorados */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-20 lg:w-24 pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-20 lg:w-24 pointer-events-none bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10"></div>

          {/* Carrusel infinito real */}
          <div
            className="flex animate-infinite-scroll py-2"

          >
            {duplicatedCompanies.map((company, index) => (
              <motion.div
                key={`${company.id}-${index}`}
                className="flex-none mx-3 sm:mx-4 lg:mx-6"

                whileHover={{
                  scale: 1.1,
                  transition: { duration: 80 }
                }}
                animate={isMobile && activeCarouselIndex === index % companies.length ? {
                  scale: 1.1,

                } : {}}
              >
                <div className={`brand-card bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-sky-200 group ${
                  isMobile && activeCarouselIndex === index % companies.length ? 'ring-2 ring-sky-400 ring-opacity-50 shadow-xl' : ''
                }`}>
                  <motion.img
                    src={company.logo}
                    alt={`Logo de ${company.id}`}
                    className={`h-8 sm:h-10 md:h-12 lg:h-16 w-16 sm:w-20 md:w-24 lg:w-32 object-contain filter transition-all duration-300 ${
                      isMobile && activeCarouselIndex === index % companies.length ? 'grayscale-0' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}

                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-8 sm:mt-12"
        >
          <div className="flex space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="scroll-indicator w-2 h-2 bg-sky-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1.67 }}
              className="scroll-indicator w-2 h-2 bg-sky-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 3.33 }}
              className="scroll-indicator w-2 h-2 bg-sky-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
