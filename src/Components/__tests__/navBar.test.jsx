// src/Components/__tests__/navBar.test.jsx
import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { UserContextProvider } from "../../Context/UserContext/userActions";
import NavBar from "../Navbar/navBar";

describe("loads and displays navbar", () => {
  test("renders correctly", async () => {
    render(
      <UserContextProvider>
        <NavBar />
      </UserContextProvider>
    );

    // This elements take the text inside the NavBar component
    const homeElement = await screen.findByText("Inicio");
    const aboutUsElement = await screen.findByText("Acerca de nosotros");
    const contactElement = await screen.findByText("Contacto");
    const howToBuyElement = await screen.findByText("Como comprar");
    const loginElement = await screen.findByText("Login");

    // We are expecting have this elements inside the NavBar component 
    expect(homeElement).toBeInTheDocument();
    expect(aboutUsElement).toBeInTheDocument();
    expect(contactElement).toBeInTheDocument();
    expect(howToBuyElement).toBeInTheDocument();
    expect(loginElement).toBeInTheDocument();

    // Also we can test if not to be in the NavBar component, just if we need to check some especific text for ex
    const notElement = await screen.queryByText("Not to be in the document");

    expect(notElement).not.toBeInTheDocument();
  });
});
