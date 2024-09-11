import React from "react";
import { render, screen } from "@testing-library/react";
import CartModal from "../Cart/cartModal";
import { BrowserRouter } from "react-router-dom";
import useUserContext from "../../Utils/contextUserHook";


const handleCartModalMock = jest.fn();


jest.mock("../../Utils/contextUserHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  useUserContext.mockReturnValue({
    AllObjects: [
      {
        data: {
          _id: "66cb7f583ffc4966db89a0a9",
          items: [{ name: "Producto 1", marca: "Marca 1", price: "100", photo: ["url1"] }],
          section: "Sección 1",
          subsection: "Subsección 1",
          offer: "Oferta 1",
        },
      },
      {
        data: {
          _id: "66cb6b7d3ffc4966db896d4c",
          items: [{ name: "Producto 2", marca: "Marca 2", price: "200", photo: ["url2"] }],
          section: "Sección 2",
          subsection: "Subsección 2",
          offer: "Oferta 2",
        },
      },
    ],
   cart: [
    {
      id: "66cb7f583ffc4966db89a0a9",
      quantities: {
        "Negro": 1,
        "Blanco": 1
      },
      models: {}
    },
    {
      id: "66cb6b7d3ffc4966db896d4c",
      quantities: {
        "Modelo 1": 1
      },
      models: {}
    }
  ],
    sendOrder: jest.fn(),
    removeCart: jest.fn(),
    });
  });
describe("CartModal Component", () => {
  
  test("debe mostrar los elementos del carrito correctamente", () => {
    render(
      
        <BrowserRouter>
          <CartModal handleCartModal={handleCartModalMock} />
        </BrowserRouter>
    );


  console.log(screen)

    // Verificar que los nombres y marcas de los productos están presentes
    expect(screen.getByText("Marca 1 Producto 1")).toBeInTheDocument();
  });


});
