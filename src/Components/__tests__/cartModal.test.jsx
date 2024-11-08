import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import CartModal from "../Cart/cartModal";
import { BrowserRouter } from "react-router-dom";
import useUserContext from "../../Utils/contextUserHook";
import {allProducts, mockCartItems} from "../__mocks__/cartModalMock"

const handleCartModalMock = jest.fn();

jest.mock("../../Utils/contextUserHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  useUserContext.mockReturnValue({
    AllObjects: allProducts,
    cart: mockCartItems,
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
    expect(screen.getByText("Marca 1 Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Marca 2 Producto 2")).toBeInTheDocument();

  });


  test("debe renderizar el título correctamente", () => {
    render(
        <BrowserRouter>
          <CartModal handleCartModal={handleCartModalMock} />
        </BrowserRouter>
    );

    expect(screen.getByText("Tu carrito")).toBeInTheDocument();
  });

  it("debe cerrar el modal cuando se hace clic en el botón de cierre", () => {
    render(
        <BrowserRouter>
          <CartModal handleCartModal={handleCartModalMock} />
        </BrowserRouter>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    closeButton.click();
    expect(handleCartModalMock).toHaveBeenCalledTimes(1);
  });

  test("debe mostrar 'Tu carrito está vacío' cuando no hay elementos en el carrito", () => {
    useUserContext.mockReturnValueOnce({
      AllObjects: [],
      cart: [], 
      sendOrder: jest.fn(),
      removeCart: jest.fn(),
    });
    render(

        <BrowserRouter>
          <CartModal handleCartModal={handleCartModalMock} />
        </BrowserRouter> 
    );

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });
});
