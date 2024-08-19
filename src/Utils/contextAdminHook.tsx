//use adminContext

import { useContext } from "react"
import AdminContext from "../Context/AdminContext/adminActions";

const useAdminContext = ()=> {
    const context = useContext(AdminContext)
    if(!context){
        throw new Error("AdminContext must be used inside a AdminContextProvider")
    }
    return context;
};
export default useAdminContext;