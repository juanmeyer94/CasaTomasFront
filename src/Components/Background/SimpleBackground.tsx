import React from "react";

const SimpleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradiente de fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100" />
      
      {/* Logo y texto centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-5">
        <img 
          src="/logo2025.png" 
          alt="Casa Tomas Logo"
          className="w-64 h-64 object-contain mb-4"
        />
        <h1 className="text-6xl font-bold text-sky-600">CASA TOMAS</h1>
      </div>
    </div>
  );
};

export default SimpleBackground;


