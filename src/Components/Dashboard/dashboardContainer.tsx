import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import GeneralAdmDash from "./GeneralDash/GeneralDash";
import Orders from "./Orders/Orders";
import NewProduct from "./Products/NewProducts";
import Products from "./Products/Products";
import useAdminContext from "../../Utils/contextAdminHook";
import useUserContext from "../../Utils/contextUserHook";
import Swal from "sweetalert2";

const DashContainer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [component, setComponent] = useState("Dashboard");
  const { getAllItems } = useUserContext();
  const { logoutAdmin, getOrders, updatePrices, countPendingOrders } =
    useAdminContext();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle component change
  const handleEvent = (componentName: string) => {
    setComponent(componentName);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleUpdatePrices = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto actualizará los precios y puede tardar hasta 1 minuto.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        Swal.fire({
          title: "Actualizando precios...",
          text: "Esto puede tardar un momento.",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const result = await updatePrices();
        Swal.close();

        if (result.success) {
          getAllItems();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Los precios se actualizaron correctamente.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error
              ? `Error al actualizar los precios: ${result.error.message}`
              : `Error con el estado: ${result.status}`,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Operación cancelada",
          text: "La actualización de precios ha sido cancelada.",
        });
      }
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error inesperado al actualizar los precios: ${error}`,
      });
    }
  };

  // Determine which component to render
  let componentToRender;
  switch (component) {
    case "Dashboard":
      componentToRender = <GeneralAdmDash />;
      break;
    case "Orders":
      componentToRender = <Orders />;
      break;
    case "Products":
      componentToRender = <Products />;
      break;
    case "NewProduct":
      componentToRender = <NewProduct setComponent={handleEvent} />;
      break;
    default:
      componentToRender = <GeneralAdmDash />;
  }

  const isMounted = useRef(false);
  const pendingOrdersCount = countPendingOrders();

  useEffect(() => {
    if (!isMounted.current) {
      getOrders();
      countPendingOrders();
      isMounted.current = true;
    }
  }, [getOrders, countPendingOrders]);

  return (
    <div>
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-sky-500 text-white rounded-full"
      >
        {isSidebarOpen ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        )}
      </button>
      {/* side bar */}
      <div>
        <div
          x-transition:enter="transform transition-transform duration-300"
          x-transition:enter-start="-translate-x-full"
          x-transition:enter-end="translate-x-0"
          x-transition:leave="transform transition-transform duration-300"
          x-transition:leave-start="translate-x-0"
          x-transition:leave-end="-translate-x-full"
          x-show="isSidebarOpen"
          className={`fixed inset-y-0 z-10 w-80 bg-sky-100 lg:flex ${isSidebarOpen ? 'translate-x-0 bg-opacity-0' : 'hidden'} transition-transform duration-300`}
        >
          <svg
            className="absolute inset-0 w-full h-full text-white"
            preserveAspectRatio="none"
            viewBox="0 0 309 800"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
          </svg>

          <div className="z-10 flex flex-col flex-1 ">
            <nav className="flex flex-col flex-1 w-64 p-4 mt-6 z-50">
              <a
                href="#"
                onClick={() => handleEvent("Dashboard")}
                className="flex items-center space-x-2 p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none w-[90%] rounded-full"
              >
                <img src="/General.png" alt="" className="h-8 w-8" />
                <span>General</span>
              </a>

              <a
                href="#"
                onClick={() => handleEvent("Orders")}
                className="relative flex items-center space-x-2 p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none w-[90%] rounded-full"
              >
                <div className="relative flex items-center">
                  <img
                    src={
                      pendingOrdersCount > 0 ? "/Orders.png" : "/ToDoReady.png"
                    }
                    alt="Órdenes"
                    className="h-8 w-8"
                  />
                  {/* Contador de órdenes pendientes */}
                  {pendingOrdersCount > 0 && (
                    <div className="absolute top-[-25%] right-[-25%] flex items-center justify-center h-4 w-4 bg-red-600 text-white text-xs font-bold rounded-full">
                      {pendingOrdersCount}
                    </div>
                  )}
                </div>
                <span>Órdenes</span>
              </a>

              <div>
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center justify-between p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none w-[90%] rounded-full"
                >
                  <img
                    src="/store-settings.png"
                    alt=""
                    className="h-8 w-8 -mr-4"
                  />
                  <span>Productos</span>
                  {isDropdownOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="">
                    <a
                      href="#"
                      onClick={() => {
                        handleEvent("Products");
                        getAllItems();
                      }}
                      className="flex items-center space-x-2 p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none w-[90%] rounded-full"
                    >
                      <img src="/warehouse.png" alt="" className="h-8 w-8" />
                      <span>Mis Productos</span>
                    </a>
                    <a
                      href="#"
                      onClick={() => handleEvent("NewProduct")}
                      className="flex items-center space-x-2 p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none w-[100%] rounded-full"
                    >
                      <img src="/new-product.png" alt="" className="h-8 w-8" />
                      <span>Agregar Producto</span>
                    </a>
                    <a
                      href="#"
                      onClick={handleUpdatePrices}
                      className="flex items-center space-x-2 p-4 text-lg font-semibold hover:bg-sky-100 focus:outline-none rounded-full"
                    >
                      <img src="/change-price.png" alt="" className="h-8 w-8" />
                      <span>Actualizar Precios</span>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                onClick={logoutAdmin}
                className="flex items-center space-x-2 p-4 text-lg font-semibold text-red-400 hover:bg-red-100 focus:outline-none w-[90%] rounded-full"
              >
                <img src="/high-priority.png" alt="" className="h-8 w-8" />
                <span>Salir</span>
              </a>
            </nav>

            <div className="flex-shrink-0 p-4">
              <img
                src="/LOGO.png"
                alt="Logo"
                className="absolute bottom-4 h-[10%] ml-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Render the selected component */}
      <div className="ml-0 lg:ml-72 bg-sky-100 h-screen">{componentToRender}</div>
    </div>
  );
};

export default DashContainer;
