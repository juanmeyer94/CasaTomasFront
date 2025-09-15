import React from "react";
import useUserContext from "../../Utils/contextUserHook";
import { CartItem, ObjectType } from "../../Interfaces/interfacesIndex";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface CartModalProps {
  handleCartModal: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ handleCartModal }) => {
  const { cart, AllObjects, upgradeCart, removeCart, changeQuantity } =
    useUserContext();
  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mergeQuantities = (items: CartItem[]) => {
    const map: Record<string, CartItem> = {};

    items.forEach((item) => {
      if (!map[item.id]) {
        map[item.id] = { ...item, quantities: { ...item.quantities } };
      } else {
        Object.entries(item.quantities).forEach(([color, qty]) => {
          map[item.id].quantities[color] =
            (map[item.id].quantities[color] || 0) + qty;
        });
      }
    });
    return Object.values(map);
  };

  const findItemById = (id: string, data: ObjectType[]) => {
    return data.find((product: ObjectType) => product.data._id === id);
  };

  const getCartItemsWithDetails = (
    cart: CartItem[],
    data: ObjectType[]
  ): any[] => {
    return cart.map((cartItem) => {
      const product = findItemById(cartItem.id, data);

      if (product) {
        const item = product.data.items[0];
        const itemPrice = parseFloat(item.price);
        const totalQuantities = Object.values(
          cartItem.quantities
        ).reduce<number>((sum, quantity) => sum + quantity, 0);
        let totalPrice = totalQuantities * itemPrice;
        let discountApplied = false;
        let discountPercentage = 0;

        if (
          totalQuantities >= parseInt(item.quantity.split(" ")[0]) &&
          parseInt(item.quantity.split(" ")[0]) !== 0
        ) {
          const wholesalePrice = parseFloat(item.wholesalePrice);
          const wholesaleQuantity = parseInt(item.quantity.split(" ")[0]);
          discountApplied = true;
          discountPercentage = Math.round(
            (1 - wholesalePrice / (itemPrice * wholesaleQuantity)) * 100
          );
          totalPrice = (wholesalePrice / wholesaleQuantity) * totalQuantities;
        }

        return {
          ...cartItem,
          item: {
            ...item,
            section: product.section,
            subsection: product.subsection,
            offer: product.offer,
          },
          totalQuantities,
          totalPrice,
          originalPrice: itemPrice * totalQuantities,
          discountApplied,
          discountPercentage,
        };
      } else {
        console.warn(`Product with id ${cartItem.id} not found`);
        return cartItem;
      }
    });
  };

  const mergedData = mergeQuantities(cart);
  const cartItems = getCartItemsWithDetails(mergedData, AllObjects);

  const sendBuyCart = () => {
    upgradeCart(cartItems);
    navigate("/cart");
    handleCartModal();
  };

  const deleteItem = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(id);
        Swal.fire(
          "¡Borrado!",
          "El artículo ha sido eliminado del carrito.",
          "success"
        );
      }
    });
  };

  const handleDecreaseQuantity = (productId: string, modelName: string) => {
    changeQuantity(productId, modelName, -1);
  };

  const handleIncreaseQuantity = (productId: string, modelName: string) => {
    changeQuantity(productId, modelName, +1);
  };

  const subtotal = cartItems.reduce<number>(
    (sum, item) => sum + item.totalPrice,
    0
  );

  function handleMoreInfo(id: string): void {
    navigate(`/moreInfo/${id}`)
  }
 console.log(cartItems)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleCartModal}
      ></div>
      <div className="relative bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg flex flex-col max-h-[95vh] min-[320px]:max-h-[90vh]">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Tu carrito</h1>
          <button
            onClick={handleCartModal}
            className="text-gray-500 hover:text-gray-900 p-1"
            aria-label="close"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <li className="py-6 text-center text-gray-500">
                  Tu carrito está vacío
                </li>
              ) : (
                cartItems.map((cartItem) => (
                  <li
                    key={cartItem.id}
                    className="py-3 flex items-start justify-between"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={cartItem.item.photo[0]}
                        alt={cartItem.item.name || cartItem.item.marca}
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md"
                      />
                     <div className="items-center justify-center hidden">
                     <button
                        onClick={() => handleMoreInfo(cartItem.item._id)}
                        className="mt-2 px-1 py-1 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        + Info
                      </button>
                     </div>
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="sm:text-lg font-semibold text-gray-900 min-[320px]:text-sm">
                          {`${cartItem.item.marca || ""}${
                            cartItem.item.name ? ` ${cartItem.item.name}` : ""
                          }`.trim()}
                        </h3>
                        <button
                          onClick={() => deleteItem(cartItem.id)}
                          className="text-gray-500 hover:text-gray-900"
                          aria-label="borrar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="36"
                            height="36"
                            viewBox="0 0 100 100"
                          >
                            <path
                              fill="#f37e98"
                              d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
                            ></path>
                            <path
                              fill="#f15b6c"
                              d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
                            ></path>
                            <path
                              fill="#1f212b"
                              d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
                            ></path>
                            <path
                              fill="#1f212b"
                              d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
                            ></path>
                            <path
                              fill="#1f212b"
                              d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
                            ></path>
                            <path
                              fill="#1f212b"
                              d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {Object.entries(cartItem.quantities).map(
                        ([color, qty]) => (
                          <div
                            key={color}
                            className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm text-gray-600">
                                {color} - Cantidad: {qty as number}
                              </p>
                            </div>

                            <div
                              className="flex items-center bg-white border border-gray-200 rounded-md"
                              data-hs-input-number=""
                            >
                              <button
                                type="button"
                                className="w-6 h-6 sm:w-7 sm:h-7 inline-flex justify-center items-center text-xs font-medium rounded-l-md border-r border-gray-200 bg-white text-gray-800 hover:bg-red-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Decrease"
                                data-hs-input-number-decrement=""
                                onClick={() =>
                                  handleDecreaseQuantity(cartItem.id, color)
                                }
                              >
                                <svg
                                  className="w-3 h-3"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5  12h14"></path>
                                </svg>
                              </button>
                              <input
                                className="w-8 sm:w-10 h-6 sm:h-7 bg-transparent border-0 text-gray-800 text-center text-xs focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none"
                                type="number"
                                aria-roledescription="Number field"
                                value={qty as number}
                                readOnly
                              />
                              <button
                                type="button"
                                className="w-6 h-6 sm:w-7 sm:h-7 inline-flex justify-center items-center text-xs font-medium rounded-r-md border-l border-gray-200 bg-white text-gray-800 hover:bg-green-50 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Increase"
                                data-hs-input-number-increment=""
                                onClick={() =>
                                  handleIncreaseQuantity(cartItem.id, color)
                                }
                              >
                                <svg
                                  className="w-3 h-3"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5v14"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        )
                      )}
                      <div className="mt-3">
                        {cartItem.discountApplied ? (
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 line-through">
                              Original: {formatPrice(cartItem.originalPrice)}
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-green-600">
                              Con descuento: {formatPrice(cartItem.totalPrice)}
                            </p>
                            <p className="text-xs font-medium text-green-600">
                              ¡Ahorras {cartItem.discountPercentage}%!
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base font-semibold text-gray-900">
                            {formatPrice(cartItem.totalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              {formatPrice(subtotal)}
            </p>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-sky-700 transition-colors"
              onClick={sendBuyCart}
            >
              Finalizar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
