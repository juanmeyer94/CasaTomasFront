// src/components/ProductDetail.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetail from '../Card/moreInfoCard';
import { UserContextProvider } from '../../Context/UserContext/userActions';
import { useParams } from 'react-router-dom';
import useUserContext from '../../Utils/contextUserHook';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading message when product is not available', () => {
    useParams.mockReturnValue({ id: '1' });
    useUserContext.mockReturnValue({
      FilteredObjects: [],
      AllObjects: [],
      addToCart: jest.fn(),
    });

    render(
      <UserContextProvider>
        <Router>
          <ProductDetail />
        </Router>
      </UserContextProvider>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('renders product details when product is available', async () => {
    useParams.mockReturnValue({ id: '1' });
    useUserContext.mockReturnValue({
      FilteredObjects: [{
        _id: '1',
        data: {
          items: [{
            marca: 'MarcaTest',
            name: 'NombreTest',
            price: '100',
            description: 'Descripción de prueba',
            colours: ['Red', 'Blue'],
            models: ['Model1', 'Model2'],
            photo: ['/photo1.jpg', '/photo2.jpg'],
            wholesalePrice: "4500",
            quantity: "10 UNIDADES"
          }],
        },
      }],
      addToCart: jest.fn(),
      AllObjects: [],
    });

    render(
      <UserContextProvider>
        <Router>
          <ProductDetail />
        </Router>
      </UserContextProvider>
    );
      expect(screen.getByText('MarcaTest NombreTest')).toBeInTheDocument();
      expect(screen.getByText('-$ 3.500,00')).toBeInTheDocument();
      expect(screen.getByText('Descripción de prueba')).toBeInTheDocument(); 
      expect(screen.getByText('Variedad de colores')).toBeInTheDocument();
      expect(screen.getByText('Modelos Disponibles')).toBeInTheDocument();
  });
});
