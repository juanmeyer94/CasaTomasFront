import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { expect, describe, it, jest, beforeEach } from '@jest/globals'
import ExitOfferCarousel from "../carrousel/ExitOfferCarrousel"
import useUserContext from '../../Utils/contextUserHook'
import {carrouselAllObjects} from "../__mocks__/carousselMock"

jest.mock('../../Utils/contextUserHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))


jest.mock('../Card/userCard', () => {
  return function MockUserCard(props) {
    return <div data-testid="user-card">{props.name}</div>
  }
})

describe('ExitOfferCarousel', () => {
  

  beforeEach(() => {
    useUserContext.mockReturnValue({ AllObjects: carrouselAllObjects })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the carousel with offer items', () => {
    render(<ExitOfferCarousel />)
    expect(screen.getByText('No te vayas sin ver nuestras mejores ofertas!')).toBeInTheDocument()
    expect(screen.getByText('¡Increíbles oportunidades!')).toBeInTheDocument()
    expect(screen.getAllByTestId('user-card')).toHaveLength(4) // Only offer items should be rendered
  })

  it('navigates to the next slide when the next button is clicked', () => {
    render(<ExitOfferCarousel />)
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)
    expect(screen.getByText('Product2')).toBeInTheDocument()
  })

  it('navigates to the previous slide when the previous button is clicked', () => {
    render(<ExitOfferCarousel />)
    const prevButton = screen.getByLabelText('Previous slide')
    fireEvent.click(prevButton)
    expect(screen.getByText('Product5')).toBeInTheDocument()
  })

  it('auto-scrolls to the next slide after 5 seconds', () => {
    render(<ExitOfferCarousel />)
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(screen.getByText('Product2')).toBeInTheDocument()
  })



  it('renders four items on large screens', () => {
    global.innerWidth = 1024
    global.dispatchEvent(new Event('resize'))
    render(<ExitOfferCarousel />)
    expect(screen.getAllByTestId('user-card')).toHaveLength(4)
  })

  it('does not auto-scroll when there are 4 or fewer offer items', () => {
    const fewOfferItems = carrouselAllObjects.slice(0, 3)
    useUserContext.mockReturnValue({ AllObjects: fewOfferItems })
    render(<ExitOfferCarousel />)
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(screen.getByText('Product1')).toBeInTheDocument()
  })
})