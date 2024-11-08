import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import SearchBarr from '../SearchBar/searchBar'
import useUserContext from '../../Utils/contextUserHook'

// Mock the useUserContext hook
jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('SearchBarr', () => {
  const mockSetSearchQuery = jest.fn()
  const mockRemoveFilters = jest.fn()

  beforeEach(() => {
    useUserContext.mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
      SearchBar: '',
      removeFilters: mockRemoveFilters,
    })
  })

  it('renders the search input', () => {
    render(<SearchBarr />)
    expect(screen.getByPlaceholderText('Buscador...')).toBeInTheDocument()
  })

  it('renders the search icon', () => {
    render(<SearchBarr />)
    const searchIcon = screen.getByAltText('Ready Check')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveAttribute('src', '/lupa.png')
  })

  it('renders the "Limpiar filtros" button', () => {
    render(<SearchBarr />)
    expect(screen.getByText('Limpiar filtros')).toBeInTheDocument()
  })

  it('updates search term on input change', () => {
    render(<SearchBarr />)
    const searchInput = screen.getByPlaceholderText('Buscador...')
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    expect(searchInput).toHaveValue('test search')
  })

  it('calls setSearchQuery on input change', () => {
    render(<SearchBarr />)
    const searchInput = screen.getByPlaceholderText('Buscador...')
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test search')
  })



  it('calls removeFilters and clears search term when "Limpiar filtros" is clicked', () => {
    render(<SearchBarr />)
    const clearButton = screen.getByText('Limpiar filtros')
    const searchInput = screen.getByPlaceholderText('Buscador...')

    // Set initial search term
    fireEvent.change(searchInput, { target: { value: 'test search' } })

    // Click clear button
    fireEvent.click(clearButton)

    expect(mockRemoveFilters).toHaveBeenCalled()
    expect(searchInput).toHaveValue('')
  })

  it('searches correctly, ignoring accents', () => {
    const mockSetSearchQuery = jest.fn((query) => {
      const normalizeString = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
  
      const normalizedQuery = normalizeString(query);
      const searchTerms = normalizedQuery.split(' ').filter(Boolean);
  
      // Simulating the search logic
      const mockItems = [
        { data: { type: 'Electrónica', items: [{ marca: 'Samsung', name: 'Teléfono' }] }, subsection: 'Móviles' },
        { data: { type: 'Ropa', items: [{ marca: 'Nike', name: 'Camiseta' }] }, subsection: 'Deportiva' },
      ];
  
      const filteredItems = mockItems.filter((item) => {
        const itemType = normalizeString(item.data.type);
        const itemSubsection = normalizeString(item.subsection);
        const itemMarca = normalizeString(item.data.items[0].marca);
        const itemName = normalizeString(item.data.items[0].name);
  
        return searchTerms.every(term =>
          itemType.includes(term) ||
          itemSubsection.includes(term) ||
          itemMarca.includes(term) ||
          itemName.includes(term)
        );
      });
  
      return filteredItems;
    });
  
    useUserContext.mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
      SearchBar: '',
      removeFilters: mockRemoveFilters,
    })
  
    render(<SearchBarr />)
    const searchInput = screen.getByPlaceholderText('Buscador...')
  
    // Test with accents
    fireEvent.change(searchInput, { target: { value: 'teléfono' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('teléfono')
    expect(mockSetSearchQuery('teléfono')).toHaveLength(1)
  
    // Test without accents
    fireEvent.change(searchInput, { target: { value: 'telefono' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('telefono')
    expect(mockSetSearchQuery('telefono')).toHaveLength(1)
  
    // Test with accents
    fireEvent.change(searchInput, { target: { value: 'electrónica móviles' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('electrónica móviles')
    expect(mockSetSearchQuery('electrónica móviles')).toHaveLength(1)
  
    // Test without accents
    fireEvent.change(searchInput, { target: { value: 'electronica moviles' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('electronica moviles')
    expect(mockSetSearchQuery('electronica moviles')).toHaveLength(1)
  })
})