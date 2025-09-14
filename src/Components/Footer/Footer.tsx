import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  Star,
  Truck,
  Shield,
  Award,
  Facebook,
  Instagram,
  MessageCircle,
  ExternalLink
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-sky-200 via-blue-500 to-indigo-700 text-white overflow-hidden">
      {/* Gradiente superior espectacular */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-100 shadow-lg"></div>
      
      {/* Patrones de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-sky-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header del footer */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/logo2025.png"
              alt="Casa Tomás"
              className="h-28 w-auto mr-4"
            />
         
          </motion.div>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Información de contacto */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Contacto
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-300">Teléfono Fijo</p>
                  <a href="tel:03492422683" className="text-white hover:text-yellow-400 transition-colors duration-300">
                    (03492) 422683
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-300">Celular</p>
                  <a href="tel:3492279892" className="text-white hover:text-yellow-400 transition-colors duration-300">
                    3492-279892
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-300">Ubicación</p>
                  <p className="text-white">Rafaela, Santa Fe</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Enlaces
            </h3>
            <div className="space-y-3">
              {[
                { href: "/aboutUs", label: "Acerca de Nosotros" },
                { href: "/contact", label: "Contacto" },
                { href: "/howToBuy", label: "Cómo Comprar" },
                { href: "/FAQ", label: "Preguntas Frecuentes" }
              ].map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="group-hover:underline">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Horarios
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Lunes a Viernes</p>
                  <p className="text-white"> 8:00 - 12:00 </p>
                  <br />
                  <p className="text-white">15:30 - 19:30</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Sábados</p>
                  <p className="text-white">8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </motion.div>

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
        </div>

        {/* Sección de beneficios */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center justify-center">
              <Award className="w-6 h-6 mr-2" />
              ¿Por qué elegirnos?
            </h3>
            <p className="text-gray-300">Más de 100 años de experiencia en el rubro</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Envíos a todo el país", desc: "Llegamos a cada rincón de Argentina" },
              { icon: Shield, title: "Garantía total", desc: "Productos con garantía oficial" },
              { icon: Star, title: "Calidad premium", desc: "Solo productos de primera calidad" }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-300 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer inferior */}
        <motion.div 
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 Casa Tomás®. Todos los derechos reservados.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Desde 1923 sirviendo a la comunidad de Rafaela
              </p>
            </div>

            {/* Version 2.0*/}
            <p className="text-gray-300 text-sm">Version 2.0</p>
            
            <div className="text-center md:text-right">
              <p className="text-gray-300 text-sm mb-1">Desarrollado con</p>
              <div className="flex items-center justify-center md:justify-end space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-gray-300 text-sm">por</span>
                <a
                  href="https://www.linkedin.com/in/juan-meyer-9b34a5269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-semibold"
                >
                  Juan Meyer
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
