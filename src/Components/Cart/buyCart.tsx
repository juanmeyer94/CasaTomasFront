import type React from "react";
import { useState, useEffect } from "react";
import useUserContext from "../../Utils/contextUserHook";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import type { BuyCarInterface } from "../../Interfaces/interfacesIndex";
import type {
  NewOrder,
  OrderItemData,
} from "../../Interfaces/types/OrderInterface/OrderInterface";
import CartModal from "./cartModal";
import { Helmet } from "react-helmet-async";
import {
  ShoppingBag,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  ArrowLeft,
  Phone,
  Mail,
  User,
  CreditCard,
  Truck,
} from "lucide-react";

const formatPrice = (price: any): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface FormData {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isBuyButtonEnabled, setIsBuyButtonEnabled] = useState(false);
  const [activeStep, setActiveStep] = useState<"cart" | "contact">("cart");

  // Calcular descuentos
  const calculateDiscount = (item: BuyCarInterface) => {
    const originalPrice =
      Number.parseFloat(item.item.price) * item.totalQuantities;
    const discountedPrice = item.totalPrice;
    const discountPercentage =
      ((originalPrice - Number(discountedPrice)) / originalPrice) * 100;
    return {
      originalPrice,
      discountedPrice,
      discountPercentage: discountPercentage.toFixed(2),
    };
  };

  // Preparar datos del pedido
  const orderData: NewOrder = {
    orderItems: buyCart.map(
      (product: { item: OrderItemData; quantities: number }) => ({
        type: "defaultType",
        items: product.item ? [product.item] : [],
        _id: product.item._id,
        quantity: product.quantities,
        quantities: { [product.item._id]: product.quantities },
        commentary: "",
      })
    ),
    userEmail: formData.email ? formData.email : "",
    userName: formData.firstName,
    userLastName: formData.lastName,
    cellphone: formData.phone,
    status: "pendiente",
    deleted: false,
    totalAmount: buyCart.reduce(
      (acc: number, product: { item: OrderItemData; quantities: number }) =>
        acc + Number.parseFloat(product.item.price) * product.quantities,
      0
    ),
  };

  console.log(buyCart)

  // Finalizar pedido
  const finishOrder = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, pedir presupuesto",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        Swal.fire({
          title: "Confirmando tu compra...",
          text: "Esto puede tardar un momento.",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await sendOrder(orderData);
        Swal.close();

       if (response.status >= 200 && response.status < 300) {
          Swal.fire(
            "¡Pedido confirmado!",
            "Tu pedido ha sido realizado con éxito. ¡Pronto nos comunicaremos para finalizar la compra!",
            "success"
          );
          navigate("/");
        } else {
          Swal.fire(
            "Error",
            "Hubo un problema al realizar tu pedido, por favor vuelve a intentar luego.",
            "error"
          );
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Operación cancelada",
          text: "La confirmación de pedido ha sido cancelada.",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire(
        "Error",
        "No se pudo completar el pedido. Intenta nuevamente.",
        "error"
      );
    }
  };

  // Calcular subtotal y descuento
  const subtotal = buyCart.reduce(
    (acc: number, item: BuyCarInterface) => acc + item.totalPrice,
    0
  );
  const totalDiscount = buyCart.reduce((acc: number, item: BuyCarInterface) => {
    const { originalPrice, discountedPrice } = calculateDiscount(item);
    return acc + (originalPrice - Number(discountedPrice));
  }, 0);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validar formulario
  useEffect(() => {
    const { firstName, lastName, phone } = formData;
    const isPhoneValid = phone.trim() !== "" && !phoneError;
    const isFormValid =
      firstName.trim() !== "" && lastName.trim() !== "" && isPhoneValid;
    setIsBuyButtonEnabled(isFormValid && buyCart.length > 0);
  }, [formData, phoneError, buyCart]);

  // Eliminar producto del carrito
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

  // Validar email
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

  // Validar teléfono
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

  // Seguir comprando
  const keepBuying = () => {
    navigate("/");
  };

  // Abrir/cerrar modal de carrito
  const handleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Expandir/colapsar detalles del producto
  const toggleItemDetails = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Cambiar al siguiente paso
  const goToNextStep = () => {
    setActiveStep("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Volver al paso anterior
  const goToPreviousStep = () => {
    setActiveStep("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Verificar si el carrito está vacío
  if (buyCart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-gray-50">
        <Helmet>
          <title>Carrito vacío - Casa Tomas</title>
        </Helmet>
        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <button
            onClick={keepBuying}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center mx-auto"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ir a comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <Helmet>
        <title>Carrito de compras - Casa Tomas</title>
      </Helmet>

      {/* Cabecera */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={keepBuying}
              className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Volver atrás"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Mi carrito</h1>
          </div>
        </div>
      </div>

     {/* Indicador de progreso */}
     <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          {/* Paso 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === "cart" ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
            </div>
            <span className={`text-sm mt-1 ${activeStep === "cart" ? "text-sky-600 font-medium" : "text-gray-500"}`}>
              Revisar compra
            </span>
          </div>

          {/* Primera línea de progreso (50%) */}
          <div className="w-full max-w-[80px] h-1 bg-gray-200 mx-2 sm:mx-4">
            <div
              className={`h-full bg-sky-600 transition-all duration-300 ${
                activeStep === "cart" || activeStep === "contact" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>

          {/* Punto intermedio */}
          <div className="flex flex-col items-center relative">
            <div
              className={`w-3 h-3 rounded-full ${
                activeStep === "cart" || activeStep === "contact" ? "bg-sky-600" : "bg-gray-200"
              }`}
            ></div>
          </div>

          {/* Segunda línea de progreso (100%) */}
          <div className="w-full max-w-[80px] h-1 bg-gray-200 mx-2 sm:mx-4">
            <div
              className={`h-full bg-sky-600 transition-all duration-300 ${activeStep === "contact" ? "w-full" : "w-0"}`}
            ></div>
          </div>

          {/* Paso 2 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === "contact" ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
            <span className={`text-sm mt-1 ${activeStep === "contact" ? "text-sky-600 font-medium" : "text-gray-500"}`}>
              Datos de contacto
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {activeStep === "cart" ? (
          /* Paso 1: Revisar carrito */
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                Productos en tu carrito
              </h2>
            </div>

            {/* Lista de productos en el carrito */}
            <div className="divide-y divide-gray-100">
              {buyCart.map((item: BuyCarInterface) => {
                const { originalPrice, discountedPrice, discountPercentage } =
                  calculateDiscount(item);
                const isExpanded = expandedItems[item.id] || false;

                return (
                  <div key={item.id} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      {/* Imagen y nombre del producto */}
                      <div className="flex items-start flex-1">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.item.photo[0] || "/placeholder.svg"}
                            alt={item.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="font-medium text-gray-800">
                            {item.item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.item.marca}
                          </p>

                          {/* Precio unitario (móvil) */}
                          <div className="mt-1 sm:hidden">
                            <span className="text-sm text-gray-600">
                              Precio:{" "}
                            </span>
                            <span
                              className={
                                discountPercentage !== "0.00" || ""
                                  ? "line-through text-gray-500 text-sm"
                                  : "text-sm font-medium"
                              }
                            >
                              ${formatPrice(Number.parseFloat(item.item.price))}
                            </span>
                            {discountPercentage !== "0.00" && (
                              <span className="ml-1 text-green-600 font-medium text-sm">
                                $
                                {formatPrice(
                                  Number(discountedPrice) / item.totalQuantities
                                )}
                              </span>
                            )}
                          </div>

                          {/* Cantidad (móvil) */}
                          <div className="mt-1 sm:hidden">
                            <span className="text-sm text-gray-600">
                              Cantidad:{" "}
                            </span>
                            <span className="text-sm font-medium">
                              {item.totalQuantities}
                            </span>
                          </div>

                          {/* Subtotal (móvil) */}
                          <div className="mt-1 sm:hidden">
                            <span className="text-sm text-gray-600">
                              Subtotal:{" "}
                            </span>
                            <span
                              className={
                                discountPercentage !== "0.00" || ""
                                  ? "line-through text-gray-500 text-sm"
                                  : "text-sm font-medium"
                              }
                            >
                              ${formatPrice(originalPrice)}
                            </span>
                            {discountPercentage !== "0.00" && (
                              <span className="ml-1 text-green-600 font-medium text-sm">
                                ${formatPrice(Number(discountedPrice))}
                              </span>
                            )}
                          </div>

                          {/* Descuento (móvil) */}
                          {discountPercentage !== "0.00" && (
                            <div className="mt-1 sm:hidden">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Ahorras {discountPercentage}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Precio, cantidad y subtotal (desktop) */}
                      <div className="hidden sm:flex items-center space-x-8 mt-4 sm:mt-0">
                        {/* Precio unitario */}
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Precio</p>
                          <div>
                            <span
                              className={
                                discountPercentage !== "0.00"
                                  ? "line-through text-gray-500 text-sm block"
                                  : "text-sm font-medium"
                              }
                            >
                              ${formatPrice(Number.parseFloat(item.item.price))}
                            </span>
                            {discountPercentage !== "0.00" && (
                              <span className="text-green-600 font-medium text-sm">
                                $
                                {formatPrice(
                                  Number(discountedPrice) / item.totalQuantities
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Cantidad */}
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Cantidad</p>
                          <span className="text-sm font-medium">
                            {item.totalQuantities}
                          </span>
                        </div>

                        {/* Subtotal */}
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                          <div>
                            <span
                              className={
                                discountPercentage !== "0.00"
                                  ? "line-through text-gray-500 text-sm block"
                                  : "text-sm font-medium"
                              }
                            >
                              ${formatPrice(originalPrice)}
                            </span>
                            {discountPercentage !== "0.00" && (
                              <span className="text-green-600 font-medium text-sm">
                                ${formatPrice(Number(discountedPrice))}
                              </span>
                            )}
                            {discountPercentage !== "0.00" && (
                              <span className="block text-xs text-green-600">
                                Ahorras: {discountPercentage}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors mt-2 sm:mt-0 sm:ml-4"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Botón para expandir detalles (móvil) */}
                    <div className="mt-3 sm:hidden">
                      <button
                        onClick={() => toggleItemDetails(item.id)}
                        className="flex items-center justify-center w-full py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        {isExpanded ? (
                          <>
                            <span>Ocultar detalles</span>
                            <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            <span>Ver detalles</span>
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Detalles expandidos (móvil) */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-100 sm:hidden">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Detalles del producto:
                        </h4>
                        {Object.entries(item.quantities).length > 0 ? (
                          <div className="space-y-1">
                            {Object.entries(item.quantities).map(
                              ([color, qty]) =>
                                color ? (
                                  <div
                                    key={color}
                                    className="flex items-center space-x-2"
                                  >
                                    <p className="text-xs text-gray-600">
                                      Color:{" "}
                                      <span className="font-medium">
                                        {color}
                                      </span>{" "}
                                      - Cantidad:{" "}
                                      <span className="font-medium">
                                        {qty as number}
                                      </span>
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    key="no-color"
                                    className="text-xs text-gray-600"
                                  >
                                    Cantidad:{" "}
                                    <span className="font-medium">
                                      {qty as number}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">
                            No especificado
                          </div>
                        )}
                      </div>
                    )}

                    {/* Detalles (desktop) */}
                    <div className="hidden sm:block mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-end">
                        {Object.entries(item.quantities).length > 0 ? (
                          <div className="text-right">
                            {Object.entries(item.quantities).map(
                              ([color, qty]) =>
                                color ? (
                                  <div
                                    key={color}
                                    className="flex items-center justify-end space-x-2"
                                  >
                                    <p className="text-xs text-gray-600">
                                      Color:{" "}
                                      <span className="font-medium">
                                        {color}
                                      </span>{" "}
                                      - Cantidad:{" "}
                                      <span className="font-medium">
                                        {qty as number}
                                      </span>
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    key="no-color"
                                    className="text-xs text-gray-600 flex items-center justify-end"
                                  >
                                    Cantidad:{" "}
                                    <span className="font-medium ml-1">
                                      {qty as number}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">
                            No especificado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumen y botones */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center justify-between sm:block">
                    <p className="text-gray-600">Subtotal:</p>
                    <p className="font-bold text-lg">
                      ${formatPrice(subtotal)}
                    </p>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex items-center justify-between sm:block mt-1">
                      <p className="text-green-600 text-sm">Ahorro total:</p>
                      <p className="font-bold text-green-600">
                        ${formatPrice(totalDiscount)}
                      </p>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    Envío: A confirmar
                  </p>
                </div>
                <div className="flex flex-col space-y-3">
                  <button
                    className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center"
                    onClick={goToNextStep}
                  >
                    Continuar
                  </button>
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm"
                      onClick={() => handleCartModal()}
                    >
                      Actualizar cantidades
                    </button>
                    <button
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors text-sm"
                      onClick={keepBuying}
                    >
                      Seguir comprando
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Paso 2: Datos de contacto */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">
                    Información de contacto
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Completa tus datos para que podamos contactarte sobre tu
                    pedido
                  </p>
                </div>
                <div className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nombre <span className="text-red-500">*(Obligatorio)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Apellido <span className="text-red-500">*(Obligatorio)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Tu apellido"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Celular{" "} <span className="text-red-500">*(Obligatorio)</span>

                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            handleInputChange(e);
                            validatePhone(e.target.value);
                          }}
                          placeholder="Tu número de celular"
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                            phoneError ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                     <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            handleInputChange(e);
                            validateEmail(e.target.value);
                          }}
                          placeholder="tu@email.com"
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                            emailError ? "border-red-500" : "border-gray-300"
                          }`}
                          required
                        />
                      </div>
                      {emailError && (
                        <p className="text-red-500 text-xs mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Beneficios */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">
                    Beneficios de comprar en Casa Tomas
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <CreditCard className="text-blue-600 w-6 h-6 mt-0.5" />
                      <div className="ml-3">
                        <p className="font-semibold text-blue-700">
                          Pagá en cuotas
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Aceptamos todas las tarjetas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
                      <Truck className="text-green-600 w-6 h-6 mt-0.5" />
                      <div className="ml-3">
                        <p className="font-semibold text-green-700">
                          Envío a todo el país
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Rápido y seguro
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">
                    Resumen del pedido
                  </h2>
                </div>

                <div className="p-4">
                  <div className="space-y-3">
                    {buyCart.map((item: BuyCarInterface) => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.item.photo[0] || "/placeholder.svg"}
                            alt={item.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">
                            {item.item.name}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500">
                              Cant: {item.totalQuantities}
                            </p>
                            <p className="text-sm font-medium">
                              ${formatPrice(item.totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">${formatPrice(subtotal)}</p>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="flex justify-between mb-2">
                        <p className="text-green-600">Ahorro</p>
                        <p className="font-medium text-green-600">
                          -${formatPrice(totalDiscount)}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mb-2">
                      <p className="text-gray-600">Envío</p>
                      <p className="text-gray-600">A confirmar</p>
                    </div>

                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                      <p className="text-lg font-bold">Total</p>
                      <p className="text-lg font-bold">
                        ${formatPrice(subtotal)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                        isBuyButtonEnabled
                          ? "bg-sky-600 hover:bg-sky-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isBuyButtonEnabled}
                      onClick={finishOrder}
                    >
                      Pedir presupuesto
                    </button>

                    <button
                      className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors flex items-center justify-center"
                      onClick={goToPreviousStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Volver al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para actualizar cantidades */}
      {isCartOpen && <CartModal handleCartModal={handleCartModal} />}
    </div>
  );
};

export default BuyCart;
