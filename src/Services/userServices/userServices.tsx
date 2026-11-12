import axios from "../axios";
import { NewOrder, Contact } from "../../Interfaces/interfacesIndex";

export const getAllObjects = async () => {
  try {
    const response = await axios.get("/items");
    const shuffledData = response.data.sort(() => Math.random() - 0.5);
    return shuffledData;
  } catch (error) {
    throw new Error("Error fetching items: " + error);
  }
};
export const sendOrderToApi = async (orderData: NewOrder) => {
  try {
    const response = await axios.post("/orders", orderData);

    return response;
  } catch (error) {
    throw new Error(`Error desconocido: ${error}`);
  }
};

export const createMercadoPagoCheckout = async (orderData: NewOrder) => {
  const response = await axios.post("/payments/mercadopago/checkout", orderData);
  return response.data as {
    orderId: string;
    orderNumber: number;
    preferenceId: string;
    init_point: string;
    sandbox_init_point?: string;
  };
};

export const getOrderPaymentStatus = async (orderId: string) => {
  const response = await axios.get(`/payments/mercadopago/orders/${orderId}`);
  return response.data as {
    orderId: string;
    orderNumber: number;
    status: string;
    paymentMethod?: string;
    payment?: {
      status?: string;
      paymentId?: string;
      transactionAmount?: number;
      paidAt?: string;
      paymentMethodId?: string;
    } | null;
    totalAmount: number;
  };
};

export const sendContactMessage = async (message: Contact) => {
  try {
    const response = await axios.post("/sendContact", message);
    return response.data;
  } catch (error) {
    throw new Error("Error sending contact message1" + error);
  }
};
