interface Item {
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
    section: string;
    subsection: string;
    offer: boolean;
  }
  
  interface BuyCartInterface{
    id: string;
    quantities: Record<string, number>;
    totalQuantities: number;
    totalPrice: string;
    item: Item;
  }

  export default BuyCartInterface