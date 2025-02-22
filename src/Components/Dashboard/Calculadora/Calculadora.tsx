
import { useState } from "react";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

const CreditCardFeeCalculator = () => {
  const [basePrice, setBasePrice] = useState<number>(0);
  const [displayPrice, setDisplayPrice] = useState<string>(
    formatPrice(0)
  );
  const [installments, setInstallments] = useState<string>("3");
  const [financingRate, setRate] = useState(0.0555);
  const [results, setResults] = useState<{
    finalAmount: number;
    fee: number;
    financingCost: number;
    iva21: number;
    iva10_5: number;
    iva1_5: number;
    iva3: number;
    ibSantaFe: number;
    totalDeductions: number;
    installmentPrice: number;
  }>({
    finalAmount: 0,
    fee: 0,
    financingCost: 0,
    iva21: 0,
    iva10_5: 0,
    iva1_5: 0,
    iva3: 0,
    ibSantaFe: 0,
    totalDeductions: 0,
    installmentPrice: 0,
  });

  const calculateResults = () => {
    const FEE_RATE = 0.018;
    const FINANCING_RATE = financingRate;
    const IVA21_RATE = 0.21;
    const IVA105_RATE = 0.105;
    const IVA15_RATE = 0.015;
    const IVA3_RATE = 0.03;
    const IBSANTAFE_RATE = 0.036;

    let finalAmount,
      fee,
      financingCost,
      iva21,
      iva10_5,
      iva1_5,
      iva3,
      ibSantaFe,
      totalDeductions;

    if (installments === "12") {
      financingCost = Math.ceil(basePrice * FINANCING_RATE);

      const preliminaryAmount = basePrice + financingCost;
      fee = Math.ceil(preliminaryAmount * 0.035);
      iva21 = Math.ceil((fee + financingCost) * IVA21_RATE);
      iva3 = Math.ceil((fee + financingCost) * IVA3_RATE);
      ibSantaFe = Math.ceil(preliminaryAmount * IBSANTAFE_RATE);

      iva10_5 = 0;
      iva1_5 = 0;

      totalDeductions = fee + financingCost + iva21 + iva3 + ibSantaFe;

      finalAmount = basePrice + totalDeductions;

      fee = Math.ceil(finalAmount * FEE_RATE);
      ibSantaFe = Math.ceil(finalAmount * IBSANTAFE_RATE);

      iva21 = Math.ceil((fee + financingCost) * IVA21_RATE);
      iva3 = Math.ceil((fee + financingCost) * IVA3_RATE);

      totalDeductions = fee + financingCost + iva21 + iva3 + ibSantaFe;
      finalAmount = basePrice + totalDeductions;
    } else {
      const totalFactors =
        1 -
        (FEE_RATE +
          FEE_RATE * IVA21_RATE +
          FEE_RATE * IVA3_RATE +
          IBSANTAFE_RATE);
      const netoFactors =
        FINANCING_RATE +
        FINANCING_RATE * IVA105_RATE +
        FINANCING_RATE * IVA15_RATE;

      finalAmount = Math.ceil((basePrice * (1 + netoFactors)) / totalFactors);
      fee = Math.ceil(finalAmount * FEE_RATE);
      financingCost = Math.ceil(basePrice * FINANCING_RATE);
      iva21 = Math.ceil(fee * IVA21_RATE);
      iva10_5 = Math.ceil(financingCost * IVA105_RATE);
      iva1_5 = Math.ceil(financingCost * IVA15_RATE);
      iva3 = Math.ceil(fee * IVA3_RATE);
      ibSantaFe = Math.ceil(finalAmount * IBSANTAFE_RATE);
      totalDeductions =
        fee + financingCost + iva21 + iva10_5 + iva1_5 + iva3 + ibSantaFe;
    }

    const installmentPrice = Math.ceil(
      finalAmount / Number.parseInt(installments)
    );

    setResults({
      finalAmount,
      fee,
      financingCost,
      iva21,
      iva10_5,
      iva1_5,
      iva3,
      ibSantaFe,
      totalDeductions,
      installmentPrice,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numberValue = Number.parseInt(rawValue) || 0;
    setBasePrice(numberValue);
    setDisplayPrice(formatPrice(numberValue));
  };

  const handleInstallmentsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setInstallments(value);
    switch (value) {
      case "3":
        setRate(5.55 / 100);
        break;
      case "6":
        setRate(13.7 / 100);
        break;
      case "12":
        setRate(59.5 / 100);
        break;
      default:
        setRate(0);
        break;
    }
  };

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-AR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  const handlePrint = () => {
    window.print();
  };

  const SplitText = ({ text }: { text: string }) => {
    return (
      <motion.div
        className="flex overflow-hidden whitespace-pre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 relative">
        <div className="absolute top-6 right-6">
          <img
            src="/LOGO.png?height=60&width=60"
            alt="Casa Tomas Logo"
            width={60}
            height={60}
            className=""
          />
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6"
        >
          <SplitText text="Casa Tomas Financiamientos" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <label
                htmlFor="basePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Neto a Percibir
              </label>

              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id="basePrice"
                  type="text"
                  value={displayPrice}
                  onChange={handleInputChange}
                  className="w-full pl-7 pr-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="installments"
                className="block text-sm font-medium text-gray-700"
              >
                Cuotas
              </label>
              <select
                id="installments"
                value={installments}
                onChange={handleInstallmentsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
              </select>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={calculateResults}
              className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Calcular
            </button>
            <button onClick={handlePrint} className="px-4 py-3">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </button>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {Object.entries(results).map(([key, value]) => {
              // Definir nombres personalizados para cada key
              const columnNames: Record<string, string> = {
                finalAmount: "Monto Total",
                fee: "Arancel",
                financingCost: "Costo Financiero",
                interestRate: "Tasa de Interés",
                principalAmount: "Monto del Préstamo",
                totalDeductions: "Total de Deducido",
                iva10_5: "Iva 10,5% RG2408",
                iva1_5: "Iva 10,5%",
                iva21: "Iva 21%",
                ibSantaFe: "Impuesto IB Santa Fe",
                iva3: "Iva 3% RG2408",
              };

              // Si la key es "installmentPrice", la omitimos
              if (key === "installmentPrice") return null;

              return (
                <motion.div
                  key={key}
                  className="bg-gray-50 p-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-gray-600">
                    {columnNames[key] || key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${formatPrice(value)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="bg-blue-600 text-white p-4 rounded-lg space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <p className="font-medium">Total Deducciones:</p>
              <p className="text-2xl font-bold">
                ${formatPrice(results.totalDeductions)}
              </p>
            </div>
            <div>
              <p className="font-medium">Monto Total:</p>
              <p className="text-2xl font-bold">
                ${formatPrice(results.finalAmount)}
              </p>
            </div>
            <div>
              <p className="font-medium">Valor de cada cuota:</p>
              <p className="text-2xl font-bold">
                ${formatPrice(results.installmentPrice)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardFeeCalculator;

