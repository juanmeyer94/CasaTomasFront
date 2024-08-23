import AdminCard from "./AdminCard/adminCard";
import ColorPicker from "../DashUtils/ColorPicker";
import colors from "../../../../public/colours/coloursIndex.json"
import { useState, useEffect, useRef } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import useUserContext from "../../../Utils/contextUserHook";
import useAdminContext from "../../../Utils/contextAdminHook";
import Swal from "sweetalert2";
import { uploadFileToCloudinary } from "../Cloudinary/Cloudinary";
import { NewProductState, ObjectType } from "../../../Interfaces/interfacesIndex";


interface EditProductProps {
  handleModal: () => void; 
  _id: string;
}

const EditProduct:React.FC<EditProductProps> = ({handleModal, _id}) => {
const { getAllItems, FilteredObjects } = useUserContext();
if (!_id) {
  console.error("No se proporcionó un id válido.");
  return; 
}

const productId: string = _id;
const {updateItem} = useAdminContext()
const [hasOrNot, setHasOrNot] = useState<string>("NOT_SELECTED");
const [updateProduct, setUpdateProduct] = useState<NewProductState>({
    offer: false,
    section: "",
    subsection: "",
    filter: false,
    data: {
      type: "",
      items: [
        {
          marca: "",
          name: "",
          photo: [],
          price: "",
          summary: "",
          description: "",
          specsTecs: "",
          colours: [],
          models: [],
          code:"",
        },
      ],
    },
})




  function convertObjectTypeToNewProductState(object: ObjectType): NewProductState {
    return {
      offer: object.offer,
      section: object.section,
      subsection: object.subsection,
      filter: object.filter,
      data: {
        type: object.data.type,
        items: object.data.items.map(item => ({
          marca: item.marca,
          name: item.name,
          photo: item.photo || [],
          price: item.price,
          summary: item.summary,
          description: item.description,
          specsTecs: item.specsTecs,
          colours: item.colours || [],
          models: item.models || [],
          code: item.code || "",
        })),
      },
    };
  }
  
  useEffect(() => {
    const producto = FilteredObjects.find((item) => item._id === _id);
    if (producto) {
      setUpdateProduct(convertObjectTypeToNewProductState(producto));
    }
  }, [_id, FilteredObjects]);
    
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateItem(productId, updateProduct);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "La operación se realizó correctamente.",
        }).then(() => {
          setTimeout(() => {
            getAllItems();
            handleModal();
            Swal.fire("Actualizado", "Tu producto ha sido actualizado.", "success");
          }, 1000);
  
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al realizar la operación.",
      });
      console.error("Error:", error);
    }
  };
  

