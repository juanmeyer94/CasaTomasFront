import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 font-poppins">
      <div className="max-w-6xl px-4 py-4 mx-auto text-center">
        {/* Imagen superior */}
        <img
          src="/generaciones.png"
          alt="Casa Tomas"
          className="w-full max-w-md mx-auto mb-8 rounded-lg -rotate-1"
        />

        {/* Pregunta principal */}
        <span className="text-sm font-semibold text-blue-500">
          ¿Por qué elegirnos?
        </span>
        <h2 className="mt-2 mb-6 text-2xl font-bold text-gray-700">
          Somos Casa Tomas: 100 Años de Pasión por la Costura
        </h2>

        {/* Items en una fila horizontal */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-1-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8" fill="currentColor"/> 
  <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="12" className="font-semibold">1</text> 
</svg>

            </div>
            <h3 className="mb-2 font-semibold text-gray-600">
              El Legado de Bartolomé Tomas
            </h3>
            <p className="text-sm text-gray-500">
              En 1923, Bartolomé Tomas fundó Casa Tomas, estableciendo la base
              de lo que hoy es una institución en el mundo de la costura.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-2-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-600">
              De Generación en Generación
            </h3>
            <p className="text-sm text-gray-500">
              El compromiso con la excelencia ha sido transmitido a lo largo de
              cinco generaciones, garantizando calidad y servicio.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-3-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-600">
              Más que una Tienda
            </h3>
            <p className="text-sm text-gray-500">
              Casa Tomas es un destino para los amantes de la costura,
              ofreciendo productos de alta calidad y una mercería completa.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-4-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176c-.218.352-.438.703-.657 1.055ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-600">
              Nuestro Compromiso
            </h3>
            <p className="text-sm text-gray-500">
              Nos enorgullece ofrecer un servicio personalizado y productos de
              calidad que nos han distinguido por más de un siglo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
