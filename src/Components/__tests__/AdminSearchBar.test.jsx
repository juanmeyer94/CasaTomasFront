import React, {useEffect} from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import AdmSearchBar from "../AdmSearchBar/AdmSearchBar"
import useUserContext from '../../Utils/contextUserHook'
import { mockProducts, mockSearchByCode } from '../__mocks__/productsMock'

jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))


describe('AdmSearchBar', () => {
  let mockSearchBar = ''

  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchBar = ''
    useUserContext.mockReturnValue({
      searchByCode: mockSearchByCode,
      SearchBar: mockSearchBar,
    })
  })

  it('renders the search input', () => {
    render(<AdmSearchBar />)
    expect(screen.getByPlaceholderText('CÓDIGO...')).toBeInTheDocument()
  })

  it('renders the search icon', () => {
    render(<AdmSearchBar />)
    const searchIcon = screen.getByAltText('Ready Check')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveAttribute('src', '/lupa.png')
  })

  it('updates search term on input change', () => {
    render(<AdmSearchBar />)
    const searchInput = screen.getByPlaceholderText('CÓDIGO...')
    fireEvent.change(searchInput, { target: { value: '123' } })
    expect(searchInput).toHaveValue('123')
  })

  it('calls searchByCode on input change', () => {
    render(<AdmSearchBar />)
    const searchInput = screen.getByPlaceholderText('CÓDIGO...')
    fireEvent.change(searchInput, { target: { value: '123' } })
    expect(mockSearchByCode).toHaveBeenCalledWith('123')
  })

  mockProducts.forEach((product) => {
    it(`finds product by ID "${product.id}"`, () => {
      render(<AdmSearchBar />)
      const searchInput = screen.getByPlaceholderText('CÓDIGO...')
      fireEvent.change(searchInput, { target: { value: product.id } })
      expect(mockSearchByCode).toHaveBeenCalledWith(product.id)
    })
  })

  it('handles search for non-existent product ID', () => {
    render(<AdmSearchBar />)
    const searchInput = screen.getByPlaceholderText('CÓDIGO...')
    fireEvent.change(searchInput, { target: { value: '789' } })
    expect(mockSearchByCode).toHaveBeenCalledWith('789')
  })

  it('clears search term when SearchBar becomes empty', () => {
    const { rerender } = render(<AdmSearchBar />)
    const searchInput = screen.getByPlaceholderText('CÓDIGO...')
    fireEvent.change(searchInput, { target: { value: '123' } })
    expect(searchInput).toHaveValue('123')

    //clear
    fireEvent.change(searchInput, { target: { value: '' } })

    rerender(<AdmSearchBar />)
    expect(searchInput).toHaveValue('')
  })
})