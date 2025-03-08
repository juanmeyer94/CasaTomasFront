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
      <div className="flex rounded-xl items-center justify-center flex-col p-8 font-bold text-2xl">
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
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="blue"
            strokeWidth="5"
            strokeDasharray="126"
            strokeDashoffset="0"
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
  }

  if (error) {
    return (
      <div>
        Error: Se produjo un error, por favor vuelve a intentarlo nuevamente.
        Disculpe las molestias
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-start min-[319px]:ml-0 min-[319px]:justify-center min-[319px]:mt-12 px-6">
        <SearchBarr />
      </div>
      {Filters.subsection === "all" &&
        Filters.type === "all" &&
        SearchBar === "" && (
          <section className="min-[319px]:w-[300px] sm:w-full p-8">
            <OfferCarousel />
          </section>
        )}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
          {currentPosts
            .filter((item: ObjectType) => item.filter === false)
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
              />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center m-4 p-4">
          <h1>No se encontró lo que buscas, disculpen las molestias.</h1>
        </div>
      )}
      <div className="flex justify-center mt-4 mb-4 space-x-4">
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

      <ExitIntentOfferModal />
    </div>
  );
}


export default GeneralContainer