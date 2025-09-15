import React, { useState, useEffect } from "react";
import CartModal from "../Cart/cartModal";
import useUserContext from "../../Utils/contextUserHook";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  X,
  Home,
  Info,
  Phone,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state, loading } = useUserContext();

  // Detectar scroll para efectos dinámicos
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/aboutUs", label: "Nosotros", icon: Info },
    { href: "/contact", label: "Contacto", icon: Phone },
    { href: "/howToBuy", label: "Comprar", icon: ShoppingBag },
  ];

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      {/* Navbar Principal */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-2xl border-b border-sky-200/50"
            : "bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-100 "
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 2xl:h-28">
            {/* Logo principal espectacular */}
            <motion.div
              className="flex items-center justify-start flex-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <a href="/" className="group relative">
                <motion.div
                  className="relative"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <img
                    src="/logo2025.png"
                    alt="Casa Tomás - Máquinas de coser & Mercería"
                    className="h-16 w-auto sm:h-14 md:h-16 lg:h-18 xl:h-20 2xl:h-24 object-contain min-[319px]:h-20 min-[375px]:h-22"
                  />

                  {/* Sombra dinámica */}
                </motion.div>

                {/* Efecto de partículas flotantes */}
                <motion.div
                  className="absolute -top-3 -right-3 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, 12, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    x: [0, 15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                />
                <motion.div
                  className="absolute top-1/4 -left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    x: [0, -12, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 1.1 }}
                />
              </a>
            </motion.div>


            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="group relative px-2 xl:px-4 py-1.5 xl:py-2 rounded-lg text-gray-700 hover:text-sky-600 transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-1 xl:space-x-2">
                    <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-sm xl:text-base">{item.label}</span>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Acciones de la derecha */}
            <div className="flex items-center space-x-4 sm:space-x-2 md:space-x-3 lg:space-x-4">
              {/* Carrito con animación espectacular */}
              <motion.button
                onClick={handleCartModal}
                className="relative group p-1.5 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />

                {/* Badge de cantidad */}
                {state.cart.length > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <motion.span
                      key={state.cart.length}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {state.cart.length}
                    </motion.span>
                  </motion.div>
                )}

                {/* Efecto de pulso */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* WhatsApp con gradiente */}
              <motion.a
                href="https://wa.me/+5493492279892"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-1.5 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.a>

              {/* Botón móvil mejorado */}
              <motion.button
                className="lg:hidden p-1.5 sm:p-2.5 md:p-3 rounded-lg text-gray-600 hover:text-sky-600 hover:bg-sky-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menú móvil espectacular */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-sky-200/50"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-lg">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para el contenido */}
      <div className="h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 2xl:h-28" />

      {/* Modal del carrito */}
      {isCartOpen && <CartModal handleCartModal={handleCartModal} />}
    </>
  );
};

export default NavBar;
