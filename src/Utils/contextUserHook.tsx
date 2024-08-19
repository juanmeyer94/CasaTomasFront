//use userContext

import { useContext } from "react"
import UserContext from "../Context/UserContext/userActions"

const useUserContext = ()=> {
    const context = useContext(UserContext)
    if(!context){
        throw new Error("useUserContext must be used inside a UserContextProvider")
    }
    return context;
};
export default useUserContext;