// HowToBuy.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HowToBuy from "../HowToBuy/HowToBuy"

describe('HowToBuy component', () => {
  test('renders "CÓMO COMPRAR" heading', () => {
    render(<HowToBuy />);
    expect(screen.getByText('CÓMO COMPRAR')).toBeInTheDocument();
  });

  test('renders shopping instructions correctly', () => {
    render(<HowToBuy />);
    
    expect(screen.getByText('Es muy fácil!')).toBeInTheDocument();
    expect(screen.getByText('Recorré nuestro sitio, ahí podrás elegir nuestros productos.')).toBeInTheDocument();
    expect(screen.getByText('Te enviaremos el pedido por el transporte que hayas elegido o lo podrás pasar a retirar por nuestro local.')).toBeInTheDocument();
  });

  test('renders payment methods section', () => {
    render(<HowToBuy />);
    
    expect(screen.getByText('FORMA DE PAGO')).toBeInTheDocument();
    expect(screen.getByText('La modalidad de pago puede ser contado efectivo, transferencia bancaria, débito o tarjeta de crédito bancaria.')).toBeInTheDocument();
  });

  test('renders coverage area section', () => {
    render(<HowToBuy />);
    
    expect(screen.getByText('ZONA DE COBERTURA')).toBeInTheDocument();
    expect(screen.getByText('Llegamos a cada rincón del país.')).toBeInTheDocument();
  });
});
