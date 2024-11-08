import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import GeneralContainer from "../Containers/generalContainer"
import useUserContext from '../../Utils/contextUserHook'
import {allProducts} from "../__mocks__/cartModalMock"


jest.mock('../Card/userCard', () => ({
  __esModule: true,
  default: (props) => <div data-testid="user-card">{props.name}</div>
}));
jest.mock('../SearchBar/searchBar', () => () => <div data-testid="search-bar">Search Bar</div>)
jest.mock('../carrousel/OfferCarrousel', () => () => <div data-testid="offer-carousel">Offer Carousel</div>)
jest.mock('../../Utils/exit-window', () => () => <div data-testid="exit-intent-modal">Exit Intent Modal</div>)


jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('GeneralContainer', () => {
  const mockNextPage = jest.fn()
  const mockPrevPage = jest.fn()

  beforeEach(() => {
    useUserContext.mockReturnValue({
      currentPosts: [],
      loading: false,
      error: null,
      nextPage: mockNextPage,
      prevPage: mockPrevPage,
      currentPage: 1,
      FilteredObjects: [],
      postPerPage: 10,
      Filters: { subsection: 'all', type: 'all' },
      SearchBar: '',
    })
  })

  it('renders loading state', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      loading: true,
    })

    render(<GeneralContainer />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    expect(screen.getByText('Casa Tomas - 100 años cosiendo juntos.')).toBeInTheDocument()
  })

 
  it('renders search bar', () => {
    render(<GeneralContainer />)
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('renders offer carousel when conditions are met', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      Filters: { subsection: 'all', type: 'all' },
      SearchBar: '',
    })

    render(<GeneralContainer />)
    expect(screen.getByTestId('offer-carousel')).toBeInTheDocument()
  })

  it('does not render offer carousel when conditions are not met', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      Filters: { subsection: 'some', type: 'all' },
      SearchBar: '',
    })

    render(<GeneralContainer />)
    expect(screen.queryByTestId('offer-carousel')).not.toBeInTheDocument()
  })

  it('renders user cards when currentPosts is not empty', async () => {
    const mockCurrentPosts = allProducts.map(product => ({
      _id: product.data._id,
      data: product.data,
      offer: !!product.data.offer,
      filter: false // Añadimos esta propiedad para pasar el filtro en GeneralContainer
    }));
  
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      currentPosts: mockCurrentPosts,
    });
  
    render(<GeneralContainer />);
    
    await waitFor(() => {
      expect(screen.getAllByTestId('user-card')).toHaveLength(mockCurrentPosts.length);
    });
  });

  it('renders "No se encontró" message when currentPosts is empty', () => {
    render(<GeneralContainer />)
    expect(screen.getByText('No se encontró lo que buscas, disculpen las molestias.')).toBeInTheDocument()
  })

  it('renders pagination buttons', () => {
    render(<GeneralContainer />)
    expect(screen.getByText('Anterior')).toBeInTheDocument()
    expect(screen.getByText('Siguiente')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    render(<GeneralContainer />)
    expect(screen.getByText('Anterior')).toBeDisabled()
  })

  it('enables previous button after first page', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      currentPage: 2,
    })

    render(<GeneralContainer />)
    expect(screen.getByText('Anterior')).not.toBeDisabled()
  })

  it('disables next button on last page', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      currentPage: 1,
      FilteredObjects: new Array(10),
      postPerPage: 10,
    })

    render(<GeneralContainer />)
    expect(screen.getByText('Siguiente')).toBeDisabled()
  })

  it('calls nextPage when next button is clicked', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      FilteredObjects: new Array(20),
      postPerPage: 10,
    })

    render(<GeneralContainer />)
    fireEvent.click(screen.getByText('Siguiente'))
    expect(mockNextPage).toHaveBeenCalled()
  })

  it('calls prevPage when previous button is clicked', () => {
    useUserContext.mockReturnValueOnce({
      ...useUserContext(),
      currentPage: 2,
    })

    render(<GeneralContainer />)
    fireEvent.click(screen.getByText('Anterior'))
    expect(mockPrevPage).toHaveBeenCalled()
  })

  it('renders ExitIntentOfferModal', () => {
    render(<GeneralContainer />)
    expect(screen.getByTestId('exit-intent-modal')).toBeInTheDocument()
  })
})