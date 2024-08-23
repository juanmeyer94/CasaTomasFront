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
}

interface Data {
  type: string;
  items: Item[];
  _id: string;
}

interface ObjectType {
  _id: string;
  offer: boolean;
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
