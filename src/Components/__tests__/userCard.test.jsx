import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "../Card/userCard"
import { BrowserRouter as Router } from "react-router-dom";

// redireccion
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// mock?
const mockItem = {
  _id: "1",
  photo: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  price: "100",
  name: "Product Name",
  summary: "Product Summary",
  marca: "Brand",
};

test("renders UserCard component correctly", () => {
  render(
    <Router>
      <UserCard {...mockItem} />
    </Router>
  );

 
  expect(screen.getByText("Brand Product Name")).toBeInTheDocument()
  expect(screen.getByAltText("Product")).toBeInTheDocument();
  expect(screen.getByText("$ 100")).toBeInTheDocument();
  expect(screen.getByText("Product Summary")).toBeInTheDocument();
});

test("navigates to moreInfo page on button click", () => {
  const navigate = jest.fn();
  jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => navigate);

  render(
    <Router>
      <UserCard {...mockItem} />
    </Router>
  );


  expect(navigate).not.toHaveBeenCalled();


  fireEvent.click(screen.getByText("Más información"));

  expect(navigate).toHaveBeenCalledWith(`/moreInfo/${mockItem._id}`);
});

test("handles image navigation correctly", () => {
  render(
    <Router>
      <UserCard {...mockItem} />
    </Router>
  );

  const prevButton = screen.getByLabelText("Previous Image");
  const nextButton = screen.getByLabelText("Next Image");


  fireEvent.click(nextButton);


  expect(screen.getByAltText("Product").src).toBe("https://example.com/image2.jpg?f_auto,q_auto,w_150,h_150");


  fireEvent.click(prevButton);

  expect(screen.getByAltText("Product").src).toBe("https://example.com/image1.jpg?f_auto,q_auto,w_150,h_150");
});


