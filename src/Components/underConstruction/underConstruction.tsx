export const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">En mantenimiento</h1>
      <p className="text-xl text-gray-600 mb-8">Esta función se encuentra bajo mantenimiento, por favor vuelve a intentar más tarde.</p>
      <img src="/mantenimiento.jpeg" alt="Under Construction" className="w-1/2 max-w-md rounded-xl"/>
    </div>
  );
};

