import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstruction from "../underConstruction/underConstruction"
import { MemoryRouter } from 'react-router-dom';
import { AdminContextProvider } from '../../Context/AdminContext/adminActions';

jest.mock('../../Utils/contextAdminHook', () => ({
    __esModule: true,
    default: jest.fn(),
  }))
  
  const mockedUsedNavigate = jest.fn()
  
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }))

describe('UnderConstruction', () => {
  test('Debe renderizar correctamente el título, descripción e imagen', () => {
    render(
        <AdminContextProvider>
          <MemoryRouter>
            <UnderConstruction />
          </MemoryRouter>
        </AdminContextProvider>
      )

    expect(screen.getByText(/En mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/Esta función se encuentra bajo mantenimiento/i)).toBeInTheDocument();
    const image = screen.getByAltText(/Under Construction/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/mantenimiento.jpeg');
  });
});
