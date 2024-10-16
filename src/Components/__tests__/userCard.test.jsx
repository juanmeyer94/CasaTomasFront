import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCard from "../Card/userCard"
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('UserCard', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  const defaultProps = {
    photo: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    price: 1000,
    name: 'Test Product',
    summary: 'Test Summary',
    marca: 'Test Brand',
    _id: '123',
    offer: true,
    wholesalePrice: '900'
  };

  it('renders UserCard with correct information', () => {
    render(<UserCard {...defaultProps} />);

    expect(screen.getByText('Test Brand Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(screen.getByText('$ 1.000')).toBeInTheDocument();
    expect(screen.getByText('¡OFERTA!')).toBeInTheDocument();
    expect(screen.getByText('OFERTA COMPRANDO EN CANTIDAD')).toBeInTheDocument();
    expect(screen.getByText('Más información')).toBeInTheDocument();
  });

  it('navigates to more info page when button is clicked', () => {
    render(<UserCard {...defaultProps} />);

    const moreInfoButton = screen.getByText('Más información');
    fireEvent.click(moreInfoButton);

    expect(mockNavigate).toHaveBeenCalledWith('/moreInfo/123');
  });

  it('changes image when next button is clicked', () => {
    render(<UserCard {...defaultProps} />);

    const nextButton = screen.getByLabelText('Next Image');
    fireEvent.click(nextButton);

    const image = screen.getByAltText('Test Brand Test Product');
    expect(image.dataset.src).toContain('image2.jpg');
  });

  it('changes image when previous button is clicked', () => {
    render(<UserCard {...defaultProps} />);

    const prevButton = screen.getByLabelText('Previous Image');
    fireEvent.click(prevButton);

    const image = screen.getByAltText('Test Brand Test Product');
    expect(image.dataset.src).toContain('image2.jpg');
  });

  it('does not render offer tag when offer is false', () => {
    render(<UserCard {...defaultProps} offer={false} />);

    expect(screen.queryByText('¡OFERTA!')).not.toBeInTheDocument();
  });

  it('does not render wholesale price message when wholesalePrice is "0"', () => {
    render(<UserCard {...defaultProps} wholesalePrice="0" />);

    expect(screen.queryByText('OFERTA COMPRANDO EN CANTIDAD')).not.toBeInTheDocument();
  });

  it('renders "Consultar" when price is not provided', () => {
    render(<UserCard {...defaultProps} price={null} />);

    expect(screen.getByText('Consultar')).toBeInTheDocument();
  });
});