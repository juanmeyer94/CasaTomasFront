import * as React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FAQ from "../FAQ/FAQ";
import { UserContextProvider } from "../../Context/UserContext/userActions";

describe("FAQ", () => {
  test("debe renderizar las preguntas frecuentes y el contenido asociado", () => {
    render(
      <UserContextProvider>
        <MemoryRouter>
          <FAQ />
        </MemoryRouter>
      </UserContextProvider>
    );

    expect(screen.getByText(/PREGUNTAS FRECUENTES/i)).toBeInTheDocument();

    expect(screen.getByText(/¿Cuáles son las zonas de atención\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Llegamos a todo el país, con entrega en domicilio./i)
    ).toBeInTheDocument();

    expect(screen.getByText(/¿Qué medios de pagos reciben\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/El pago podrá hacerse vía bancos o cheques./i)
    ).toBeInTheDocument();

    expect(screen.getByText(/¿Cuál es la compra mínima\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/El monto mínimo de la primera compra es de \$20\.000/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/¿A qué clientes proveen\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A todos los que le interesen nuestros productos/i)
    ).toBeInTheDocument();

    expect(screen.getByAltText(/¿Necesita asesoramiento\?/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Preguntas frecuentes/i)).toBeInTheDocument();
  });
});
