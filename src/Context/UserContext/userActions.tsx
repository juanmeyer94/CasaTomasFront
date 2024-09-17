import React, {
  createContext,
  useCallback,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { initialState, generalReducer } from "../generalReducer";
import {
  getAllObjects,
  sendOrderToApi,
  sendContactMessage,
} from "../../Services/userServices/userServices";
import {
  State,
  Filters,
  UserContextType,
  CartItem,
  NewOrder,
  Contact,
} from "../../Interfaces/interfacesIndex";

const UserContext = createContext<(State & UserContextType) | undefined>(
  undefined
);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(generalReducer, initialState);
  const isMounted = useRef(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(0);

  const getAllItems = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getAllObjects();
      dispatch({ type: "GET_ALL_OBJECTS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching items" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const setFilters = useCallback((filters: Filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
    setCurrentPage(1);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
    setCurrentPage(1);
  }, []);

  const searchByCode = useCallback((query:string) => {
    dispatch({ type: "SEARCH_BY_CODE", payload: query });
    setCurrentPage(1);
  },[])

  useEffect(() => {
    if (!isMounted.current) {
      getAllItems();
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch({ type: "LOAD_CART_FROM_STORAGE", payload: storedCart });
      isMounted.current = true;
    }
  }, [getAllItems]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1736) {
        setPostsPerPage(15); // 2xl
      } else if (window.innerWidth >= 1500) {
        setPostsPerPage(15); // xl
      } else if (window.innerWidth >= 1280) {
        setPostsPerPage(8); // lg
      } else if (window.innerWidth >= 1025) {
        setPostsPerPage(6); // default
      } else {
        setPostsPerPage(4); // sm
      }
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = state.FilteredObjects.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(state.FilteredObjects.length / postPerPage)
      )
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const setItemsPerPage = (num: number) => {
    setPostsPerPage(num);
  };

  //cart

  const addToCart = (data: any) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data },
    });
  };

  const upgradeCart = (data: CartItem[]) => {
    dispatch({
      type: "UPGRADE_CART",
      payload: data,
    });
  };

  const removeCart = (id: string) => {
    dispatch({
      type: "REMOVE_CART",
      payload: id,
    });
  };

  const changeQuantity = useCallback(
    (productId: string, modelName: string, change: number) => {
      dispatch({
        type: "CHANGE_QUANTITY",
        payload: { productId, modelName, change },
      });
    },
    [dispatch]
  );

  const removeFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const sendOrder = async (orderData: NewOrder) => {
    try {
        const response = await sendOrderToApi(orderData);
        dispatch({ type: "RESET_CART" });
        return response;  
    } catch (error) {
        console.error(error);
        throw error;  
    }
};


  //contact
  const sendContact = (data: Contact) => {
    sendContactMessage(data);
  };
  const contextValue = useMemo(
    () => ({
      ...state,
      setFilters,
      nextPage,
      prevPage,
      setItemsPerPage,
      setSearchQuery,
      addToCart,
      upgradeCart,
      removeCart,
      changeQuantity,
      removeFilters,
      sendOrder,
      sendContact,
      setPostsPerPage,
      getAllItems,
      searchByCode,
      currentPage,
      postPerPage,
      currentPosts,
      state
    }),
    [state, currentPage, postPerPage, currentPosts]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
