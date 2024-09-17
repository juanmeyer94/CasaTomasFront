import React, { useState, useEffect } from "react";
import useUserContext from "../../Utils/contextUserHook";

const AdmSearchBar: React.FC = () => {
  const { searchByCode, SearchBar } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    searchByCode(newValue);
  };


  useEffect(() => {
    if (!SearchBar) {
      setSearchTerm("");
    }
  }, [SearchBar]);


  return (
    <div className="w-auto flex flex-col mr-2">
      <div className="relative w-full mb-4 sm:ml-6 md:ml-0">
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 ">
          <img src="/lupa.png" alt="Ready Check" width="24" height="24" />
        </span>
        <input
          className="appearance-none border border-sky-600 rounded w-full h-10 py-2 px-3 text-gray-900 leading-tight focus:outline-none"
          type="text"
          placeholder="CÓDIGO..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
  export default AdmSearchBar;