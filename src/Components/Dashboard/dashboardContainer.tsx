import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, DocumentMinusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import GeneralAdmDash from './GeneralDash/GeneralDash';
import Orders from './Orders/Orders';
import NewProduct from './Products/NewProducts';
import Products from './Products/Products';
import useAdminContext from '../../Utils/contextAdminHook';
import useUserContext from '../../Utils/contextUserHook';

const DashContainer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [component, setComponent] = useState('Dashboard');
  const {getAllItems} = useUserContext();

  const { logoutAdmin, getOrders} = useAdminContext();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1400);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle component change
  const handleEvent = (componentName: string) => {
    setComponent(componentName);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // Determine which component to render
  let componentToRender;
  switch (component) {
    case 'Dashboard':
      componentToRender = <GeneralAdmDash />;
      break;
    case 'Orders':
      componentToRender = <Orders />;
      break;
    case 'Products':
      componentToRender = <Products />;
      break;
    case 'NewProduct':
      componentToRender = <NewProduct setComponent={handleEvent} />;
      break;
    default:
      componentToRender = <GeneralAdmDash />;
  }

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      getOrders();
      isMounted.current = true;
    }
  }, [getOrders]);
  

  return (
    <>
      {/* Button to toggle sidebar on mobile */}
      <button
        onClick={handleSidebarToggle}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-800 text-white rounded-full focus:outline-none"
      >
        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <DocumentMinusIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:relative md:min-h-screen md:h-auto bg-sky-300 text-gray-700 flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 `}
        >
        <div className={isLargeScreen ? "flex items-center justify-center h-16 bg-sky-600 w-64 " : "flex items-center justify-center h-16 bg-sky-600 w-48 "}>
          <h1 className="text-xl font-bold text-white">Casa Tomas</h1>
        </div>
        <nav className="flex flex-col mt-12">
          <button onClick={() => handleEvent('Dashboard')} className={isLargeScreen ? "p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full" : "p-2 pl-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-base w-[70%] rounded-r-full"}>
            General
          </button>
          <button onClick={() => handleEvent('Orders')} className={isLargeScreen ? "p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full" : "p-2 pl-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-base w-[70%] rounded-r-full"}>
            Órdenes
          </button>
          <div>
            <button
              onClick={handleDropdownToggle}
              className={isLargeScreen ? "p-4  flex items-center justify-center hover:bg-sky-00 focus:outline-none font-semibold text-lg hover:bg-sky-500 w-[90%] rounded-r-full" : "p-2 pl-4 flex items-center justify-center hover:bg-sky-00 focus:outline-none font-semibold text-base hover:bg-sky-500 w-[70%] rounded-r-full"}
            >
              <h1 className=''>Productos</h1>
              {isDropdownOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="bg-sky-300 font-semibold ">
                <button onClick={() =>{ handleEvent('Products'), getAllItems()}} className={isLargeScreen ? "p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full" : "p-2 -mr-6 text-center hover:bg-sky-500 focus:outline-none font-semibold text-base w-[80%] rounded-r-full"}>
                  Mis Productos
                </button>
                <button onClick={() => handleEvent('NewProduct')} className={isLargeScreen ? "p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full" : "p-2 text-center -mr-6 hover:bg-sky-500 focus:outline-none font-semibold text-base w-[80%] rounded-r-full"}>
                  Agregar Producto
                </button>
              </div>
            )}
          </div>
          <button className={isLargeScreen ? "p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full" : "p-2 pl-4 text-center hover:bg-red-500 focus:outline-none font-semibold text-base w-[70%] rounded-r-full"} onClick={logoutAdmin}>
            Salir
          </button>
        </nav>
       <div className=''>
        <img src="/LOGO.png" alt="" className='absolute bottom-4 h-[10%] ml-8' />
       </div>
      </div>

      {/* Render the selected component */}
      <div className={`transition-all duration-300 w-full over ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {componentToRender}
      </div>
    </>
  );
};

export default DashContainer;
