import { Order } from "../../../Interfaces/interfacesIndex";

const OrderModal = ({ order, onClose }: { order: Order, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-[70vh] md:ml-[20vh] lg:ml-[40vh] xl:ml-[60vh] 2xl:ml-[80vh]">
      <div className="bg-white w-96 p-6 rounded-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Cliente: {order.userName} {order.userLastName}</h2>
          <p>Email: {order.userEmail}</p>
          {order.cellphone ? <p>Celular: {order.cellphone}</p> : null}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Artículos:</h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item._id} className="mb-4">
                {item.items.map((subItem) => (
                  <div key={subItem._id} className="flex mb-2">
                    <img src={subItem.photo[0]} alt={subItem.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h1 className="font-medium">{subItem.marca}</h1>
                      <p className="text-sm text-gray-600">{subItem.description}</p>
                      <p className="text-sm text-gray-500">Precio por unidad: ${subItem.price}</p>
                      <div className="mt-2">
                        {Object.entries(item.quantity).map(([color, qty]) => (
                          <p key={color} className="text-sm text-gray-700">
                            <span className="font-semibold">{color}:</span> {qty} unidades
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
