import React from "react"
import {describe, expect, test} from "@jest/globals"
import { render, screen} from "@testing-library/react"
import { UserContextProvider } from "../../Context/UserContext/userActions"
import Footer from "../Footer/Footer"


describe("Footer load and includes text test", () => {
    test("renders correctly", async () => {
        render(
            <UserContextProvider>
                <Footer />
            </UserContextProvider>
        );


        const casaTomas = await screen.findByText("Casa Tomas");
        const acercaDeNosotros = await screen.findByText("Acerca de Nosotros");
        const contacto = await screen.findByText("Contacto");
        const preguntasFrecuentes = await screen.findByText("PREGUNTAS FRECUENTES");
        const developedBy = await screen.findByText("Desarrollado por Juan Meyer");

        
        
        
        expect(casaTomas).toBeInTheDocument();
        expect(acercaDeNosotros).toBeInTheDocument();
        expect(contacto).toBeInTheDocument();
        expect(preguntasFrecuentes).toBeInTheDocument();
        expect(developedBy).toBeInTheDocument();
        expect(socialMedia).toBeInTheDocument();


        const notElement = await screen.queryByText("Not be in the document");
        expect(notElement).not.toBeInTheDocument();

    });
})
