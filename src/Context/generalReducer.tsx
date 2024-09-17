import { State, Action } from "../Interfaces/interfacesIndex";

export const initialState: State = {
  AllObjects: [],
  Filters: {
    subsection: "all",
    price: 0,
    type: "all",
  },
  FilteredObjects: [],
  SearchBar: "",
  cart: [],
  buyCart: [],
  handleSearchChange: (_: React.ChangeEvent<HTMLInputElement>) => {},
  dispatch: () => {},
  loading: false,
  error: "",
};

export const generalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_ALL_OBJECTS":
      return {
        ...state,
        AllObjects: action.payload,
        FilteredObjects: action.payload,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_FILTERS":
      const { subsection, type } = action.payload;
      const filtered = state.AllObjects.filter((item) => {
        return (
          (type === "all" || item.data.type === type) &&
          (subsection === "all" || item.subsection === subsection)
        );
      });
      return { ...state, Filters: action.payload, FilteredObjects: filtered };
    case "SET_SEARCH_QUERY":
      const searchQuery = action.payload
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filteredBySearch = state.AllObjects.filter((item) => {
        const itemType = item.data.type
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const itemSubsection = item.subsection
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const itemMarca = item.data.items[0].marca
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const itemName = item.data.items[0].name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return (
          itemType.includes(searchQuery) ||
          itemSubsection.includes(searchQuery) ||
          itemMarca.includes(searchQuery) ||
          itemName.includes(searchQuery)
        );
      });
      return {
        ...state,
        SearchBar: searchQuery,
        FilteredObjects: filteredBySearch,
      };
      case "SEARCH_BY_CODE":
        const searchCode = action.payload
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
  
        const filteredByCode = state.AllObjects.filter((item) => {
          const itemCode = item.data.items[0].code ? item.data.items[0].code : "no code"
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
  
          return itemCode.includes(searchCode);
        });
  
        return {
          ...state,
          SearchBar: searchCode,
          FilteredObjects: filteredByCode,
        };
      case "RESET_FILTERS": 
      return {...state, Filters: {type: "", subsection: "", price: 0}, SearchBar: "", FilteredObjects: state.AllObjects };
      case "ADD_CART":
        const newCart = [...state.cart, action.payload];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return {
          ...state,
          cart: newCart,
        };
        case "UPGRADE_CART":
          localStorage.setItem('cart', JSON.stringify(action.payload));
          return {
            ...state,
            buyCart: action.payload,
          };
      case "REMOVE_CART":
        const updatedCart = state.cart.filter((item) => item.id !== action.payload);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
        case "CHANGE_QUANTITY":
          const { productId, modelName, change } = action.payload;
          const updatedCartItems = state.cart.map((item) => {
            if (item.id === productId) {
              let updatedQuantities = { ...item.quantities };
              if (Object.keys(updatedQuantities).length === 1 && "" in updatedQuantities) {
                // Caso 1: Manejar una sola entrada con cadena vacía
                updatedQuantities[""] = (updatedQuantities[""] || 0) + change;
                if (updatedQuantities[""] <= 0) delete updatedQuantities[""];
              } else {
                // Caso 2: Manejar modelos específicos
                const currentQuantity = updatedQuantities[modelName] || 0;
                updatedQuantities[modelName] = currentQuantity + change;
        
                // Eliminar la entrada si la cantidad es menor o igual a cero
                if (updatedQuantities[modelName] <= 0) {
                  delete updatedQuantities[modelName];
                }
              }
        
              // Calcular las cantidades totales y el precio total
              const totalQuantities = Object.values(updatedQuantities).reduce((a, b) => a + b, 0);
              const totalPrice = parseInt(item.data?.items[0].price) * totalQuantities;
        
              return {
                ...item,
                quantities: updatedQuantities,
                totalQuantities,
                totalPrice,
              };
            }
            return item;
          });
        
          return {
            ...state,
            cart: updatedCartItems,
          };
      case "RESET_CART":
        localStorage.clear()
        return {...state, cart: []}
      case "LOAD_CART_FROM_STORAGE":
        return {
          ...state,
          cart: action.payload,
        };
    default:
      throw new Error(`Unhandled action type: ${action} in generalReducer`);
  }
};
