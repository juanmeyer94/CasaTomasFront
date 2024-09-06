import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "../Contact/Contact"
import { UserContextProvider } from "../../Context/UserContext/userActions";

//memory router para que no redirija y simule
describe("ContactPage", () => {
  test("debe renderizar el formulario de contacto", () => {
    render(
      <UserContextProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </UserContextProvider>
    );

    expect(screen.getByLabelText(/Apellido y Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mensaje/i)).toBeInTheDocument();
  });

  test("debe actualizar los campos del formulario cuando el usuario escribe", () => {
    render(
      <UserContextProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </UserContextProvider>
    );

    const nameInput = screen.getByLabelText(/Apellido y Nombres/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const messageInput = screen.getByPlaceholderText(/Mensaje/i);

    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan.perez@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "3492555000" } });
    fireEvent.change(messageInput, { target: { value: "Este es un mensaje de prueba." } });

    expect(nameInput).toHaveValue("Juan Pérez");
    expect(emailInput).toHaveValue("juan.perez@example.com");
    expect(phoneInput).toHaveValue("3492555000");
    expect(messageInput).toHaveValue("Este es un mensaje de prueba.");
  });

  test("debe enviar el formulario y mostrar el SweetAlert", async () => {
    render(
      <UserContextProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </UserContextProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /ENVIAR/i }));

 //swet alert
    await waitFor(() => {
      expect(screen.getByText(/Mensaje enviado/i)).toBeInTheDocument();
    });
  });
});
