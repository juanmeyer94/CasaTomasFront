import React, { useState } from "react";
import useUserContext from "../../Utils/contextUserHook";
import { ChevronDown, Zap, ShoppingCart, Phone, MapPin, MessageCircle, Instagram, Heart, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Componente SplitText para animaciones de texto
const SplitText: React.FC<{ text: string; className?: string; delay?: number }> = ({ 
  text, 
  className = "", 
  delay = 0 
}) => {
  const words = text.split(" ");

  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
  types: string[];
  specialContent?: React.ReactNode;
};

const categories: Category[] = [
  {
    name: "Máquinas de coser",
    subcategories: [
      {
        name: "Maquinas Industriales",
        types: [
          "Rectas",
          "Overlock",
          "Collaretas",
          "Recta y zig zag",
          "Doble arrastre",
          "Triple arrastre",
        ],
      },
      {
        name: "Maquinas Familiares",
        types: ["Máquina de coser", "Collareta", "Overlock"],
      },
      {
        name: "Repuestos y reparaciones",
        types: [],
        specialContent: (
          <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Repuestos y reparaciones
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Consultar por estos medios.
            </p>
            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
              <li>
                <a
                  href="https://www.facebook.com/casa.tomas.rafaela"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/casatomas.rafaela/?hl=es"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="tel:03492422683"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  (03492) 422683
                </a>
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    name: "Mercería",
    subcategories: [
      {
        name: "Hilos",
        types: [
          "Hilos de bordar y tejer",
          "Hilos de costura",
          "Hilos para manualidades",
        ],
      },
      {
        name: "Agujas",
        types: [
          "Agujas para Máquinas",
          "Agujas de mano",
          "Agujas de tejer",
          "Alfileres",
          "Accesorios",
        ],
      },
      { name: "Abrojos", types: ["Abrojos"] },
      { name: "Reparadores", types: ["Parches y reparadores"] },
      {
        name: "Elásticos",
        types: [
          "Elásticos de Algodon",
          "Elásticos de Poliester",
          "Elásticos Redondos",
          "Elásticos Afelpados",
          "Elásticos Lencería",
        ],
      },
      {
        name: "Puntillas",
        types: [
          "Puntillas de Nylon",
          "Puntillas de Algodon",
          "Puntillas de Lycra",
          "Puntillas de Broderie",
          "Puntillas de Guipure",
          "Flecos",
        ],
      },
      {
        name: "Cintas",
        types: [
          "Cinta de Raso",
          "Cinta Gross",
          "Cinta Bies",
          "Cinta Mochilera",
          "Cinta Fantasía",
          "Galones",
          "Cinta Hilera",
        ],
      },{
        name: "Herrajes y Broches",
        types: [
          "Herrajes",
          "Broches",
        ],
      },
      {
        name: "Cierres",
        types: [
          "Cierre Común Fijo",
          "Cierre Reforzado Fijo",
          "Cierre Reforzado Desmontable",
          "Cierre D. de Perro",
          "Cierre Perrito",
          "Cierre de Aluminio y Empavonado",
          "Cierre Fijo Bronce",
          "Cierre Invisible",
          "Cierre por metro y Deslizadores",
        ],
      },
      {
        name: "Cordones",
        types: [
          "Cordón de Calzado",
          "Cordón por Metro",
          "Plantillas",
        ],
      },
      { name: "Herramientas", types: ["Tijeras", "Reglas","Herramientas"] },
    ],
  },
];

const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  specialContent?: React.ReactNode;
}> = ({ title, children, isOpen, onClick, specialContent }) => (
  <motion.div 
    className="border-b border-sky-200/50 bg-white/50 backdrop-blur-sm rounded-lg mb-2 shadow-sm hover:shadow-md transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.button
      className="flex items-center justify-between w-full py-3 px-4 font-semibold text-left text-gray-800 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transition-all duration-300 rounded-lg"
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-sm md:text-base font-medium text-gray-700">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4 text-sky-600" />
      </motion.div>
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="py-2 px-4 bg-gradient-to-br from-sky-50/50 to-blue-50/50 rounded-b-lg">
            {specialContent ? specialContent : children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const SideBar: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { Filters, setFilters } = useUserContext();

  const handleAccordionToggle = (accordionId: string) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const handleTypeChange = (type: string) => {
    setFilters({ ...Filters, type });
    if (window.innerWidth < 450) {
      setIsSidebarOpen(false);
    }
  };

  const handleSubsectionChange = (subsection: string) => {
    setFilters({ ...Filters, subsection, type: "all" });
  };

  return (
    <div className="relative flex flex-col">


      {/* SideBar principal */}
      <motion.div
        className={`w-48 2xl:w-64 xl:w-60 lg:w-56 md:w-48 xs:w-44 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 text-sky-600 p-4 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col h-full relative ${
          isSidebarOpen
            ? "translate-x-0 absolute z-30 w-screen"
            : "-translate-x-full hidden"
        } sm:translate-x-0 sm:block`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Gradiente lateral izquierdo espectacular */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-100 to-yellow-100 shadow-lg"></div>

        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <motion.h2 
              className="text-lg text-center font-black mb-4 md:text-xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent border-2 border-sky-300 rounded-lg py-2 px-3 shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <SplitText text={category.name} delay={0.8 + index * 0.1} />
            </motion.h2>
            <motion.button
              className="flex items-center justify-center w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
              onClick={() =>
                setFilters({
                  ...Filters,
                  subsection: "all",
                  type: category.name.toLowerCase(),
                })
              }
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">Ver todos</span>
              <Zap className="w-4 h-4 ml-2" />
            </motion.button>
            {category.subcategories.map((subcategory, subIndex) => (
              <AccordionItem
                key={subIndex}
                title={subcategory.name}
                isOpen={openAccordion === `${index}-${subIndex}`}
                onClick={() => {
                  handleAccordionToggle(`${index}-${subIndex}`);
                  if (!subcategory.specialContent) {
                    handleSubsectionChange(subcategory.name);
                  }
                }}
                specialContent={subcategory.specialContent}
              >
                <ul className="pl-2 text-md md:text-base space-y-1">
                  {subcategory.types.map((type, typeIndex) => (
                    <motion.li 
                      key={typeIndex} 
                      className="mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: typeIndex * 0.05 }}
                    >
                      <motion.button
                        className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 hover:text-sky-700 transition-all duration-300 group"
                        onClick={() => handleTypeChange(type)}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-2 h-2 bg-sky-400 rounded-full mr-3 group-hover:bg-sky-600 transition-colors duration-300"></div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-sky-700 transition-colors duration-300">
                          {type}
                        </span>
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <ChevronDown className="w-3 h-3 text-sky-500 rotate-[-90deg]" />
                        </motion.div>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </motion.div>
        ))}

     {/* Información de contacto destacada */}
     <motion.div 
          className="mb-6 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-sky-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-2">
            <Phone className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-gray-700">Contacto</span>
          </div>
          <a href="tel:03492422683" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          TEL.FIJO: (03492) 422683 
          </a>
          <br />
          <a href="tel:3492279892" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          CELULAR: (3492) 279892
          </a>
          <br />
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-xs text-gray-600">Rafaela, Santa Fe</span>
          </div>
        </motion.div>

        {/* Redes sociales mejoradas */}
        <motion.div 
          className="mt-auto p-4 bg-gradient-to-br from-white/80 to-sky-50/80 backdrop-blur-sm rounded-xl shadow-lg border border-sky-200 flex flex-col justify-center min-h-[120px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
        {/* Redes sociales */}
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Síguenos
            </h3>
            <div className="flex space-x-4">
              {[
                { 
                  href: "https://www.facebook.com/casa.tomas.rafaela/", 
                  icon: Facebook, 
                  color: "from-blue-600 to-blue-700",
                  label: "Facebook"
                },
                { 
                  href: "https://www.instagram.com/casatomas.rafaela/?hl=es", 
                  icon: Instagram, 
                  color: "from-pink-500 via-purple-500 to-orange-500",
                  label: "Instagram"
                },
                { 
                  href: "https://wa.me/+5493492279892", 
                  icon: MessageCircle, 
                  color: "from-green-500 to-green-600",
                  label: "WhatsApp"
                }
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-full bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SideBar;
