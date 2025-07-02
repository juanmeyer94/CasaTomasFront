import React from "react";
import UserCard from "../Card/userCard";
import SearchBarr from "../SearchBar/searchBar";
import useUserContext from "../../Utils/contextUserHook";
import { ObjectType } from "../../Interfaces/interfacesIndex";
import OfferCarousel from "../carrousel/OfferCarrousel";
import ExitIntentOfferModal from "../../Utils/exit-window";

const GeneralContainer: React.FC = () => {
  const {
    currentPosts,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
    FilteredObjects,
    postPerPage,
    Filters,
    SearchBar,
  } = useUserContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 font-bold text-2xl">
        <h1>Cargando...</h1>
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="20" stroke="gray" strokeWidth="5" fill="none" />
          <circle cx="25" cy="25" r="20" stroke="blue" strokeWidth="5" strokeDasharray="126" strokeDashoffset="0" fill="none">
            <animate attributeName="stroke-dashoffset" values="0;126" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
        <p>Casa Tomas - 100 años cosiendo juntos.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <p>Error: Se produjo un error, por favor vuelve a intentarlo nuevamente. Disculpe las molestias.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Barra de búsqueda */}
      <div className="w-full flex justify-center px-6 mt-12">
        <SearchBarr />
      </div>

      {/* Carrusel de ofertas (ocupa el ancho total de la pantalla) */}
      {Filters.subsection === "all" && Filters.type === "all" && SearchBar === "" && currentPage === 1 && (
        <section className="w-full p-8 min-[319px]:p-0">
          <OfferCarousel />
        </section>
      )}

      {/* Tarjetas de productos */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6 w-full max-w-screen items-center justify-items-center">
          {currentPosts
            .filter((item: ObjectType) => !item.filter)
            .map((item: ObjectType) => (
              <UserCard
                key={item._id}
                _id={item._id}
                marca={item.data.items[0].marca}
                name={item.data.items[0].name}
                photo={item.data.items[0].photo}
                price={item.data.items[0].price}
                summary={item.data.items[0].summary}
                description={item.data.items[0].description}
                specsTecs={item.data.items[0].specsTecs}
                wholesalePrice={item.data.items[0].wholesalePrice}
                quantity={item.data.items[0].quantity}
                offer={item.offer}
                code={item.data.items[0].code}
                colours={item.data.items[0].colours}
              />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full m-4 p-4">
          <h1>No se encontró lo que buscas, disculpen las molestias.</h1>
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-4 mb-4 space-x-4">
        <button
          onClick={() => {
            prevPage(),
            window.scrollTo(0, 80)
          }}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
        >
          Anterior
        </button>
        <p className="text-center text-base font-semibold mt-2">{currentPage}</p>
        <button
          onClick={() => {
            nextPage(),
            window.scrollTo(0, 80)
          }}
          disabled={currentPage === Math.ceil(FilteredObjects.length / postPerPage)}
          className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>

      <ExitIntentOfferModal />
    </div>
  );
};

export default GeneralContainer;
