import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "../Contact/Contact"
import { UserContextProvider } from "../../Context/UserContext/userActions";


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
    expect(screen.getByLabelText("Dirección / Ciudad")).toBeInTheDocument();

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
    const address = screen.getByLabelText("Dirección / Ciudad");

    fireEvent.change(nameInput, { target: { value: "Juan Meyer" } });
    fireEvent.change(emailInput, { target: { value: "juan.meyer@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "3492555666" } });
    fireEvent.change(messageInput, { target: { value: "Este es un mensaje de prueba." } });
    fireEvent.change(address, { target: { value: "Calle 123, Refugio 33"}});

    expect(nameInput).toHaveValue("Juan Meyer");
    expect(emailInput).toHaveValue("juan.meyer@example.com");
    expect(phoneInput).toHaveValue("3492555666");
    expect(messageInput).toHaveValue("Este es un mensaje de prueba.");
    expect(address).toHaveValue("Calle 123, Refugio 33");

  });
//funciona pero hay que ver que no envie el contact de manera literal
//   test("debe enviar el formulario y mostrar el SweetAlert", async () => {
//     render(
//       <UserContextProvider>
//         <MemoryRouter>
//           <ContactPage />
//         </MemoryRouter>
//       </UserContextProvider>
//     );
//     fireEvent.change(screen.getByLabelText('Apellido y Nombres'), { target: { value: 'Juan Meyer' } });
//     fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'juan.meyer@example.com' } });
//     fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '3492555666' } });
//     fireEvent.change(screen.getByLabelText('Dirección / Ciudad'), { target: { value: 'Calle 123, Refugio 33' } });
//     fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { value: 'Este es un mensaje de prueba.' } });

//     fireEvent.click(screen.getByRole("button", { name: /ENVIAR/i }));

//  //swet alert
//     await waitFor(() => {
//       expect(screen.getByText(/Mensaje enviado/i)).toBeInTheDocument();
//     });
//   });
});
