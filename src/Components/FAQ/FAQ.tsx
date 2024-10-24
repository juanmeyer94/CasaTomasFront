import React from "react"

const FAQ: React.FC = () => {
  return (
    <div>
      {/* Imagen de encabezado */}
      <div className="w-full">
        <img src="/carousel0.jpg" alt="Preguntas frecuentes" className="w-full object-cover h-40" />
      </div>
      
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          {/* Título */}
          <h2 className="text-center text-2xl font-bold mb-8">PREGUNTAS FRECUENTES</h2>
          
          <div className="flex flex-wrap">
            {/* Imagen de asesoramiento */}
            <div className="w-full md:w-1/2 p-4">
              <div className="flex justify-center">
                <img src="/logoNavBarByJuliet.svg" alt="¿Necesita asesoramiento?" className="w-2/3 md:w-1/2" />
              </div>
            </div>

            {/* Preguntas y respuestas */}
            <div className="w-full md:w-1/2 p-4">
              <div className="text-left">
                <div className="mb-4">
                  <h3 className="font-bold">¿Cuáles son las zonas de atención?</h3>
                  <p>Llegamos a todo el país, con entrega en domicilio. Vía distintas empresas de transporte. A consultar.</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold">¿Qué medios de pagos reciben?</h3>
                  <p>El pago podrá hacerse vía bancos o cheques.</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold">¿Cuál es la compra mínima?</h3>
                  <p> El monto mínimo de la primera compra es de $20.000 para nuevos clientes.</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold">¿A qué clientes proveen?</h3>
                  <p>A todos los que le interesen nuestros productos. Consultar descuentos al por mayor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
