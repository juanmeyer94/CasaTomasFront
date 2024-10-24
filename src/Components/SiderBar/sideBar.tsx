import React, { useState } from "react";
import useUserContext from "../../Utils/contextUserHook";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";


type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
  types: string[];
  specialContent?: React.ReactNode;
};


const categories: Category[] = [
  {
    name: "Máquinas de coser",
    subcategories: [
      {
        name: "Maquinas Industriales",
        types: ["Rectas", "Overlock", "Collaretas", "Recta y zig zag", "Doble arrastre", "Triple arrastre"]
      },
      {
        name: "Maquinas Familiares",
        types: ["Máquina de coser", "Collareta", "Overlock"]
      },
      {
        name: "Repuestos y reparaciones",
        types: [],
        specialContent: (
          <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Repuestos y reparaciones
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Consultar por estos medios.
            </p>
            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
              <li>
                <a
                  href="https://www.facebook.com/casa.tomas.rafaela"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/casatomas.rafaela/?hl=es"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="tel:03492422683" className="text-blue-600 dark:text-blue-500 hover:underline">
                  (03492) 422683
                </a>
              </li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    name: "Mercería",
    subcategories: [
      { name: "Hilos", types: ["Hilos de bordar y de tejer", "Hilos de costura", "Hilos para manualidades"] },
      { name: "Puntillas", types: ["Puntillas de Nylon", "Puntillas de Algodon", "Puntillas de Lycra", "Puntillas de Broderie", "Puntillas de Guipure", "Flecos"] },
      { name: "Agujas", types: ["Agujas para Máquinas", "Agujas de mano", "Agujas de Lana", "Agujas de tejer y crochet", "Alfileres y accesorios"] },
      { name: "Apliques y abrojos", types: ["Apliques", "Abrojos"] },
      { name: "Reparadores", types: ["Parches y reparadores"] },
      { name: "Elásticos", types: ["Elásticos de Algodon", "Elásticos de Poliester", "Elásticos Redondos", "Elásticos Afelpados", "Elásticos Bretel", "Elásticos Quebrados", "Elásticos Lencería"] },
      { name: "Tijeras", types: ["Tijeras", "Herramientas"] },
      { name: "Lubricantes y pegamentos", types: ["Lubricantes", "Pegamento"] },
      { name: "Cintas", types: ["Cinta de Raso", "Cinta Gross", "Cinta Bies", "Cinta Mochilera", "Cinta Fantasía", "Galones","Cinta Hilera", "Herrajes"] },
      { name: "Cierres", types: ["Cierre Común Fijo", "Cierre Reforzado Fijo", "Cierre Reforzado Desmontable", "Cierre D. de Perro", "Cierre Perrito", "Cierre de Aluminio y Empavonado", "Cierre Fijo Bronce", "Cierre Inivisible", "Cierre por Metro y Deslizadores"] },
      { name: "Cordones", types: ["Cordón de Zapato", "Cordón de Zapatilla", "Cordón de Borcego", "Cordón Polipropireno", "Cordón de Raso"] },


    ]
  }
];

const AccordionItem: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  specialContent?: React.ReactNode;
}> = ({ title, children, isOpen, onClick, specialContent }) => (
  <div>
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full py-2 px-3 font-medium text-left text-gray-900 border-b border-gray-900"
    >
      <span className="xl:text-lg text-base">{title}</span>
      {isOpen ? <ChevronUp className="absolute right-3 w-4 h-4" /> : <ChevronDown className="w-4 h-4 absolute right-3" />}
    </button>
    {isOpen && (
      <div className="py-2 px-3 ">
        {specialContent ? specialContent : children}
      </div>
    )}
  </div>
);

const SideBar: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { Filters, setFilters } = useUserContext();

  const handleAccordionToggle = (accordionId: string) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const handleTypeChange = (type: string) => {
    setFilters({ ...Filters, type });
    if (window.innerWidth < 450) {
      setIsSidebarOpen(false);
    }
  };

  const handleSubsectionChange = (subsection: string) => {
    setFilters({ ...Filters, subsection, type: "all" });
  };

  return (
    <div className="relative flex flex-col">
      <button
        className="absolute top-4 left-4 z-50 block sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-sky-600" />}
      </button>

      <div
        className={`w-44 2xl:w-56 xl:w-52 lg:w-52 md:w-44 xs:w-44 bg-gray-50 text-sky-600 p-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 absolute z-30 w-screen" : "-translate-x-full hidden"
        } sm:translate-x-0 sm:block`}
      >
        {categories.map((category, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl text-center font-bold mb-2 md:text-2xl md:mb-1 xs:text-2xl border-t border-b border-solid border-sky-500">
              {category.name}
            </h2>
            {category.subcategories.map((subcategory, subIndex) => (
              <AccordionItem
                key={subIndex}
                title={subcategory.name}
                isOpen={openAccordion === `${index}-${subIndex}`}
                onClick={() => {
                  handleAccordionToggle(`${index}-${subIndex}`);
                  if (!subcategory.specialContent) {
                    handleSubsectionChange(subcategory.name);
                  }
                }}
                specialContent={subcategory.specialContent}
              >
                <ul className="pl-4 text-md md:text-base">
                  {subcategory.types.map((type, typeIndex) => (
                    <li key={typeIndex} className="mb-1">
                      <button
                        className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-lg text-sm text-left"
                        onClick={() => handleTypeChange(type)}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;