const addModel = (modelName: string) => {
    setUpdateProduct(prev => {
      const updatedModels = [...prev.data.items[0].models, modelName];
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
    setUpdateProduct(prev => {
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
    setUpdateProduct(prev => ({
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
    setUpdateProduct(prev => ({
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
    setUpdateProduct({
      ...updateProduct,
      offer: isOffer,
    });
  };


    //subir imagenes
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      event.preventDefault();
      const target = event.target;
      const files = target.files ? Array.from(target.files) : [];
  
      if (files.length > 0) {
        try {
          // Subir archivos a Cloudinary y obtener las URLs
          const uploadedUrls = await Promise.all(
            files.map((file) => uploadFileToCloudinary(file))
          );
  
          // Actualizar el estado con las URLs de las imágenes subidas
          setUpdateProduct((prevState) => ({
            ...prevState,
            data: {
              ...prevState.data,
              items: prevState.data.items.map((item, index) => {
                if (index === 0) {
                  return {
                    ...item,
                    photo: [...item.photo, ...uploadedUrls],
                  };
                }
                return item;
              }),
            },
          }));
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      }
    };
  
    const handleRemoveImage = (index: number) => {
  
      setUpdateProduct((prevState) => {
  
        const updatedItems = prevState.data.items.map((item) => {
  
          const updatedPhotos = item.photo.filter(
            (_, imgIndex) => imgIndex != index
          );
          return {
            ...item,
            photo: updatedPhotos,
          };
        });
  
        return {
          ...prevState,
          data: {
            ...prevState.data,
            items: updatedItems,
          },
        };
      });
    };
  

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-h-[90vh] max-w-[140vh] p-6 relative overflow-y-auto">
      <button
        onClick={() => { setHasOrNot("NOT_SELECTED"); handleModal(); }}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Cerrar modal"
      >
        <ArrowLeftCircleIcon className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Información General del Producto</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
            <input
              placeholder="Marca"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="marca"
              value={updateProduct.data.items[0].marca}
              onChange={handleChange}
            />
            <input
              placeholder="Modelo"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="name"
              value={updateProduct.data.items[0].name}
              onChange={handleChange}
            />
            <input
              placeholder="Código"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="code"
              value={updateProduct.data.items[0].code}
              onChange={handleChange}
            />
            <input
              placeholder="Precio"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="price"
              value={updateProduct.data.items[0].price}
              onChange={handleChange}
            />
            <input
              placeholder="Resumen"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="summary"
              value={updateProduct.data.items[0].summary}
              onChange={handleChange}
            />
            <textarea
              placeholder="Descripción general"
              className="bg-gray-100 text-gray-800 font-semibold border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              name="description"
              value={updateProduct.data.items[0].description}
              onChange={handleChangeTextArea}
            ></textarea>
            {/* has or not */}
            <div className="p-4">
              {(() => {
                switch (hasOrNot) {
                  case "MODELS":
                    return (
                      <div className="flex flex-col">
                        <div className="px-2 py-0 text-gray-900 font-bold">
                          <h2>Seleccionar cantidad de modelos</h2>
                          <div className="py-2 px-2 rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {updateProduct.data.items[0].models.map((model, index) => (
                                <div key={index} className="flex items-center">
                                  <span className="text-gray-700 font-semibold">{model}</span>
                                  <button
                                    type="button"
                                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
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
                              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition ease-in-out duration-150"
                              onClick={() =>
                                addModel(`Modelo ${updateProduct.data.items[0].models.length + 1}`)
                              }
                            >
                              Agregar modelos
                            </button>
                          </div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdateProduct(prev => ({
                              ...prev,
                              data: {
                                ...prev.data,
                                items: [
                                  {
                                    ...prev.data.items[0],
                                    models: [],
                                  },
                                ],
                              },
                            }));
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
                        <ColorPicker setNewProduct={setUpdateProduct} colors={colors} />
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdateProduct(prev => ({
                              ...prev,
                              data: {
                                ...prev.data,
                                items: [
                                  {
                                    ...prev.data.items[0],
                                    colours: [],
                                  },
                                ],
                              },
                            }));
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
                        <h1 className="text-lg font-semibold">Producto único</h1>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdateProduct(prev => ({
                              ...prev,
                              data: {
                                ...prev.data,
                                items: [
                                  {
                                    ...prev.data.items[0],
                                    models: [],
                                  },
                                ],
                              },
                            }));
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
                            setHasOrNot("NOT_HAS");
                            addModel(`Modelo ${updateProduct.data.items[0].models.length + 1}`);
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
            <p className="mt-4 text-gray-900">Fotos del producto</p>
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
            <div>
              <select
                id="countries"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        <div className="flex-1 mt-6 lg:mt-0">
        <AdminCard
            photo={updateProduct?.data?.items[0].photo}
            marca={updateProduct.data.items[0].marca}
            name={updateProduct.data.items[0].name}
            summary={updateProduct.data.items[0].summary}
            price={updateProduct.data.items[0].price}
            _id="1"
            specsTecs={updateProduct.data.items[0].specsTecs}
            description={updateProduct.data.items[0].description}
            handleRemoveImage={handleRemoveImage}
          />
        </div>
      </div>
    </div>
  </div>
);
}


export default EditProduct;