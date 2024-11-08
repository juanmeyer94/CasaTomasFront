import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, describe, it, jest, beforeEach } from "@jest/globals";
import OfferCarousel from "../carrousel/OfferCarrousel";
import useUserContext from "../../Utils/contextUserHook";
import {carrouselAllObjects} from "../__mocks__/carousselMock"

jest.mock("../../Utils/contextUserHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Card/userCard", () => {
  return function MockUserCard(props) {
    return <div data-testid="user-card">{props.name}</div>;
  };
});

describe("OfferCarousel", () => {
  beforeEach(() => {
    useUserContext.mockReturnValue({ AllObjects: carrouselAllObjects });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the carousel with offer items", () => {
    render(<OfferCarousel />);
    expect(screen.getByText("Ofertas Especiales")).toBeInTheDocument();
    expect(
      screen.getByText("¡No te pierdas estas increíbles oportunidades!")
    ).toBeInTheDocument();
    //expect(screen.getAllByTestId('user-card')).toHaveLength(1)
  });

  it("navigates to the next slide when the next button is clicked", () => {
    render(<OfferCarousel />);
    const nextButton = screen.getByLabelText("Next slide");
    fireEvent.click(nextButton);
    expect(screen.getByText("Product2")).toBeInTheDocument();
  });

  it("navigates to the previous slide when the previous button is clicked", () => {
    render(<OfferCarousel />);
    const prevButton = screen.getByLabelText("Previous slide");
    fireEvent.click(prevButton);
    expect(screen.getByText("Product5")).toBeInTheDocument();
  });

  it("auto-scrolls to the next slide after 5 seconds", () => {
    render(<OfferCarousel />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("Product2")).toBeInTheDocument();
  });

  it("adjusts visible items based on screen width", async () => {
    const originalInnerWidth = window.innerWidth;
    const resizeWindow = (width) => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
      });
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });
    };

    await act(async () => {
      render(<OfferCarousel />);
    });

    await act(async () => {
      resizeWindow(800);
    });
    expect(screen.getAllByTestId("user-card")).toHaveLength(1);

    await act(async () => {
      resizeWindow(1024);
    });
    expect(screen.getAllByTestId("user-card")).toHaveLength(2);

    await act(async () => {
      resizeWindow(1280);
    });
    expect(screen.getAllByTestId("user-card")).toHaveLength(3);

    await act(async () => {
      resizeWindow(1501);
    });
    expect(screen.getAllByTestId("user-card")).toHaveLength(4);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("displays loading message when AllObjects is empty", () => {
    useUserContext.mockReturnValue({ AllObjects: [] });
    render(<OfferCarousel />);
    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

  it('displays "¡Ofertas por tiempo limitado!" message', () => {
    render(<OfferCarousel />);
    expect(
      screen.getByText("¡Ofertas por tiempo limitado!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aprovecha ahora antes de que se agoten")
    ).toBeInTheDocument();
  });
});
