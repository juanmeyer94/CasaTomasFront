import { useState, useRef } from "react";
import { uploadFileToCloudinary } from "../Cloudinary/Cloudinary";
import DropDown from "../DashUtils/DropDown";
import DataItemCards from "./finishNewProduct";
import { NewProductState } from "../../../Interfaces/interfacesIndex";
interface NewProductProps {
  setComponent: (componentName: string) => void;
}

const NewProduct: React.FC<NewProductProps> = ({setComponent}) => {
  const categorias = [
    {
      name: "Maquina",
      subtypes: ["Maquinas Industriales", "Maquinas Familiares"],
      title: "Seleccionemos la subcategoría de la Maquina",
    },
    {
      name: "Merceria",
      subtypes: [
        "Hilos",
        "Puntillas",
        "Agujas",
        "Apliques",
        "Reparadores",
        "Elásticos",
        "Tijeras",
        "Lubricantes y pegamentos",
        "Cintas",
        "Cierres",
        "Cordones",
      ],
      title: "Seleccionemos la subcategoría de la Mercería",
    },
  ];

  const subcategorias = [
    {
      name: "Maquinas Industriales",
      subtypes: [
        "Rectas",
        "Overlock",
        "Collaretas",
        "Recta y zig zag",
        "Doble arrastre",
        "Triple arrastre",
      ],
      title: "Seleccionemos la subcategoría de Máquinas Industriales",
    },
    {
      name: "Máquinas Familiares",
      subtypes: ["Máquina de coser", "Collareta", "Overlock"],
      title: "Seleccionemos la subcategoría de Máquinas Familiares",
    },
    {
      name: "Hilos",
      subtypes: [
        "Hilos de bordar y tejer",
        "Hilos de costura",
        "Hilos para manualidades",
      ],
      title: "Seleccionemos la subcategoría de Hilos",
    },
    {
      name: "Puntillas",
      subtypes: [
        "Puntillas de Nylon",
        "Puntillas de Algodon",
        "Puntillas de Lycra",
        "Puntillas de Borderie",
      ],
      title: "Seleccionemos la subcategoría de Puntillas",
    },
    {
      name: "Agujas",
      subtypes: [
        "Agujas para Máquinas",
        "Agujas de Mano",
        "Agujas de Lana",
        "Agujas de tejer y crochet",
        "Agujas varias y accesorios",
      ],
      title: "Seleccionemos la subcategoría de Agujas",
    },
    {
      name: "Apliques",
      subtypes: ["Apliques"],
      title: "Seleccionemos la subcategoría de Apliques",
    },
    {
      name: "Reparadores",
      subtypes: ["Parches y reparadores"],
      title: "Seleccionemos la subcategoría de Reparadores",
    },
    {
      name: "Elásticos",
      subtypes: [
        "Elásticos de Algodon",
        "Elásticos de Poliester",
        "Elásticos Redondos",
        "Elásticos afelpados",
        "Elásticos de Bretel",
        "Elásticos Quebrados",
        "Elásticos de Lencería",
      ],
      title: "Seleccionemos la subcategoría de Elásticos",
    },
    {
      name: "Tijeras",
      subtypes: ["Tijeras", "Herramientas"],
      title: "Seleccionemos la subcategoría de Tijeras",
    },
    {
      name: "Lubricantes y pegamentos",
      subtypes: ["Lubricantes", "Pegamentos"],
      title: "Seleccionemos la subcategoría de Lubricantes y pegamentos",
    },
    {
      name: "Cintas",
      subtypes: [
        "Cinta de Raso",
        "Cinta de Gross",
        "Cinta Bies",
        "Cinta Mochilera",
        "Cinta Fantasía",
        "Cinta Hilera",
      ],
      title: "Seleccionemos la subcategoría de Cintas",
    },
    {
      name: "Cierres",
      subtypes: [
        "Cierre Común Fijo",
        "Cierre Reforzado Fijo",
        "Cierre Reforzado Desmontable",
        "Cierre D. de Perro",
        "Cierre Perrito",
        " Cierre de Aluminio y Empavonado",
        "Cierre Invisible",
        "Cierre Fijo Bronce",
        "Cierre por metro y Deslizadores",
      ],
      title: "Seleccionemos la subcategoría de Cierres",
    },
    {
      name: "Cordones",
      subtypes: [
        "Cordón de Zapato",
        "Cordón de Zapatilla",
        "Cordón de Borcego",
        "Cordón de Polipropireno",
        "Cordón de Raso",
      ],
      title: "Seleccionemos la subcategoría de Cordones",
    },
  ];

  const [newProduct, setNewProduct] = useState<NewProductState>({
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
        },
      ],
    },
  });
  const [showCard, setShowCard] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleCardClick = (clickedSection: string) => {
    setNewProduct({
      ...newProduct,
      section: clickedSection,
    });
  };
  //manejamos las sections
  let SectionOptions;

  const handleSubSection = (clickedSection: string) => {
    setNewProduct({
      ...newProduct,
      subsection: clickedSection,
    });
  };

  switch (newProduct.section) {
    case "Maquina":
      const isEqual = categorias.find((item) => item.name === "Maquina");
      if (isEqual) {
        SectionOptions = <DropDown {...isEqual} func={handleSubSection} />;
      }
      break;

    case "Merceria":
      const isEqual2 = categorias.find((item) => item.name === "Merceria");
      if (isEqual2) {
        SectionOptions = <DropDown {...isEqual2} func={handleSubSection} />;
      }
      break;
  }

  //manejando subsections de manera mas independiente
  let typesOptions;

  const handleTypeChange = (newType: string) => {
    setNewProduct((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        type: newType,
      },
    }));
    setDropdownVisible(!isDropdownVisible);
  };

  switch (newProduct.subsection) {
    case "Maquinas Familiares":
      const isEqual5 = subcategorias.find(
        (item) => item.name === "Máquinas Familiares"
      );
      if (isEqual5) {
        typesOptions = <DropDown {...isEqual5} func={handleTypeChange} />;
      }
      break;
    case "Maquinas Industriales":
      const industriales = subcategorias.find(
        (item) => item.name === "Maquinas Industriales"
      );
      if (industriales) {
        typesOptions = <DropDown {...industriales} func={handleTypeChange} />;
      }
      break;
    case "Hilos":
      const Hilos = subcategorias.find((item) => item.name === "Hilos");
      if (Hilos) {
        typesOptions = <DropDown {...Hilos} func={handleTypeChange} />;
      }
      break;
    case "Puntillas":
      const Puntillas = subcategorias.find((item) => item.name === "Puntillas");
      if (Puntillas) {
        typesOptions = <DropDown {...Puntillas} func={handleTypeChange} />;
      }
      break;
    case "Agujas":
      const Agujas = subcategorias.find((item) => item.name === "Agujas");
      if (Agujas) {
        typesOptions = <DropDown {...Agujas} func={handleTypeChange} />;
      }
      break;
    case "Apliques":
      const Apliques = subcategorias.find((item) => item.name === "Apliques");
      if (Apliques) {
        typesOptions = <DropDown {...Apliques} func={handleTypeChange} />;
      }
      break;
    case "Elásticos":
      const Elásticos = subcategorias.find((item) => item.name === "Elásticos");
      if (Elásticos) {
        typesOptions = <DropDown {...Elásticos} func={handleTypeChange} />;
      }
      break;
    case "Reparadores":
      const Reparadores = subcategorias.find(
        (item) => item.name === "Reparadores"
      );
      if (Reparadores) {
        typesOptions = <DropDown {...Reparadores} func={handleTypeChange} />;
      }
      break;
    case "Tijeras":
      const Tijeras = subcategorias.find((item) => item.name === "Tijeras");
      if (Tijeras) {
        typesOptions = <DropDown {...Tijeras} func={handleTypeChange} />;
      }
      break;
    case "Lubricantes y pegamentos":
      const Lubricantesypegamentos = subcategorias.find(
        (item) => item.name === "Lubricantes y pegamentos"
      );
      if (Lubricantesypegamentos) {
        typesOptions = (
          <DropDown {...Lubricantesypegamentos} func={handleTypeChange} />
        );
      }
      break;
    case "Cintas":
      const Cintas = subcategorias.find((item) => item.name === "Cintas");
      if (Cintas) {
        typesOptions = <DropDown {...Cintas} func={handleTypeChange} />;
      }
      break;
    case "Cierres":
      const Cierres = subcategorias.find((item) => item.name === "Cierres");
      if (Cierres) {
        typesOptions = <DropDown {...Cierres} func={handleTypeChange} />;
      }
      break;
    case "Cordones":
      const Cordones = subcategorias.find((item) => item.name === "Cordones");
      if (Cordones) {
        typesOptions = <DropDown {...Cordones} func={handleTypeChange} />;
      }
      break;
  }

  const handleShowCards = () => {
    setShowCard(!showCard);
  };

  //subir imagenes
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
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
        setNewProduct((prevState) => ({
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
    console.log("Índice de la imagen recibido:", index);

    setNewProduct((prevState) => {
      console.log("Estado anterior:", prevState);

      const updatedItems = prevState.data.items.map((item) => {
        console.log("Imágenes antes de eliminar:", item.photo);

        const updatedPhotos = item.photo.filter(
          (_, imgIndex) => imgIndex != index
        );

        console.log("Imágenes después de eliminar:", updatedPhotos);

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
    <div className="  bg-red-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        {!showCard ? (
          <>
            {!newProduct.section ? (
              <div className="col-span-12 flex flex-col items-center min-h-screen py-6">
                <div className="col-span-2 text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    ¿Qué tipo de producto vamos a ofrecer hoy?
                  </h1>
                  <p className="text-lg text-gray-600">
                    Selecciona una opción para comenzar a agregar productos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <div
                    className="relative flex justify-center items-center h-64 w-full sm:w-64 bg-cover bg-center rounded-lg shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer "
                    style={{
                      backgroundImage: "url('./src/assets/maqdash.jpg')",
                    }}
                    onClick={() => handleCardClick("Maquina")}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                      <h2 className="text-2xl font-semibold mb-2">
                        MAQUINAS DE COSER
                      </h2>
                      <p className="text-base">
                        ¿Una nueva máquina de coser? Hagámoslo, continuemos con
                        un click.
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative flex justify-center items-center h-64 w-full sm:w-64 bg-cover bg-center rounded-lg shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer"
                    style={{
                      backgroundImage: "url('./src/assets/merceria.jpg')",
                    }}
                    onClick={() => handleCardClick("Merceria")}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                      <h2 className="text-2xl font-semibold mb-2">MERCERIA</h2>
                      <p className="text-base">
                        ¿Un nuevo producto de mercería? Hagámoslo, continuemos
                        con un click.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-12 flex flex-col items-center min-h-screen py-6">
                <div className="text-center mb-12">
                  {newProduct.section === "Maquina" ? (
                    <div>
                      {SectionOptions}
                      {typesOptions}
                    </div>
                  ) : (
                    <div>
                      {SectionOptions}
                      {typesOptions}
                    </div>
                  )}
                </div>

                <button
                  className={`relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-sky-500 group-hover:from-purple-500 group-hover:to-sky-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 ${
                    isDropdownVisible ? "flex" : "hidden"
                  }`}
                  onClick={handleShowCards}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Todo listo, continuemos.
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <DataItemCards
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onImageUpload={handleFileChange}
            handleRemoveImage={handleRemoveImage}
            fileInputRef={fileInputRef}
            setComponent={setComponent}
          />
        )}
      </div>
    </div>
  );
};

export default NewProduct;
