import React from "react";
//import SideBar from "../SiderBar/sideBar";
import NavBar from "../Navbar/navBar";
import Footer from "../Footer/Footer";
import ProductsBrandsCarrousel from "../carrousel/ProductsBrandsCaroussel";
import ResponsiveSidebar from "../SiderBar/responsive-sideBar";

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
      { name: "Hilos", types: ["Hilos de bordar y tejer", "Hilos de costura", "Hilos para manualidades"] },
      { name: "Puntillas", types: ["Puntillas de Nylon", "Puntillas de Algodon", "Puntillas de Lycra", "Puntillas de Broderie", "Puntillas de Guipure", "Flecos"] },
      { name: "Agujas", types: ["Agujas para Máquinas", "Agujas de mano", "Agujas de Lana", "Agujas de tejer y crochet", "Alfileres y accesorios"] },
      { name: "Apliques y abrojos", types: ["Apliques", "Abrojos"] },
      { name: "Reparadores", types: ["Parches y reparadores"] },
      { name: "Elásticos", types: ["Elásticos de Algodon", "Elásticos de Poliester", "Elásticos Redondos", "Elásticos Afelpados", "Elásticos Bretel", "Elásticos Quebrados", "Elásticos Lencería"] },
      { name: "Tijeras", types: ["Tijeras", "Herramientas"] },
      { name: "Lubricantes y pegamentos", types: ["Lubricantes", "Pegamento"] },
      { name: "Cintas", types: ["Cinta de Raso", "Cinta Gross", "Cinta Bies", "Cinta Mochilera", "Cinta Fantasía", "Galones","Cinta Hilera", "Herrajes"] },
      { name: "Cierres", types: ["Cierre Común Fijo", "Cierre Reforzado Fijo", "Cierre Reforzado Desmontable", "Cierre D. de Perro", "Cierre Perrito", "Cierre de Aluminio y Empavonado", "Cierre Fijo Bronce", "Cierre Inivisible", "Cierre por metro y Deslizadores"] },
      { name: "Cordones", types: ["Cordón de Zapato", "Cordón de Zapatilla", "Cordón de Borcego", "Cordón Polipropireno", "Cordón de Raso"] },


    ]
  }
];

export const LayoutWithNavBarAndFooter:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="flex flex-col h-screen">
    <NavBar />
    <div className="flex flex-grow">
      <ResponsiveSidebar categories={categories} />
      <div className="flex-grow flex justify-center">
        {children}
      </div>
    </div>
    <ProductsBrandsCarrousel/>
    <Footer />
  </div>
);

export const LayoutWithoutNavBarAndFooter:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="">
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  </div>
);


export const LayoutWithNavBar:React.FC <({ children:React.ReactNode})> = ({children}) => (
  <div className="">
    <NavBar />
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
    <Footer />
  </div>
);