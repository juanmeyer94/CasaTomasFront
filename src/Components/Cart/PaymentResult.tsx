import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getOrderPaymentStatus } from "../../Services/userServices/userServices";

type Variant = "success" | "pending" | "error";

const copy: Record<
  Variant,
  { title: string; description: string; tone: string }
> = {
  success: {
    title: "Pago aprobado",
    description: "Recibimos tu pago. Te vamos a contactar para coordinar la entrega.",
    tone: "text-green-700 bg-green-50 border-green-200",
  },
  pending: {
    title: "Pago pendiente",
    description: "Mercado Pago está procesando el pago. Te avisamos cuando se acredite.",
    tone: "text-amber-700 bg-amber-50 border-amber-200",
  },
  error: {
    title: "No se completó el pago",
    description: "Podés volver al carrito e intentar de nuevo, o pedir presupuesto sin pago online.",
    tone: "text-red-700 bg-red-50 border-red-200",
  },
};

const PaymentResult = ({ variant }: { variant: Variant }) => {
  const [params] = useSearchParams();
  const orderId = params.get("order") || "";
  const [info, setInfo] = useState<{
    orderNumber?: number;
    status?: string;
    paymentId?: string;
  } | null>(null);

  useEffect(() => {
    if (!orderId) return;
    getOrderPaymentStatus(orderId)
      .then((data) => {
        setInfo({
          orderNumber: data.orderNumber,
          status: data.status,
          paymentId: data.payment?.paymentId,
        });
      })
      .catch(() => setInfo(null));
  }, [orderId]);

  const ui = copy[variant];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className={`max-w-lg w-full border rounded-xl p-8 shadow-sm ${ui.tone}`}>
        <h1 className="text-2xl font-bold mb-2">{ui.title}</h1>
        <p className="mb-4">{ui.description}</p>
        {info?.orderNumber != null && (
          <p className="text-sm mb-1">
            Pedido <strong>#{info.orderNumber}</strong>
          </p>
        )}
        {info?.status && (
          <p className="text-sm mb-1">
            Estado: <strong>{info.status}</strong>
          </p>
        )}
        {info?.paymentId && (
          <p className="text-sm mb-4">
            ID pago MP: <strong>{info.paymentId}</strong>
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700"
          >
            Ir al inicio
          </Link>
          {variant !== "success" && (
            <Link
              to="/cart"
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
            >
              Volver al carrito
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
