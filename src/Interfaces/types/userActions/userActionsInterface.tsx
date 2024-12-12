import {ObjectType, CartItem, NewOrder} from "../../interfacesIndex"
import { AxiosResponse } from "axios";


export interface Filters {
    subsection: string;
    price: number;
    type: string;
}

export interface Contact {
    userName: string;
    userEmail: string;
    userMessage: string;
    userPhone: string;
    userLocation: string;
}
export interface AddToCart {
    id: string;
    quantities: Record<string, number>;
    models: Record<string, number>;
  }

export interface UserContextType {
    setFilters: (filters: Filters) => void;
    setItemsPerPage: (num: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    setSearchQuery: (query: string) => void;
    removeFilters: () => void;
    sendOrder: (orderData: NewOrder) => Promise<AxiosResponse>;
    addToCart: (item: AddToCart) => void;
    upgradeCart: (items: CartItem[]) => void;
    removeCart: (itemId: string) => void;
    changeQuantity: (productId: string, modelName: string, change: number) => void;
    sendContact: (contact: Contact) => void;
    getAllItems:() => void;
    currentPage: number;
    postPerPage: number;
    currentPosts: ObjectType[];
    setPostsPerPage: any;
    state: any;
    searchByCode: any;
    showHideItems: (query:boolean) => void;
  }