import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import SideBar from "../SiderBar/sideBar"
import useUserContext from '../../Utils/contextUserHook'


jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))


Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024, 
})

describe('SideBar', () => {
  const mockSetFilters = jest.fn()

  beforeEach(() => {
    useUserContext.mockReturnValue({
      Filters: { type: 'all', subsection: 'all' },
      setFilters: mockSetFilters,
    })
  })

  it('renders the sidebar with categories', () => {
    render(<SideBar />)
    expect(screen.getByText('Máquinas de coser')).toBeInTheDocument()
    expect(screen.getByText('Mercería')).toBeInTheDocument()
  })

  it('toggles subcategories when clicked', async () => {
    render(<SideBar />)
    const maquinasIndustriales = screen.getByText('Maquinas Industriales')
    fireEvent.click(maquinasIndustriales)
    await waitFor(() => {
      expect(screen.getByText('Rectas')).toBeInTheDocument()
    })
    fireEvent.click(maquinasIndustriales)
    await waitFor(() => {
      expect(screen.queryByText('Rectas')).not.toBeInTheDocument()
    })
  })

  it('calls setFilters when a type is selected', () => {
    render(<SideBar />)
    fireEvent.click(screen.getByText('Maquinas Industriales'))
    fireEvent.click(screen.getByText('Rectas'))
    expect(mockSetFilters).toHaveBeenCalledWith({ type: 'Rectas', subsection: 'all' })
  })

  it('calls setFilters when a subcategory is selected', () => {
    render(<SideBar />)
    fireEvent.click(screen.getByText('Maquinas Industriales'))
    expect(mockSetFilters).toHaveBeenCalledWith({ type: 'all', subsection: 'Maquinas Industriales' })
  })

  it('renders special content for "Repuestos y reparaciones"', async () => {
    render(<SideBar />)
    fireEvent.click(screen.getByText('Repuestos y reparaciones'))
    await waitFor(() => {
      expect(screen.getByText('Consultar por estos medios.')).toBeInTheDocument()
      expect(screen.getByText('Facebook')).toBeInTheDocument()
      expect(screen.getByText('Instagram')).toBeInTheDocument()
      expect(screen.getByText('(03492) 422683')).toBeInTheDocument()
    })
  })
})