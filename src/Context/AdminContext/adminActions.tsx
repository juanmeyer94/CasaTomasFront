import {
  createContext,
  useReducer,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getAllOrders, createOrderToApi, updateOrderStatus, getOrderById, deleteItemById, updatedItem, updatedPrice } from "../../Services/adminServices/adminServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/adminServices/adminServices";
import { AdminState, admReducer, admInitialSate } from "./AdminReducer";
import { NewProductState, Order } from "../../Interfaces/interfacesIndex";

interface UserLoginType {
  email: string;
  password: string;
}
export interface AdmContextInterface {
  loginAdmin: (userData: UserLoginType) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  getOrders: () => Promise<void>;
  createOrder: (orderData: Order) => Promise<void>;
  updateOrder: (orderId: string, newStatus: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  getOrderData: (orderId: string) => Promise<{ data: Order }>; 
  errors: string;
  orders: Order[];
  allUsers: any[];
  handleDeleteProduct: (orderId: string) => void;
  updateItem: (itemId: string, itemData: NewProductState) => Promise<any>;
  updatePrices: () => Promise<{ success: boolean; status?: number; error?: any }>;
  countPendingOrders: () => number;
}


const AdminContext = createContext<(AdmContextInterface & AdminState) | undefined>(
  undefined
);

export const AdminContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(admReducer, admInitialSate);
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: "SET_AUTH", payload: true });
    }
  }, []);

  const loginAdmin = async (userData: UserLoginType) => {
    try {
      const response = await loginUser(userData);
      if (response.status === 200) {
        dispatch({ type: "LOGIN_ADM", payload: true });
        dispatch({ type: "SET_AUTH", payload: true });
        navigate("/casaTomasDash");
      }
    } catch (error) {
      console.error(error);
      setErrors(`Nombre de usuario o contraseña incorrectos`);
    }
  };

  const logoutAdmin = async () => {
    dispatch({ type: "LOGIN_ADM", payload: false });
    dispatch({ type: "SET_AUTH", payload: false });
    navigate("/");
  };


  //orders crud
  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      dispatch({ type: "GET_ORDERS", payload: response?.data });
    } catch (error) {
      console.error(error);
    }
  }

  const createOrder = async (orderData: Order) => {
    try {
      await createOrderToApi(orderData);
      await getOrders();
    } catch (error) {
      console.error(error);
      setErrors(`Error al crear la orden: ${error}`);
    }
  }

  const updateOrder = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await getOrders();
    } catch (error) {
      console.error(error);
      setErrors(`Error al actualizar la orden: ${error}`);
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      await getOrders();
    } catch (error) {
      console.error(error);
      setErrors(`Error al eliminar la orden: ${error}`);
    }
  }

  const getOrderData = async (orderId: string): Promise<{ data: Order }> => {
    try {
      const response = await getOrderById(orderId);
      return { data: response.data };
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo obtener la información debido a: " + error);
    }
  };
  
  const countPendingOrders = (): number => {
    return state.orders.filter(order => order.status === 'pendiente').length;
  };
  //products admin crud

  const handleDeleteProduct = async (orderId: string) => {
    try {
      const response = await deleteItemById(orderId);
      return {data: response}
    } catch (error) {
      console.error(error);
      setErrors(`Error al eliminar el producto: ${error}`)
        throw new Error("No se pudo eliminar el producto debido a: " + error);
      
    }
  }

  const updateItem = async (itemId: string, itemData: NewProductState) => {
    try {
      const response = await updatedItem(itemId, itemData);
      return response;
    } catch (error) {
      console.error(error);
      setErrors(`Error al actualizar el producto: ${error}`);
      throw new Error("No se pudo actualizar el producto debido a: " + error);
    }
  }
  const updatePrices = async (): Promise<{ success: boolean; status?: number; error?: any }> => {
    try {
      const result = await updatedPrice();
      return result;
    } catch (error) {
      console.error('Error inesperado al actualizar los precios:', error);
      return { success: false, error };
    }
  };
  
  
  
  const contextValue = useMemo(
    () => ({
      ...state,
      loginAdmin,
      logoutAdmin,
      getOrders,
      createOrder,
      updateOrder,
      deleteOrder,
      getOrderData,
      handleDeleteProduct,
      updateItem,
      updatePrices,
      countPendingOrders,
      errors,
      orders: state.orders,
      allUsers: state.allUsers
    }),
    [state, errors]
  );

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
