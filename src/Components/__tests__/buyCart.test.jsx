import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import useUserContext from "../../Utils/contextUserHook";
import BuyCart from "../Cart/buyCart";
import { mockProducts } from "../__mocks__/productsMock";

jest.mock("../../Utils/contextUserHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("BuyCart", () => {
  const mockSendOrder = jest.fn();
  const mockRemoveCart = jest.fn();

  beforeEach(() => {
    useUserContext.mockReturnValue({
      cart: [],
      buyCart:mockProducts,
      sendOrder: mockSendOrder,
      removeCart: mockRemoveCart,
    });
  });

  test("renders the buyCart with correct subtotal", () => {
    render(
        <BuyCart />
    );

    expect(screen.getByText("Subtotal: $65")).toBeInTheDocument();
  });

  test("displays correct product information", () => {
    render(
        <BuyCart />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Brand A")).toBeInTheDocument();
    expect(screen.getByText("Brand B")).toBeInTheDocument();
  });

  test("handles form input changes", () => {
    render(
        <BuyCart />
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Meyer" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "juan_meyer@hotmail.com.ar" } });

    expect(screen.getByPlaceholderText("Nombre")).toHaveValue("Juan");
    expect(screen.getByPlaceholderText("Apellido")).toHaveValue("Meyer");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("juan_meyer@hotmail.com.ar");
  });

  test("enables buy button when form is filled", () => {
    render(
        <BuyCart />
    );

    const buyButton = screen.getByText("PEDIR PRESUPUESTO");
    expect(buyButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Meyer" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "juan_meyer@hotmail.com.ar" } });

    expect(buyButton).not.toBeDisabled();
  });

  test("calls removeCart when delete button is clicked", async () => {
    render(
        <BuyCart />
    );

    const deleteButtons = screen.getAllByLabelText("eliminar");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("¿Estás seguro?")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Sí, eliminar"));

    await waitFor(() => {
      expect(mockRemoveCart).toHaveBeenCalledWith("123");
    });
  });

  test("displays correct quantity information", () => {
    render(
        <BuyCart />
    );

    expect(screen.getByText("Color: Red - Cantidad: 1")).toBeInTheDocument();
    expect(screen.getByText("Color: Blue - Cantidad: 2")).toBeInTheDocument();
  });

  test("calculates and displays correct total", () => {
    render(
        <BuyCart />
    );

    expect(screen.getByText("TOTAL: $65")).toBeInTheDocument();
  });
});