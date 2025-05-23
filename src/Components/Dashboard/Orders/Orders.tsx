import { useState } from "react";
import { compareDesc } from 'date-fns';
import useAdminContext from "../../../Utils/contextAdminHook";
import OrderModal from "./OrdersModal";
import { Order } from "../../../Interfaces/interfacesIndex";

const Orders = () => {

  const defaultOrderData: Order = {
    _id: "",
    userEmail: "",
    userName: "",
    userLastName: "",
    totalAmount: 0,
    status: "",
    deleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderItems: []
  };

  
  const { getOrderData, updateOrder, orders, deleteOrder } = useAdminContext();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<Order>(defaultOrderData);
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const openModal = async (id: string) => {
    try {
      const response = await getOrderData(id);
      setOrderData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener la información de la orden completa:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      if (status === "Eliminar") {
        await deleteOrder(id);
      } else {
        await updateOrder(id, status);
        setSelectedStatus(status);
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la orden: ", error);
    }
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "Todos") {
      return orders.filter(order => !order.deleted);
    } else {
      return orders.filter(order => order.status === status && !order.deleted);
    }
  };

  const calculateTotalPrice = (order: Order) => {
    return order.orderItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.items[0].price);
      const itemTotal = Object.values(item.quantity).reduce(
        (total, qty) => total + itemPrice * qty,
        0
      );
      return acc + itemTotal;
    }, 0);
  };

  let imageToRender:any;
   const getStatusColor = (status: string | undefined) => {
    
    switch (status) {
      case 'pendiente':
        return imageToRender = <img src="/pending.png" alt="pendiente" className="w-8 h-8"/>
      case 'En Progreso':
      return imageToRender =  <img src="/working.png" alt="en progreso" className="w-8 h-8"/>
      case 'Listo':
        return imageToRender =  <img src="/ready.png" alt="listo" className="w-9 h-9"/>
      default:
       return imageToRender =  'Not Status';
    }
  };

  const filteredOrders = filterOrdersByStatus(selectedStatus);
  const sortedOrders = [...filteredOrders].sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt))
  );
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-sky-100">
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-center">
          <h1 className="text-center text-xl text-white font-semibold p-2 font-mono h-10 my-4 bg-emerald-300 w-36 2xl:w-64 2xl:h-16 rounded-xl 2xl:text-3xl">
            Pedidos
          </h1>
        </div>
        <div className="bg-white p-4 mx-28 rounded-xl min-h-[70vh]">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <button
                className={`py-2 px-4 ${selectedStatus === 'Todos' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'} rounded-full hover:bg-indigo-200`}
                onClick={() => setSelectedStatus("Todos")}
              >
                Todos
              </button>
              <button
                className={`py-2 px-4 ml-4 ${selectedStatus === 'Listo' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'} rounded-full hover:bg-gray-300`}
                onClick={() => setSelectedStatus("Listo")}
              >
                Listos
              </button>
              <button
                className={`py-2 px-4 ml-4 ${selectedStatus === 'En Progreso' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'} rounded-full hover:bg-gray-300`}
                onClick={() => setSelectedStatus("En Progreso")}
              >
                En proceso
              </button>
              <button
                className={`py-2 px-4 ml-4 ${selectedStatus === 'pendiente' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'} rounded-full hover:bg-gray-300`}
                onClick={() => setSelectedStatus("pendiente")}
              >
                Pendientes
              </button>
            </div>
          </div>
          <div className="mt-7 overflow-x-auto min-h-[70vh]">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr >
                  <th className="px-4 py-2 text-left font-semibold">Pedido N°:</th>
                  <th className="px-4 py-2 text-left font-semibold">Usuario</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                  <th className="px-4 py-2 text-left font-semibold">Fecha</th>
                  <th className="px-4 py-2 text-left font-semibold">Total</th>
                  <th className="px-4 py-2 text-left font-semibold">Pedidos</th>
                  <th className="px-4 py-2 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((order) => {
                  const totalPrice = calculateTotalPrice(order);
  
                  return (
                    <tr className="focus:outline-none h-16 border border-gray-100 rounded" key={order._id}>
                      <td className="px-4 text-center">
                        <p className="text-base font-medium leading-none text-gray-700">
                          {order.orderNumber}
                        </p>
                      </td>
                      <td>
                        <div className="ml-5">
                          <div className="flex items-center">
                            <p className="text-base font-medium leading-none text-gray-700">
                              {order.userEmail} {order.userName} {order.userLastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4">
                        <span className={`text-base font-medium leading-none ${getStatusColor(order.status)}`}>
                          {imageToRender}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center pl-5">
                          <p className="text-base font-medium leading-none text-gray-700">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 text-center">
                        <p className="text-left text-base font-medium leading-none text-gray-700">
                          ${formatPrice(totalPrice)}
                        </p>
                      </td>
                      <td className="pl-4">
                        <button
                          className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                          onClick={() => openModal(order._id)}
                        >
                          Ver pedido
                        </button>
                      </td>
                      <td className="text-center pl-5">
                        <div className="relative">
                          <button
                            className="inline-flex items-center p-2 text-gray-500 hover:bg-gray-100 focus:outline-none rounded"
                            onClick={() => setDropdownOpen(dropdownOpen === order._id ? null : order._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M4 6.5L8 10.5L12 6.5" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                          {dropdownOpen === order._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                              <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleStatus(order._id, "En Progreso")}
                              >
                                En progreso
                              </button>
                              <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleStatus(order._id, "Listo")}
                              >
                                Listo
                              </button>
                              <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleStatus(order._id, "Eliminar")}
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <OrderModal onClose={closeModal} order={orderData} />}
    </div>
  );
  
  
};

export default Orders;
