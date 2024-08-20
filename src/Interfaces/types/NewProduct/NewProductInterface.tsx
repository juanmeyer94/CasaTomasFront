export interface ProductItem {
    marca: string;
    name: string;
    photo: string[];
    price: string;
    summary: string;
    description: string;
    specsTecs: string;
    colours: string[];
    models: string[];
  }

  export interface NewProductState {
    offer: boolean;
    section: string;
    subsection: string;
    filter: boolean;
    data: {
      type: string;
      items: ProductItem[];
    };
  }