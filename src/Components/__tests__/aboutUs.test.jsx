import React from "react";
import {describe, expect, test} from "@jest/globals";
import {render, screen} from '@testing-library/react';
import { UserContextProvider } from "../../Context/UserContext/userActions";
import AboutUs from "../AboutUs/aboutUs";

describe("loads and displays aboutUs", () => {
    test("renders correctly", async () => {
        render(
            <UserContextProvider>
                <AboutUs />
            </UserContextProvider>
        );
    
    const whyUs = await screen.findByText("¿Por qué elegirnos?");
    const weAre = await screen.findByText("Somos Casa Tomas: 100 Años de Pasión por la Costura");
    const legacy = await screen.findByText("El Legado de Bartolomé Tomas");
    const legacyResponse = await screen.findByText("En 1923, Bartolomé Tomas fundó Casa Tomas, estableciendo la base de lo que hoy es una institución en el mundo de la costura.");
    const generationByGeneration = await screen.findByText("De Generación en Generación");
    const generationByGenerationResponse = await screen.findByText("El compromiso con la excelencia ha sido transmitido a lo largo de cinco generaciones, garantizando calidad y servicio.");
    const moreThanAMarket = await screen.findByText("Más que una Tienda");
    const moreThanAMarketResponse = await screen.findByText("Casa Tomas es un destino para los amantes de la costura, ofreciendo productos de alta calidad y una mercería completa.");
    const ourMission = await screen.findByText("Nuestro Compromiso");
    const ourMissionResponse = await screen.findByText("Nos enorgullece ofrecer un servicio personalizado y productos de calidad que nos han distinguido por más de un siglo.")


    
    expect(whyUs).toBeInTheDocument();
    expect(weAre).toBeInTheDocument();
    expect(legacy).toBeInTheDocument();
    expect(legacyResponse).toBeInTheDocument();
    expect(generationByGeneration).toBeInTheDocument();
        
    expect(generationByGenerationResponse).toBeInTheDocument();
    expect(moreThanAMarket).toBeInTheDocument();
    expect(moreThanAMarketResponse).toBeInTheDocument();
    expect(ourMission).toBeInTheDocument();
    expect(ourMissionResponse).toBeInTheDocument();


    const notElement = screen.queryByText("Casa Cob");
    
    expect(notElement).not.toBeInTheDocument();

    })
})