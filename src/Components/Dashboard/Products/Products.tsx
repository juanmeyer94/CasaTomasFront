import React, {useEffect} from "react";
import useUserContext from "../../../Utils/contextUserHook";
import { ObjectType } from "../../../Interfaces/interfacesIndex";
import SearchBar from "../../SearchBar/searchBar";
import useAdminContext from "../../../Utils/contextAdminHook";
import AdminCard from "./AdminCard/adminCard";

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
    setPostsPerPage,
  } = useUserContext();

  const {isAuth} = useAdminContext();

  if (loading) {
    return (
      <div className="flex rounded-xl items-center justify-center flex-col p-8 font-bold text-2xl">
        <h1>Cargando...</h1>
        <img src="/giphy.webp" alt="" className="rounded-full" />
        <p>Casa Tomas - 100 años cociendo juntos.</p>
      </div>
    );
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    const updateItemsPerPage = () => {
        if (window.innerWidth >= 1736) {
            setPostsPerPage(10); // 2xl
        } else if (window.innerWidth >= 1500) {
            setPostsPerPage(8); // xl
        } else if (window.innerWidth >= 1280) {
            setPostsPerPage(8); // lg
        } else if (window.innerWidth >= 1025) {
            setPostsPerPage(6); // default
        } else {
            setPostsPerPage(4); // sm
        }
    };

    window.addEventListener('resize', updateItemsPerPage);
    updateItemsPerPage();

    return () => window.removeEventListener('resize', updateItemsPerPage);
}, []);

  return (
    <div className="px-6 pt-6 mx-4">
        <SearchBar/>
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 min-[1700px]:grid-cols-5 gap-0 ">
          {currentPosts.map((item: ObjectType) => (
            <AdminCard
              key={item._id}
              _id={item._id}
              marca={item.data.items[0].marca}
              name={item.data.items[0].name}
              photo={item.data.items[0].photo}
              price={item.data.items[0].price}
              summary={item.data.items[0].summary}
              description={item.data.items[0].description}
              specsTecs={item.data.items[0].specsTecs}
              isAuth={isAuth}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center m-4 p-4">
          <h1>No se encontró lo que buscas, disculpen las molestias.</h1>
        </div>
      )}
       <div className="flex justify-center mt-2 mb-2 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
          >
           Anterior
          </button>
          <p className='text-center justify-center text-base font-semibold mt-2'>{currentPage}</p>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(FilteredObjects.length / postPerPage)}
            className="px-4 py-2 bg-sky-600 text-white rounded-xl disabled:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
    </div>
  );
};

export default Products;
