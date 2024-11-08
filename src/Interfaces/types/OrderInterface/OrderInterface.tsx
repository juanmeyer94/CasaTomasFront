export interface OrderItemData {
  marca?: string;
  name?: string;
  photo: string[];
  price: string;
  summary?: string;
  description?: string;
  specsTecs?: string;
  _id: string;
  code?:string;
  wholesalePrice?:string,
  quantity?:string,
}

export interface OrderItem {
  type: string;
  items: OrderItemData[];
  _id: string;
  quantity: number;
  quantities?: Record<string, number>;
  commentary?: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  userEmail: string;
  userName: string;
  userLastName: string;
  cellphone?: string;
  totalAmount: number;
  status?: string;
  deleted?: boolean;
  orderNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewOrder {
  orderItems: OrderItem[];
  userEmail: string;
  userName: string;
  userLastName: string;
  cellphone?: string;
  totalAmount: number;
  status?: string;
  deleted?: boolean;
  

}