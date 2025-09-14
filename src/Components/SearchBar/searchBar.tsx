import React, { useState, useEffect } from "react";
import useUserContext from "../../Utils/contextUserHook";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  RotateCcw, 
  Sparkles,
  Zap,
  Star
} from "lucide-react";

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

const SearchBarr: React.FC = () => {
  const {
    setSearchQuery,
    SearchBar,
    removeFilters,
    setCurrentPage,
    currentPage,
    Filters,
  } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Función para verificar si hay filtros activos
  const hasActiveFilters = () => {
    const hasFilters = Filters.type !== "all" || Filters.subsection !== "all" || Filters.price > 0;
    return hasFilters;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setSearchQuery(newValue);
    
    // Simular búsqueda
    if (newValue.length > 0) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  const resetFilters = () => {
    removeFilters();
    setSearchTerm("");
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchQuery("");
  };

  useEffect(() => {
    if (!SearchBar) {
      setSearchTerm("");
    }
  }, [SearchBar]);

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto px-2 min-[319px]:px-3 sm:px-4 min-[319px]:mt-4 sm:mt-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header de búsqueda */}
      <motion.div 
        className="text-center m-4 min-[319px]:hidden sm:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center justify-center mb-2"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-6 h-6 text-sky-500 mr-2" />
          <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <SplitText text="Encuentra exactamente lo que necesitas
" delay={0.3} />
          </h2>
          <Star className="w-6 h-6 text-yellow-500 ml-2" />
        </motion.div>
      </motion.div>

      {/* Barra de búsqueda principal */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="relative group">
          {/* Fondo con gradiente animado */}
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-all duration-500 ${
              isFocused ? 'opacity-75' : ''
            }`}
            animate={{ 
              background: isFocused 
                ? ["linear-gradient(90deg, #0ea5e9, #3b82f6, #4f46e5)", "linear-gradient(90deg, #4f46e5, #3b82f6, #0ea5e9)"]
                : "linear-gradient(90deg, #0ea5e9, #3b82f6, #4f46e5)"
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Contenedor principal */}
          <div className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 ${
            isFocused 
              ? 'border-sky-400 shadow-2xl' 
              : 'border-gray-200 hover:border-sky-300'
          }`}>
            
            {/* Input de búsqueda */}
            <div className="flex items-center p-2 min-[319px]:p-3 sm:p-4">
              <motion.div
                className="flex-shrink-0 mr-2 min-[319px]:mr-3"
                animate={{ rotate: isSearching ? 360 : 0 }}
                transition={{ duration: 1, repeat: isSearching ? Infinity : 0, ease: "linear" }}
              >
                <Search className={`w-4 h-4 min-[319px]:w-5 min-[319px]:h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                  isFocused ? 'text-sky-500' : 'text-gray-400'
                }`} />
              </motion.div>
              
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 text-sm min-[319px]:text-base sm:text-lg placeholder-gray-400 focus:outline-none bg-transparent"
              />
              
              {/* Botón de limpiar */}
              {searchTerm && (
                <motion.button
                  onClick={clearSearch}
                  className="flex-shrink-0 ml-2 min-[319px]:ml-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 min-[319px]:w-5 min-[319px]:h-5 text-gray-400 hover:text-gray-600" />
                </motion.button>
              )}
            </div>

            {/* Indicador de búsqueda activa */}
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 rounded-b-2xl"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sugerencias de búsqueda */}
        <motion.div 
          className="mt-3 min-[319px]:mt-4 flex flex-wrap gap-1.5 min-[319px]:gap-2 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {["Máquinas de coser", "Hilos", "Elásticos", "Herramientas", "Cierres"].map((suggestion, index) => (
            <motion.button
              key={suggestion}
              className={`px-2 min-[319px]:px-3 py-1 text-xs bg-gradient-to-r from-sky-50 to-blue-50 text-sky-600 rounded-full border border-sky-200 hover:from-sky-100 hover:to-blue-100 hover:border-sky-300 transition-all duration-300 ${index >= 2 ? 'hidden sm:block' : ''}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              onClick={() => {
                setSearchTerm(suggestion);
                setSearchQuery(suggestion);
              }}
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>

        {/* Botón de reset con animación espectacular */}
        <AnimatePresence>
          {(currentPage !== 1 || searchTerm !== "" || hasActiveFilters()) && (
            <motion.div 
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
            <motion.button
              onClick={resetFilters}
              className="group relative px-4 min-[319px]:px-6 sm:px-8 py-2 min-[319px]:py-3 sm:py-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white font-bold rounded-xl min-[319px]:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Efecto de fondo animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-red-500 opacity-0 group-hover:opacity-100"
                animate={{ 
                  background: [
                    "linear-gradient(90deg, #ef4444, #ec4899, #ef4444)",
                    "linear-gradient(90deg, #ec4899, #ef4444, #ec4899)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative flex items-center space-x-1 min-[319px]:space-x-1">
                <RotateCcw className="w-4 h-4 min-[319px]:w-4 min-[319px]:h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm min-[319px]:text-xs sm:text-lg">
                  <SplitText text="Volver atrás" delay={0} />
                </span>
                <Zap className="w-4 h-4 min-[319px]:w-4 min-[319px]:h-4 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Efecto de pulso */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SearchBarr;
