import { newItem } from "../../../Services/adminServices/adminServices";
import Swal from "sweetalert2";
import AdminCard from "./AdminCard/adminCard";
import ColorPicker from "../DashUtils/ColorPicker";
import colors from "../../../../public/colours/coloursIndex.json";
import { useState, RefObject } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import useUserContext from "../../../Utils/contextUserHook";
import { NewProductState } from "../../../Interfaces/interfacesIndex";

// Interfaz para las props del componente
interface DataItemCardsProps {
  newProduct: NewProductState;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProductState>>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveImage: (index: number) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  setComponent: (componentName: string) => void;
}

const DataItemCards: React.FC<DataItemCardsProps> = ({
  newProduct,
  setNewProduct,
  onImageUpload,
  handleRemoveImage,
  fileInputRef,
  setComponent,
}) => {
  const { getAllItems } = useUserContext();
  const [hasOrNot, setHasOrNot] = useState<string>("NOT_SELECTED");

  const updateModel = (index: number, modelName: string) => {
    setNewProduct(prev => {
      const updatedModels = [...prev.data.items[0].models];
      updatedModels[index] = modelName;
      return {
        ...prev,
        data: {
          ...prev.data,
          items: [
            {
              ...prev.data.items[0],
              models: updatedModels,
            },
          ],
        },
      };
    });
  };
  
  // Modificación de addModel para manejar el nuevo modelo
  const addModel = (modelName: string) => {
    const newModelName = modelName.trim() || `Modelo ${newProduct.data.items[0].models.length + 1}`;
    setNewProduct(prev => {
      const updatedModels = [...prev.data.items[0].models, newModelName];
      return {
        ...prev,
        data: {
          ...prev.data,
          items: [
            {
              ...prev.data.items[0],
              models: updatedModels,
            },
          ],
        },
      };
    });
  };

  const removeModel = (modelName: string) => {
    setNewProduct(prev => {
      const updatedModels = prev.data.items[0].models.filter(
        model => model !== modelName
      );
      return {
        ...prev,
        data: {
          ...prev.data,
          items: [
            {
              ...prev.data.items[0],
              models: updatedModels,
            },
          ],
        },
      };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      data: {
        ...prev.data,
        items: [
          {
            ...prev.data.items[0],
            [name]: value,
          },
        ],
      },
    }));
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      data: {
        ...prev.data,
        items: [
          {
            ...prev.data.items[0],
            [name]: value,
          },
        ],
      },
    }));
  };

  const handleOffer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const isOffer = value === "Si";
    setNewProduct({
      ...newProduct,
      offer: isOffer,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await newItem(newProduct);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La operación se realizó correctamente.",
      }).then(function () {
        getAllItems();
        setComponent("Products");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al realizar la operación.",
      });

      console.error("Error:", error);
    }
  };



  return (
    <div className="col-span-12 flex flex-col min-[1400px]:flex-row min-[1400px]:h-screen">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center min-[1400px]:h-screen p-6">
          <div className="w-full max-w-xl bg-sky-300 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-50 mb-2">
              Información General del Producto
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col">
              <input
                placeholder="Marca"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="marca"
                value={newProduct.data.items[0].marca}
                onChange={handleChange}
              />
              <input
                placeholder="Modelo"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="name"
                value={newProduct.data.items[0].name}
                onChange={handleChange}
              />
              <input
                placeholder="Código"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="code"
                value={newProduct.data.items[0].code}
                onChange={handleChange}
              />
              <input
                placeholder="Precio"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="price"
                value={newProduct.data.items[0].price}
                onChange={handleChange}
              />
              <input
                placeholder="Resumen"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="summary"
                value={newProduct.data.items[0].summary}
                onChange={handleChange}
              />
              <textarea
                placeholder="Descripción general"
                className="bg-sky-200 text-gray-800 font-semibold border-0 rounded-md p-2 mb-4 focus:bg-sky-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="description"
                value={newProduct.data.items[0].description}
                onChange={handleChangeTextArea}
              ></textarea>
              {/* has or not */}
              <div className="p-4">
                {(() => {
                  switch (hasOrNot) {
                    case "MODELS":
                      return (
                        <div className="flex flex-col">
                        <div className="px-4 py-2 text-white font-bold">
                          <h2 className="text-lg mb-2">Seleccionar cantidad de modelos</h2>
                          <div className="py-2 px-2 rounded-lg ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                              {newProduct.data.items[0].models.map((model, index) => (
                                <div key={index} className="flex items-center space-x-2 text-gray-700">
                                  <input
                                    type="text"
                                    placeholder={`....`}
                                    value={model}
                                    onChange={(e) => updateModel(index, e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => removeModel(model)}
                                    aria-label="Eliminar modelo"
                                  >
                                    <ArrowLeftCircleIcon className="w-6 h-6" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition ease-in-out duration-150"
                              onClick={() => addModel("")}
                            >
                              Agregar modelo
                            </button>
                          </div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none mt-4"
                          onClick={(e) => {
                            e.preventDefault();
                            setHasOrNot("NOT_SELECTED");
                          }}
                          aria-label="Eliminar"
                        >
                          <ArrowLeftCircleIcon className="w-6 h-6" />
                        </button>
                      </div>
                      );
                    case "COLOURS":
                      return (
                        <div className="flex items-center space-x-4">
                          <ColorPicker
                            setNewProduct={setNewProduct}
                            colors={colors}
                          />
                          <button
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                            onClick={(e) => {
                              e.preventDefault();
                              setHasOrNot("NOT_SELECTED");
                            }}
                            aria-label="Eliminar"
                          >
                            <ArrowLeftCircleIcon className="w-6 h-6" />
                          </button>
                        </div>
                      );

                    case "NOT_HAS":
                      return (
                        <div className="flex flex-col items-center space-y-4">
                          <h1 className="text-lg font-semibold">
                            Producto único
                          </h1>
                          <button
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                            onClick={(e) => {
                              e.preventDefault();
                              setHasOrNot("NOT_SELECTED");
                            }}
                            aria-label="Eliminar"
                          >
                            <ArrowLeftCircleIcon className="w-6 h-6" />
                          </button>
                        </div>
                      );

                    case "NOT_SELECTED":
                      return (
                        <div className="flex space-x-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setHasOrNot("MODELS");
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition ease-in-out duration-150"
                          >
                            Seleccionar modelos
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setHasOrNot("COLOURS");
                            }}
                            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition ease-in-out duration-150"
                          >
                            Seleccionar colores
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setHasOrNot("NOT_HAS")
                              addModel(
                                `Modelo ${
                                  newProduct.data.items[0].models.length + 1
                                }`
                              );
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition ease-in-out duration-150"
                          >
                            Producto único
                          </button>
                        </div>
                      );

                    default:
                      return null;
                  }
                })()}
              </div>
              <p className="mt-4">Fotos del producto</p>
              <div>
                <div className="relative flex flex-col items-center p-4">
                  <input
                    type="file"
                    multiple
                    onChange={onImageUpload}
                    ref={fileInputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Seleccionar fotos
                  </button>
                </div>
              </div>
              <div>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleOffer}
                >
                  <option value="">¿Es una oferta?</option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
  
      <div className="flex-1 bg-sky-100 flex items-center justify-center mt-8 lg:mt-0">
        <AdminCard
          photo={newProduct?.data?.items[0].photo}
          marca={newProduct.data.items[0].marca}
          name={newProduct.data.items[0].name}
          summary={newProduct.data.items[0].summary}
          price={newProduct.data.items[0].price}
          _id="1"
          specsTecs={newProduct.data.items[0].specsTecs}
          description={newProduct.data.items[0].description}
          handleRemoveImage={handleRemoveImage}
        />
      </div>
    </div>
  );
  
};

export default DataItemCards;
