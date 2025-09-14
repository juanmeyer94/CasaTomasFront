/**
 * Sistema de capas Z-Index organizado
 * Para evitar conflictos y superposiciones problemáticas
 */

export const Z_INDEX_LAYERS = {
  // Capas de fondo
  BACKGROUND: 0,
  BACKGROUND_ELEMENTS: 1,
  
  // Contenido principal
  CONTENT: 10,
  CONTENT_OVERLAY: 15,
  
  // Componentes flotantes
  FLOATING_ELEMENTS: 20,
  FLOATING_BUTTONS: 25,
  
  // Sidebar y navegación
  SIDEBAR: 30,
  MOBILE_SIDEBAR: 35,
  NAVBAR: 40,
  
  // Modales y overlays
  MODAL_OVERLAY: 45,
  MODAL: 50,
  DROPDOWN: 55,
  
  // Notificaciones y alertas
  NOTIFICATIONS: 60,
  TOOLTIPS: 65,
  
  // Elementos de máxima prioridad
  MAXIMUM: 70
} as const;

export default Z_INDEX_LAYERS;
