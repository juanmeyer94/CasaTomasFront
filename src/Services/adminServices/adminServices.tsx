import { NewProductState, Order } from "../../Interfaces/interfacesIndex";
import axios from "../axios";
import Cookies from "js-cookie";

interface UserLoginType {
  email: string;
  password: string;
}

// Login/Register/Delete User/Logout

export const loginUser = async (userData: UserLoginType) => {
  try {
    const response = await axios.post("/login", userData);
    Cookies.set("authToken", response.data.token, { expires: 1 });
    return response;
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error}`);
  }
};

export const logoutUser = async () => {
  try {
    await axios.post("/logout");
    Cookies.remove("authToken");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
export const registerUser = async (user: any) => {
  try {
    const response = await axios.post("/register", user);
    return response;
  } catch (error) {
    throw new Error(`Error al registrar usuario: ${error}`);
  }
};

// CRUD ITEMS

export const newItem = async (data: NewProductState) => {
  try {
    const response = await axios.post("/items", data);
    return response;
  } catch (error) {
    console.error("Error al crear un nuevo item:", error);
  }
};

export const deleteItemById = async (id: string) => {
  try {
    const response = await axios.delete(`/items/${id}`);
    return response;
  } catch (error) {
    console.error("Error al eliminar el objeto:", error);
  }
};

export const updatedItem = async (id: number, data: any) => {
  try {
    const response = await axios.put(`/items/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error al actualizar el objeto:", error);
  }
};

// CRUD de los pedidos

export const createOrderToApi = async (orderData: Order) => {
  try {
    await axios.post("/orders", orderData);
  } catch (error) {
    console.error("Error al crear la orden:", error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get("/orders");
    return response;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
  }
};

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await axios.put(`/orders/${orderId}`, {
      status: newStatus,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
  }
};

export const deleteOrder = async (orderIdToDelete: string) => {
  try {
    await axios.delete(`/orders/${orderIdToDelete}`);
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await axios.get(`/orders/${id}`);
    return response;
  } catch (error) {
    throw new Error("Id no encontrado");
  }
};

export const verifyTokenRequest = async () => {
  try {
    const response = await axios.get("/verify");
    return response;
  } catch (error) {
    throw new Error("Error al verificar el token");
  }
};
