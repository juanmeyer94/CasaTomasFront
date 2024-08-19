import axios from "../axios";
import { NewOrder, Contact } from "../../Interfaces/interfacesIndex";


export const getAllObjects= async () => {
        try {
            const response = await axios.get("/items");
            return response.data
           
        } catch (error) {
            throw new Error("Error fetching items"+ error)
        }
}

export const sendOrderToApi = async (orderData:NewOrder) => {
    try {
        const response = await axios.post("/orders", orderData)
        return response.data
        
    } catch (error) {
        throw new Error("Error sending order to api" + error)
        
    }
}


export const sendContactMessage = async (message:Contact) => {
    try {
        const response = await axios.post("/sendContact", message)
        return response.data
    } catch (error) {
        throw new Error("Error sending contact message1" + error)
        
    }

}