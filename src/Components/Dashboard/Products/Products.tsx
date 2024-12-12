
import React, { useState } from "react";
import useUserContext from "../../../Utils/contextUserHook";
import { ObjectType } from "../../../Interfaces/interfacesIndex";
import SearchBar from "../../SearchBar/searchBar";
import useAdminContext from "../../../Utils/contextAdminHook";
import AdminCard from "./AdminCard/adminCard";
import AdmSearchBar from "../../AdmSearchBar/AdmSearchBar";

const Products: React.FC = () => {
  const {
    currentPosts,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
    FilteredObjects,
    postPerPage,
    showHideItems,
  } = useUserContext();

  const { isAuth } = useAdminContext();

  const [showHiddenItems, setShowHiddenItems] = useState<boolean>(true);

   const toggleHiddenItems = () => {
    setShowHiddenItems(!showHiddenItems);
    showHideItems(showHiddenItems)
  };

  if (loading) {
    return (
      <div className="flex rounded-xl items-center justify-center flex-col p-8 font-bold text-2xl bg-sky-100 h-screen">
        <h1>Cargando...</h1>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="gray"
            stroke-width="5"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="blue"
            stroke-width="5"
            stroke-dasharray="126"
            stroke-dashoffset="0"
            fill="none"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;126"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <p>Casa Tomas - 100 años cosiendo juntos.</p>
      </div>
    );
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-6 pt-6 ml-5 bg-sky-100 h-auto">
      <div className="flex items-center space-x-4 mb-4">
        <AdmSearchBar />
        <SearchBar />
        <button
          onClick={toggleHiddenItems}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {!showHiddenItems ? "Dejar de Mostrar Ítems Ocultos" : "Mostrar Ítems Ocultos"}
        </button>
      </div>
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 min-[1700px]:grid-cols-5 gap-0 ">
          {currentPosts.map((item: ObjectType) => (
            <AdminCard
              key={item._id}
              _id={item._id}
              marca={item.data.items[0].marca}
              name={item.data.items[0].name}
              photo={item.data.items[0].photo}
              price={item.data.items[0].price}
              summary={item.data.items[0].summary}
              wholesalePrice={item.data.items[0].wholesalePrice}
              offer={item.offer}
              code={item.data.items[0].code}
              quantity={item.data.items[0].quantity}
              description={item.data.items[0].description}
              specsTecs={item.data.items[0].specsTecs}
              filter={item.filter}
              isAuth={isAuth}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center m-4 p-4">
          <h1>No se encontró lo que buscas, disculpen las molestias.</h1>
        </div>
      )}
      <div className="flex justify-center space-x-2 pb-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
        >
          Anterior
        </button>
        <p className="text-center justify-center text-base font-semibold mt-2">
          {currentPage}
        </p>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(FilteredObjects.length / postPerPage)
          }
          className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Products;
