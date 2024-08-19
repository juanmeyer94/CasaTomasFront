export type CartItem = {
  type: string;
  id: string;
  quantities: Record<string, number>;
  data: DataCart;
}

export interface DataCart {
  items: Array<{
    marca: string;
    name: string;
    photo: string[];
    price: string;
    summary: string;
    description: string;
    specsTecs: string;
    colours: string[];
    models: string[];
    _id: string;
  }>;
}
  
interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
}

export default CartState;
