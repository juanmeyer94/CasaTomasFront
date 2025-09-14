import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Z_INDEX_LAYERS } from "./zIndexLayers";

export function FloatingWhatsAppButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ zIndex: Z_INDEX_LAYERS.FLOATING_BUTTONS }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.5 }}
    >
      {/* Tooltip informativo */}
      <motion.div
        className="bg-white text-gray-800 text-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap min-[319px]:hidden sm:block"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 3.5 }}
      >
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-green-600" />
          <span className="font-medium">¿Necesitas ayuda?</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Chatea con nosotros
        </div>
      </motion.div>

      {/* Botón principal de WhatsApp */}
      <motion.a
        href="https://api.whatsapp.com/send?phone=5493492279892&text=Hola%20Casa%20Tomas,%20tengo%20una%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-full shadow-2xl group-hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
          {/* Efecto de pulso */}
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Icono de WhatsApp */}
          <MessageCircle className="w-8 h-8 text-white relative z-10" />
        </div>
        
        {/* Tooltip del botón */}
        <motion.div
          className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          initial={{ x: 10 }}
          whileHover={{ x: 0 }}
        >
          <div className="font-medium">WhatsApp</div>
          <div className="text-xs text-gray-300">3492-279892</div>
          {/* Flecha */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </motion.div>
      </motion.a>


    </motion.div>
  );
}