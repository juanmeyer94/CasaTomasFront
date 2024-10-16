import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import useUserContext from "../../Utils/contextUserHook";
import { MemoryRouter } from "react-router-dom";

import BuyCart from "../Cart/buyCart";

jest.mock("../../Utils/contextUserHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("BuyCart", () => {
  beforeEach(() => {
    useUserContext.mockReturnValue({
      cart: [],
      buyCart: [
        {
          item: {
            _id: "123",
            name: "Product 1",
            price: "10.00",
            photo: ["url"],
          },
          quantities: 2,
          totalPrice: 20.00,
        },
      ],
      sendOrder: jest.fn(),
      removeCart: jest.fn(),
    });
  });
  test("debe renderizar el buyCart", () => {
    render(
      <MemoryRouter>
        <BuyCart />
      </MemoryRouter>
    );

    console.log(screen);
    expect(screen.getByText("Subtotal: $20")).toBeInTheDocument();
  });
});
