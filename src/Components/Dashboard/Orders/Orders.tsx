import { useState, useEffect } from "react";
import { compareDesc } from 'date-fns';
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pendiente':
        return <img src="/pending.png" alt="pendiente" className="w-8 h-8"/>
      case 'En Progreso':
        return <img src="/working.png" alt="en progreso" className="w-8 h-8"/>
      case 'Listo':
        return <img src="/ready.png" alt="listo" className="w-9 h-9"/>
      default:
        return <span className="text-gray-400 text-sm">Sin estado</span>;
    }
  };

  const filteredOrders = filterOrdersByStatus(selectedStatus);
  const sortedOrders = [...filteredOrders].sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt))
  );

  // Paginación
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex);

  // Resetear a página 1 cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header mejorado */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Pedidos
          </h1>
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
            Total: <span className="font-semibold text-indigo-600">{sortedOrders.length}</span> pedidos
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Filtros mejorados */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filtrar por estado:</span>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === 'Todos' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus("Todos")}
              >
                Todos ({orders.filter(o => !o.deleted).length})
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === 'Listo' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus("Listo")}
              >
                Listos ({orders.filter(o => o.status === 'Listo' && !o.deleted).length})
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === 'En Progreso' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus("En Progreso")}
              >
                En proceso ({orders.filter(o => o.status === 'En Progreso' && !o.deleted).length})
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === 'pendiente' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus("pendiente")}
              >
                Pendientes ({orders.filter(o => o.status === 'pendiente' && !o.deleted).length})
              </button>
            </div>
          </div>

          {/* Selector de items por página */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700 font-medium">Mostrar:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
                <option value={50}>50 por página</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} - {Math.min(endIndex, sortedOrders.length)} de {sortedOrders.length}
            </div>
          </div>

          {/* Tabla optimizada */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pedido N°</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-lg">No hay pedidos con este filtro</div>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => {
                  const totalPrice = calculateTotalPrice(order);
  
                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          #{order.orderNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          {order.userName} {order.userLastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusColor(order.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${formatPrice(totalPrice)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
                            onClick={() => openModal(order._id)}
                          >
                            Ver
                          </button>
                          <div className="relative">
                            <button
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={() => setDropdownOpen(dropdownOpen === order._id ? null : order._id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </button>
                            {dropdownOpen === order._id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 w-full text-left transition-colors"
                                  onClick={() => {
                                    handleStatus(order._id, "En Progreso");
                                    setDropdownOpen(null);
                                  }}
                                >
                                  En progreso
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 w-full text-left transition-colors"
                                  onClick={() => {
                                    handleStatus(order._id, "Listo");
                                    setDropdownOpen(null);
                                  }}
                                >
                                  Listo
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                                  onClick={() => {
                                    handleStatus(order._id, "Eliminar");
                                    setDropdownOpen(null);
                                  }}
                                >
                                  Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* Números de página */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Mostrar solo algunas páginas alrededor de la actual
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 text-gray-500">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <OrderModal onClose={closeModal} order={orderData} />}
    </div>
  );
  
  
};

export default Orders;
