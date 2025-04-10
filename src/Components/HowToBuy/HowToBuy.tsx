import { motion } from "framer-motion";

const steps = [
  {
    title: "Agregá los productos a tu carrito",
    description: "Seleccioná lo que te gusta y hacé click en \"Agregar al carrito\".",
    img: "/shopping-cart.png",
  },
  {
    title: "Modificá cantidades y confirmá tu pedido",
    description: "Desde el carrito podés ajustar cantidades y enviar tu pedido.",
    img: "/change.png",
  },
  {
    title: "Nos contactamos con vos",
    description: "Te llamamos o te escribimos por WhatsApp para coordinar pago y entrega.",
    img: "/callcenter.png",
  },
  {
    title: "Recibís tu pedido en casa o lo retirás",
    description: "Hacemos envíos a todo el país o podés retirarlo en nuestro local.",
    img: "/shipping.png",
  },
];

export default function HowToBuy() {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto relative overflow-hidden bg-gradient-to-b from-sky-100 to-white">
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-200 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-300 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-bold mb-10 text-sky-700"
      >
        Cómo Comprar en Casa Tomas
      </motion.h2>

      <div className="flex flex-col gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold shadow-lg z-10">
              {index + 1}
            </div>
            <img
              src={step.img}
              alt={step.title}
              className="w-24 h-24 object-contain mb-4 mt-6"
            />
            <h3 className="text-xl font-semibold mb-2 text-sky-700">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm max-w-xs">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-sky-700">Zona de Cobertura</h3>
        <p className="text-gray-600 mb-4">Enviamos a todo el país.</p>
        <img src="/argentinamapa.jpg" alt="Mapa Argentina" className="mx-auto rounded-2xl shadow-md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-sky-700">Formas de Pago</h3>
        <p className="text-gray-600">Aceptamos efectivo, transferencia, débito y crédito.</p>
        <p className="text-gray-600">Consultá por financiación en cuotas.</p>
      </motion.div>
    </section>
  );
}
