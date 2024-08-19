//Objetos generales
import ObjectType from "./types/objectSchema/objectInterface";
import { Item } from "./types/objectSchema/objectInterface";

//Reducer General
import { State, Action } from "./types/ReducerState/generalReducerInterface";

//Aciones del usuario
import { UserContextType, Filters, Contact } from "./types/userActions/userActionsInterface";

//modal carrito
import { CartItem } from "./types/Cart/CartInterface";

//carrito final
import BuyCarInterface from "./types/Cart/BuyCarInterface"

//Order
import { Order, OrderItemData, NewOrder } from "./types/OrderInterface/OrderInterface";

//New Product
import { NewProductState, ProductItem } from "./types/NewProduct/NewProductInterface";

export type {ObjectType, State, Action, UserContextType, Filters, Item, CartItem, BuyCarInterface, Order, OrderItemData, Contact, NewProductState, ProductItem, NewOrder};