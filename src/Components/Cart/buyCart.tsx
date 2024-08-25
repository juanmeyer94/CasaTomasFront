import React, { useState, useEffect } from "react";
import useUserContext from "../../Utils/contextUserHook";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BuyCarInterface, OrderItemData } from "../../Interfaces/interfacesIndex";
import { NewOrder } from "../../Interfaces/types/OrderInterface/OrderInterface";
import CartModal from "./cartModal";

// Definir la interfaz para el estado del formulario
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const BuyCart = () => {
  const { buyCart, sendOrder, removeCart } = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const orderData: NewOrder = {
    orderItems: buyCart.map((product: { 
      item: OrderItemData; 
      quantities: number 
    }) => ({
      type: "defaultType",
      items: product.item ? [product.item] : [],
      _id: product.item._id,
      quantity: product.quantities,
      quantities: { [product.item._id]: product.quantities },
      commentary: "",
    })),
    userEmail: formData.email,
    userName: formData.firstName,
    userLastName: formData.lastName,
    cellphone: formData.phone,
    status: "pendiente",
    deleted: false,
    totalAmount: buyCart.reduce(
      (acc: number, product: { item: OrderItemData; quantities: number }) =>
        acc + parseFloat(product.item.price) * product.quantities,
      0
    ),
  };

const finishOrder = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás deshacer esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar compra",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      const response = await sendOrder(orderData);
      if (response.status === 200) {
        Swal.fire("¡Compra confirmada!", "Tu pedido ha sido realizado con éxito.", "success");
        navigate("/");
      } else {
        Swal.fire("Error", "Hubo un problema al realizar tu pedido.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo completar la compra. Intenta nuevamente.", "error");
    }
  }
};


  const [isBuyButtonEnabled, setIsBuyButtonEnabled] = useState(false);
  const subtotal = buyCart.reduce(
    (acc: string, item: BuyCarInterface) => acc + item.totalPrice,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const { firstName, lastName, email } = formData;
    setIsBuyButtonEnabled(
      firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== ""
    );
  }, [formData]);

  const handleDelete = (itemId: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(itemId);
        Swal.fire(
          "¡Eliminado!",
          "El producto ha sido eliminado del carrito.",
          "success"
        );
      }
    });
  };

  //validaciones
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Por favor, introduce un correo electrónico válido.");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const validatePhone = (phone: string) => {
    const phonePattern =
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})?\d{8}$/;
    if (phone && !phonePattern.test(phone)) {
      setPhoneError("Por favor, introduce un número de teléfono válido.");
      return false;
    } else {
      setPhoneError(null);
      return true;
    }
  };

  const keepBuying = () => {
    navigate("/")
  }

  //actualizar cantidades
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartModal = () => {
      setIsCartOpen(!isCartOpen);
  };


  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg lg:w-3/4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-sky-100">
                <tr>
                  <th className="py-2 px-4 border font-semibold ">Producto</th>
                  <th className="py-2 px-4 border-b font-semibold ">
                    Precio Unitario
                  </th>
                  <th className="py-2 px-4 border-b font-semibold ">
                    Cantidad
                  </th>
                  <th className="py-2 px-4 border-b font-semibold ">
                    Subtotal
                  </th>
                  <th className="py-2 px-8 border-b font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {buyCart.map((item: BuyCarInterface) => (
                  <tr key={item.id} className="relative hover:bg-gray-50">
                    <td className="py-2 px-6 border-b flex items-center">
                      <div className="flex items-center w-full">
                        <img
                          src={item.item.photo[0]}
                          alt={item.item.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <span className="block font-semibold">
                            {item.item.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.item.marca}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-8 border-b">
                      <span>${parseFloat(item.item.price).toFixed(2)}</span>
                    </td>
                    <td className="py-2 border-b">
                      <input
                        type="number"
                        value={item.totalQuantities}
                        className="border rounded py-1  text-center"
                        readOnly
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${parseFloat(item.totalPrice).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b relative text-right">
                      <button
                        className="text-red-500 hover:text-red-700 absolute top-2 right-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="hidden min-[770px]:block">
                        {Object.entries(item.quantities).length > 0 ? (
                          <div>
                            {Object.entries(item.quantities).map(
                              ([color, qty]) =>
                                color ? (
                                  <div
                                    key={color}
                                    className="flex items-center space-x-2"
                                  >
                                    <p className="text-sm text-gray-500">
                                      Color: {color} - Cantidad: {qty as number}
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    key="no-color"
                                    className="text-sm text-gray-500 flex items-center"
                                  >
                                    Cantidad: {qty as number}
                                  </div>
                                )
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            No especificado
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-4 lg:w-1/4 bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Detalles del Cliente</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateEmail(e.target.value);
                  }}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-xs">{emailError}</p>
                )}

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    handleInputChange(e);
                    validatePhone(e.target.value);
                  }}
                  placeholder="Celular (opcional)"
                  className="w-full px-4 py-2 border rounded"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs">{phoneError}</p>
                )}
              </form>
            </div>
            <div>
              <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-lg">Envío: A confirmar</p>
              <p className="text-xl font-bold">TOTAL: ${subtotal.toFixed(2)}</p>
            </div>
            <button
              className={`mt-4 py-2 px-4 rounded ${
                isBuyButtonEnabled
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!isBuyButtonEnabled}
              onClick={finishOrder}
            >
              COMPRAR
            </button>
            <p className="mt-4 text-gray-500">
              Debido a los constantes aumentos de precios por parte de los
              proveedores, algunos de nuestros precios de venta podrán variar al
              momento del presupuesto. Estos precios no incluyen IVA.
            </p>
            <div className="mt-4 flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2">
              <button className="bg-sky-500 text-white w-full rounded p-1 text-xs lg:text-base"
              onClick={() =>handleCartModal()}>
              
                ACTUALIZAR CANTIDADES
              </button>
              <button className="bg-sky-500 text-white w-full rounded p-1 text-xs lg:text-base" onClick={keepBuying}>
                SEGUIR COMPRANDO
              </button>
            </div>
          </div>
        </div>
        {isCartOpen && <CartModal handleCartModal={handleCartModal} />}
      </div>
    </>
  );
};

export default BuyCart;
