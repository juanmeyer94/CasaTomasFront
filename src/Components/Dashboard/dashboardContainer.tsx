import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, DocumentMinusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import GeneralAdmDash from './GeneralDash/GeneralDash';
import Orders from './Orders/Orders';
import NewProduct from './Products/NewProducts';
import Products from './Products/Products';
import useAdminContext from '../../Utils/contextAdminHook';

const DashContainer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [component, setComponent] = useState('Dashboard');

  const { logoutAdmin, getOrders} = useAdminContext();



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
        className={`fixed inset-0 z-40 md:relative md:min-h-screen md:h-auto bg-sky-300 text-gray-700 flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
        <div className="flex items-center justify-center h-16 bg-sky-600 w-64 ">
          <h1 className="text-xl font-bold text-white">Casa Tomas</h1>
        </div>
        <nav className="flex flex-col mt-12">
          <button onClick={() => handleEvent('Dashboard')} className="p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full">
            General
          </button>
          <button onClick={() => handleEvent('Orders')} className="p-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full">
            Órdenes
          </button>
          <div>
            <button
              onClick={handleDropdownToggle}
              className="p-4  flex items-center justify-center hover:bg-sky-00 focus:outline-none font-semibold text-lg hover:bg-sky-500 w-[90%] rounded-r-full"
            >
              <h1 className='mr-2'>E-Commerce</h1>
              {isDropdownOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="bg-sky-300 font-semibold ">
                <button onClick={() => handleEvent('Products')} className="pl-4 py-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full">
                  Mis Productos
                </button>
                <button onClick={() => handleEvent('NewProduct')} className="pl-4 py-4 text-center hover:bg-sky-500 focus:outline-none font-semibold text-lg w-[90%] rounded-r-full">
                  Agregar Producto
                </button>
              </div>
            )}
          </div>
          <button className="p-4 text-center hover:bg-red-300 focus:outline-none font-semibold text-lg z-30 w-[90%] rounded-r-full" onClick={logoutAdmin}>
            Salir
          </button>
        </nav>
       <div className=''>
        <img src="/LOGO.png" alt="" className='absolute bottom-4 h-[20%] ml-8' />
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
