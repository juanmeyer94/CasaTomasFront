// src/components/ProductDetail.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetail from '../Card/moreInfoCard';
import { UserContextProvider } from '../../Context/UserContext/userActions';
import { useParams } from 'react-router-dom';
import useUserContext from '../../Utils/contextUserHook';

// Mock de useParams para controlar el id del producto
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock de useUserContext para proporcionar datos del producto
jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ProductDetail', () => {
  beforeEach(() => {
    // Resetear mocks antes de cada test
    jest.clearAllMocks();
  });

  test('renders loading message when product is not available', () => {
    // Mockear useParams
    useParams.mockReturnValue({ id: '1' });

    // Mockear useUserContext
    useUserContext.mockReturnValue({
      FilteredObjects: [],
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
    // Mockear useParams
    useParams.mockReturnValue({ id: '1' });

    // Mockear useUserContext
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
          }],
        },
      }],
      addToCart: jest.fn(),
    });

    render(
      <UserContextProvider>
        <Router>
          <ProductDetail />
        </Router>
      </UserContextProvider>
    );

      expect(screen.getByText('MarcaTest NombreTest')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('Descripción General: Descripción de prueba')).toBeInTheDocument(); 
      expect(screen.getByText('Variedad de colores')).toBeInTheDocument();
      expect(screen.getByText('Modelos Disponibles')).toBeInTheDocument();
  });
});
