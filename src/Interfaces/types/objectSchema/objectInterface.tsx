export interface Item {
  marca: string;
  name: string;
  photo?: string[];
  price: string;
  summary: string;
  description: string;
  specsTecs: string;
  _id: string;
  colours?: string[];
  models?: string[];
  isAuth?: boolean;
  handleRemoveImage?:any;
  code?: string;
  quantity: string;
  wholesalePrice: string;
  offer: boolean;
}

interface Data {
  section: string;
  type: string;
  items: Item[];
  _id: string;
}

interface ObjectType {
  _id: string;
  offer: any;
  section: string;
  subsection: string;
  filter: boolean;
  data: Data;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantities?: Record<string, number>;
}

export default ObjectType;
