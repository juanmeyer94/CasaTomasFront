import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Login from "../Login/Login"
import { AdminContextProvider } from "../../Context/AdminContext/adminActions"
import { MemoryRouter } from "react-router-dom"
import useAdminContext from "../../Utils/contextAdminHook"

jest.mock('../../Utils/contextAdminHook', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))


jest.mock('../../assets/frases.json', () => [
  { phrase: "Test phrase", autor: "Test author" }
])

describe("Login", () => {
  const mockLoginAdmin = jest.fn()
  const mockErrors = ""

  beforeEach(() => {
    jest.clearAllMocks()
    useAdminContext.mockReturnValue({
      loginAdmin: mockLoginAdmin,
      errors: mockErrors,
    })
  })

  test("Debe renderizar el formulario de login", () => {
    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )
    expect(screen.getByText(/Ingresar a tu cuenta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument()
    expect(screen.getByText(/Regresar/i)).toBeInTheDocument()
  })

  test("Debe actualizar los campos de email y password cuando el usuario escribe", () => {
    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )

    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Password/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test("Debe llamar a loginAdmin con las credenciales correctas cuando se envía el formulario", async () => {
    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )

    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Ingresar/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  test("Debe mostrar un error cuando falla el inicio de sesión", async () => {
    const mockError = "Error de inicio de sesión"
    useAdminContext.mockReturnValue({
      loginAdmin: jest.fn().mockRejectedValue(new Error(mockError)),
      errors: mockError,
    })

    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )

    const submitButton = screen.getByRole('button', { name: /Ingresar/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument()
    })
  })

  test("Debe renderizar una frase aleatoria", () => {
    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )

    expect(screen.getByText("Test phrase")).toBeInTheDocument()
    expect(screen.getByText("- Test author")).toBeInTheDocument()
  })

  test("El enlace 'Regresar' debe tener el atributo href correcto", () => {
    render(
      <AdminContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AdminContextProvider>
    )

    const backLink = screen.getByText("Regresar")
    expect(backLink).toHaveAttribute('href', '/')
  })
})