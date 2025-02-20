"use client"

import type React from "react"
import { useState, useEffect } from "react"

const CreditCardFeeCalculator: React.FC = () => {
  const [basePrice, setBasePrice] = useState<number>(490012.8)
  const [installments, setInstallments] = useState<string>("3")
  const [financingRate, setRate] = useState(0)
  const [results, setResults] = useState<{
    finalAmount: number
    fee: number
    financingCost: number
    iva21: number
    iva10_5: number
    iva1_5: number
    iva3: number
    ibSantaFe: number
    totalDeductions: number
    installmentPrice: number
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
  })

  const calculateResults = (netoAPercibir: number, installmentCount: number) => {
    const FEE_RATE = 0.018 // 1.8%
    const FINANCING_RATE = financingRate // 13.66%
    const IVA21_RATE = 0.21 // 21%
    const IVA105_RATE = 0.105 // 10.5%
    const IVA15_RATE = 0.015 // 1.5%
    const IVA3_RATE = 0.03 // 3%
    const IBSANTAFE_RATE = 0.036 // 3.6%

    const totalFactors = 1 - (FEE_RATE + FEE_RATE * IVA21_RATE + FEE_RATE * IVA3_RATE + IBSANTAFE_RATE)
    const netoFactors = FINANCING_RATE + FINANCING_RATE * IVA105_RATE + FINANCING_RATE * IVA15_RATE

    const finalAmount = Math.ceil((netoAPercibir * (1 + netoFactors)) / totalFactors) // Redondear hacia arriba

    const fee = Math.ceil(finalAmount * FEE_RATE) // Redondear hacia arriba
    const financingCost = Math.ceil(netoAPercibir * FINANCING_RATE) // Redondear hacia arriba
    const iva21 = Math.ceil(fee * IVA21_RATE) // Redondear hacia arriba
    const iva10_5 = Math.ceil(financingCost * IVA105_RATE) // Redondear hacia arriba
    const iva1_5 = Math.ceil(financingCost * IVA15_RATE) // Redondear hacia arriba
    const iva3 = Math.ceil(fee * IVA3_RATE) // Redondear hacia arriba
    const ibSantaFe = Math.ceil(finalAmount * IBSANTAFE_RATE) // Redondear hacia arriba

    const totalDeductions = fee + financingCost + iva21 + iva10_5 + iva1_5 + iva3 + ibSantaFe
    const installmentPrice = Math.ceil(finalAmount / installmentCount) // Redondear hacia arriba

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
    })
  }

  useEffect(() => {
    calculateResults(basePrice, Number.parseInt(installments))
  }, [basePrice, installments])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setBasePrice(isNaN(value) ? 0 : value)
  }

  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setInstallments(e.target.value)
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
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Calculadora de Financiación</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                Neto a Percibir
              </label>
              <input
                id="basePrice"
                type="number"
                value={basePrice}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="installments" className="block text-sm font-medium text-gray-700">
                Cuotas
              </label>
              <select
        id="installments"
        value={installments}
        onChange={
          handleInstallmentsChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="3">3 cuotas</option>
        <option value="6">6 cuotas</option>
        <option value="12">12 cuotas</option>
      </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(results).map(([key, value]) => (
              <div key={key} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold text-sm text-gray-600">
                  {key === "finalAmount"
                    ? "Monto Total"
                    : key === "fee"
                      ? "Arancel"
                      : key === "financingCost"
                        ? "Costo Financiero"
                        : key === "installmentPrice"
                          ? "Valor Cuota"
                          : key.replace(/([A-Z])/g, " $1").trim()}
                  :
                </p>
                <p className="text-lg font-bold text-indigo-600">${formatPrice(value)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-indigo-600 text-white p-4 rounded-lg">
            <p className="font-bold text-lg">Total Deducciones:</p>
            <p className="text-2xl font-extrabold">${formatPrice(results.totalDeductions)}</p>
            <p className="font-bold text-lg">Monto Total:</p>
            <p className="text-2xl font-extrabold">${formatPrice(results.finalAmount)}</p>
            <p className="font-bold text-lg">Valor de cada cuota:</p>
            <p className="text-2xl font-extrabold">${formatPrice(results.installmentPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCardFeeCalculator

