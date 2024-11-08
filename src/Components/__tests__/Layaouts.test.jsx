import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LayoutWithNavBarAndFooter, LayoutWithoutNavBarAndFooter, LayoutWithNavBar } from '../Layaouts/Layaouts';

// Mock
jest.mock('../SiderBar/sideBar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../Navbar/navBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../Footer/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../carrousel/ProductsBrandsCaroussel', () => () => <div data-testid="products-brands-carrousel">Products Brands Carrousel</div>);

describe('Layout Components', () => {
  test('LayoutWithNavBarAndFooter renders correctly', () => {
    render(
      <LayoutWithNavBarAndFooter>
        <div data-testid="child-content">Child Content</div>
      </LayoutWithNavBarAndFooter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('products-brands-carrousel')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  test('LayoutWithoutNavBarAndFooter renders correctly', () => {
    render(
      <LayoutWithoutNavBarAndFooter>
        <div data-testid="child-content">Child Content</div>
      </LayoutWithoutNavBarAndFooter>
    );

    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('products-brands-carrousel')).not.toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  test('LayoutWithNavBar renders correctly', () => {
    render(
      <LayoutWithNavBar>
        <div data-testid="child-content">Child Content</div>
      </LayoutWithNavBar>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('products-brands-carrousel')).not.toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});