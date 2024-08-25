import React from "react";

const HowToBuy: React.FC = () => {
  return (
    <div className=" py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">CÓMO COMPRAR</h2>
        <div className="text-center text-lg mb-8">
          <p>Es muy fácil!</p>
          <ul className="list-disc list-inside mx-auto max-w-md">
            <li>
              Recorré nuestro sitio, ahí podrás elegir nuestros productos.
            </li>
            <li>
              Una vez terminada la compra, recibiremos tu pedido y te
              llamaremos, para cerrar los últimos detalles.
            </li>
            <li>
              Te enviaremos el pedido por el transporte que hayas elegido o lo
              podrás pasar a retirar por nuestro local.
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-center items-start mb-16">
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-32 h-32 bg-blue-200 rounded-full mb-4">
              <img
                  src="/shopping-cart.png"
                  alt="Carrito"
                  className="h-24 w-24"
                />
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-center text-lg font-semibold text-sky-700">
                AGREGÁ LOS PRODUCTOS A TU CARRO DE PEDIDOS
              </h2>
              <p className="text-gray-500 mt-2">
                haciendo click en los botones de
              </p>

              <button className="mt-4 px-4 py-3 bg-sky-200 text-black rounded-lg hover:bg-sky-300">
                Agregar al carrito
              </button>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-32 h-32 bg-blue-200 rounded-full mb-4">
                <img
                  src="/change.png"
                  alt="Carrito"
                  className="h-12 w-12"
                />
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-center text-lg font-semibold text-sky-700">
                PODÉS MODIFICAR CANTIDADES Y CONFIRMAR TU PEDIDO
              </h2>
              <p className="text-gray-500 mt-2">haciendo click en el botón</p>

              <button className="mt-6 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400">
                <img
                  src="/shopping-cart.svg"
                  alt="Carrito"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-32 h-32 bg-blue-200 rounded-full mb-4">
                <img
                  src="/callcenter.png"
                  alt="Carrito"
                  className="h-12 w-12"
                />
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-center text-lg font-semibold text-sky-700">
                NOS PONDREMOS EN CONTACTO CON VOS
              </h2>
              <p className="text-gray-500 mt-2">
                para coordinar la entrega y el pago
              </p>
              <button className="mt-6 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400">
                <img
                  src="/whatsapp.png"
                  alt="Carrito"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-32 h-32 bg-blue-200 rounded-full mb-4">
                <img
                  src="/shipping.png"
                  alt="Carrito"
                  className="h-12 w-12"
                />
                <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-center text-lg font-semibold text-sky-700">
                RECIBES O RETIRAS TU PEDIDO
              </h2>
              <p className="text-gray-500 mt-6 text-center">
                en la puerta de tu casa o en nuestro local.
              </p>
              <button className="mt-4 px-4 py-2 bg-sky-300 text-white rounded-lg hover:bg-sky-400">
                <img
                  src="/box.png"
                  alt="Carrito"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold">ZONA DE COBERTURA</h3>
          <p>
            Llegamos a cada rincón del país. 
          </p>
          <p>Trabajamos con todas las empresas de tranporte.</p>
          <img
            src="/argentinamapa.jpg"
            alt="Mapa de cobertura"
            className="mx-auto my-4"
          />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold">FORMA DE PAGO</h3>
          <p>
            La modalidad de pago puede ser contado efectivo, transferencia bancaria, débito o tarjeta de crédito bancaria.
          </p>
          <p>Consultar por la financiacion en cuotas. </p>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
