import React, { useState, useEffect } from "react";
import useUserContext from "../../Utils/contextUserHook";

const SearchBar: React.FC = () => {
  const { setSearchQuery, SearchBar, removeFilters } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setSearchQuery(newValue);
  };

  const resetFilters = () => {
    removeFilters();
    setSearchTerm("");
  };

  useEffect(() => {
    if (!SearchBar) {
      setSearchTerm("");
    }
  }, [SearchBar]);


  return (
    <div className="w-full flex">
      <div className="relative min-w-[18.5%] 2xl:w-[18.5%] lg:w-[22%] md:w-[40%] xs:w-[30%] sm:w-[70%]">
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <img src="/lupa.png" alt="Ready Check" width="24" height="24" />
        </span>
        <input
          className="appearance-none border border-sky-600 rounded w-full h-10 py-2 px-3 text-gray-900 leading-tight focus:outline-none"
          type="text"
          placeholder="Buscador..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
        <div className="rounded-xl bg-red-400 text-xs flex items-center ml-2 lg:text-base">
          <button className="text-white font-semibold px-3 py-1"
          onClick={resetFilters}>
            Limpiar filtros
          </button>
        </div>
      
    </div>
  );
};


export default SearchBar;
