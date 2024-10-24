// Layout.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { LayoutWithNavBarAndFooter, LayoutWithoutNavBarAndFooter, LayoutWithNavBar } from '../Layaouts/Layaouts';


jest.mock('../Navbar/navBar', () => () => <div>Mock NavBar</div>);
jest.mock('../SiderBar/sideBar', () => () => <div>Mock SideBar</div>);
jest.mock('../Footer/Footer', () => () => <div>Mock Footer</div>);

describe('Layout Components', () => {
  test('LayoutWithNavBarAndFooter renders children, NavBar, SideBar, and Footer', () => {
    const { getByText } = render(
      <LayoutWithNavBarAndFooter>
        <div>Child Component</div>
      </LayoutWithNavBarAndFooter>
    );

    expect(getByText('Mock NavBar')).toBeInTheDocument();
    expect(getByText('Mock SideBar')).toBeInTheDocument();
    expect(getByText('Mock Footer')).toBeInTheDocument();
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  test('LayoutWithoutNavBarAndFooter renders only children', () => {
    const { getByText, queryByText } = render(
      <LayoutWithoutNavBarAndFooter>
        <div>Child Component Only</div>
      </LayoutWithoutNavBarAndFooter>
    );

    expect(getByText('Child Component Only')).toBeInTheDocument();
    expect(queryByText('Mock NavBar')).not.toBeInTheDocument();
    expect(queryByText('Mock Footer')).not.toBeInTheDocument();
  });

  test('LayoutWithNavBar renders NavBar and children, but not Footer', () => {
    const { getByText } = render(
      <LayoutWithNavBar>
        <div>Child Component</div>
      </LayoutWithNavBar>
    );

    expect(getByText('Mock NavBar')).toBeInTheDocument();
    expect(getByText('Child Component')).toBeInTheDocument();

  });
});
