import { Order } from "../../Interfaces/interfacesIndex";

export interface AdminState {
  isAuth: boolean;
  tokenAuth: boolean;
  loading: boolean;
  error: string | null;
  orders: Order[];
  allUsers: any[];
}

type ActionsTypes =
  | { type: "GET_ORDERS"; payload: Order[] }
  | { type: "CREATE_ORDER"; loading: boolean; error: boolean }
  | { type: "DELETE_ORDER"; loading: boolean; error: boolean }
  | { type: "UPDATE_ORDER"; loading: boolean; error: boolean }
  | { type: "LOGIN_ADM"; payload: boolean }
  | { type: "SET_AUTH"; payload: boolean };

export const admInitialSate: AdminState = {
  isAuth: false,
  tokenAuth: false,
  loading: false,
  error: null,
  orders: [],
  allUsers: [],
};

export const admReducer = (
  state: AdminState,
  action: ActionsTypes
): AdminState => {
  switch (action.type) {
    case "GET_ORDERS":
      return { ...state, orders: action.payload, loading: false, error: null };
    case "CREATE_ORDER":
      return { ...state, loading: false, error: null };
    case "UPDATE_ORDER":
      return { ...state, loading: false, error: null };
    case "DELETE_ORDER":
      return { ...state, loading: false, error: null };
    case "LOGIN_ADM":
      return { ...state, isAuth: action.payload };
    case "SET_AUTH":
      return { ...state, tokenAuth: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action} in admReducer`);
  }
};
