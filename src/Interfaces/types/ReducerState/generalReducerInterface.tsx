import ObjectType from "../objectSchema/objectInterface";
import { CartItem } from "../Cart/CartInterface";
import { NewOrder } from "../OrderInterface/OrderInterface";

export type State = {
  AllObjects: ObjectType[];
  Filters: {
    subsection: string;
    price: number;
    type: string;
  };
  FilteredObjects: ObjectType[];
  SearchBar: string;
  cart: CartItem[];
  buyCart: any[];
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dispatch: (action: Action) => void;
  loading: boolean;
  error: string;
};

export type Action =
  | { type: "GET_ALL_OBJECTS"; payload: ObjectType[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | {
      type: "SET_FILTERS";
      payload: { subsection: string; price: number; type: string };
    }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "ADD_CART"; payload: CartItem }
  | { type: "REMOVE_CART"; payload: string }
  | {
      type: "CHANGE_QUANTITY";
      payload: { productId: string; modelName: string; change: number };
    }
  | { type: "LOAD_CART_FROM_STORAGE"; payload: CartItem[] }
  | { type: "UPGRADE_CART"; payload: CartItem[] }
  | { type: "RESET_FILTERS" }
  | { type: "RESET_CART" }
  | {type: "GET_ORDERS"; payload: NewOrder};
