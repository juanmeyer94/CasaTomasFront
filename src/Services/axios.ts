import axios from "axios";

const PROD_API = "https://casa-tomas-api.onrender.com/api";

const instance = axios.create({
    // Local: VITE_API_URL=http://localhost:3001/api en .env
    baseURL: import.meta.env.VITE_API_URL || PROD_API,
    withCredentials: true,
})

export default instance;
