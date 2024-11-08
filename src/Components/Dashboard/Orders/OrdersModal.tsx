import React, { useState, useMemo } from 'react';
import { Order } from "../../../Interfaces/interfacesIndex";
import logo from "../../../../public/logoNavBarByJuliet.svg";

interface OrderItem {
  _id: string;
  quantity: { [key: string]: number };
  items: Array<{
    _id: string;
    name: string;
    marca: string;
    description: string;
    price: string;
    quantity: string;
    wholesalePrice: string;
    photo: string[];
  }>;
}

interface DiscountInfo {
  originalUnitPrice: number;
  originalTotalPrice: number;
  discountedUnitPrice?: number;
  discountedTotalPrice?: number;
  discountPercentage?: string;
  totalOrderedQuantity: number;
  hasDiscount: boolean;
}

const OrderModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const calculateDiscount = (item: OrderItem): DiscountInfo => {
    const totalOrderedQuantity = Object.values(item.quantity).reduce((a, b) => a + b, 0);
    const originalUnitPrice = parseFloat(item.items[0].price);
    const originalTotalPrice = originalUnitPrice * totalOrderedQuantity;
    
    const wholesaleQuantity = parseInt(item.items[0].quantity?.split(" ")[0]);
    const wholesaleTotalPrice = parseFloat(item.items[0].wholesalePrice);

    if (wholesaleTotalPrice !== 0 && wholesaleQuantity !== 0) {
      const discountedUnitPrice = wholesaleTotalPrice / wholesaleQuantity;
      const discountedTotalPrice = discountedUnitPrice * totalOrderedQuantity;
      const discountPercentage = ((originalTotalPrice - discountedTotalPrice) / originalTotalPrice) * 100;
      
      return {
        originalUnitPrice,
        originalTotalPrice,
        discountedUnitPrice,
        discountedTotalPrice,
        discountPercentage: discountPercentage.toFixed(2),
        totalOrderedQuantity,
        hasDiscount: true
      };
    } else {
      return {
        originalUnitPrice,
        originalTotalPrice,
        totalOrderedQuantity,
        hasDiscount: false
      };
    }
  };

  const memoizedDiscountInfo = useMemo(() => {
    return order.orderItems.map(item => calculateDiscount(item as any));
  }, [order.orderItems]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const preloadAllImages = async (imageSources: string[]): Promise<void> => {
    try {
      await Promise.all(imageSources.map(preloadImage));
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);

    const imageSources = [
      logo,
      ...order.orderItems.flatMap(item => item.items.map(subItem => subItem.photo[0]))
    ];

    try {
      await preloadAllImages(imageSources);
      
      const printContent = `
        <html>
          <head>
            <title>Casa Tomas - 100 años cosiendo juntos.</title>
            <style>
              @media print {
                @page {
                  margin: 20mm;
                }
              }
              
              body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
              }
              
              .header {
                position: relative;
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #eee;
              }
              
              .logo {
                position: absolute;
                top: 0;
                right: 0;
                max-width: 100px;
                max-height: 100px;
              }
              
              .customer-info {
                margin-bottom: 30px;
              }
              
              h1 {
                color: #2c5282;
                font-size: 24px;
                margin-bottom: 20px;
              }
              
              h2 {
                color: #2d3748;
                font-size: 18px;
                margin-bottom: 15px;
              }
              
              .product-list {
                list-style: none;
                padding: 0;
              }
              
              .product-item {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
              }
              
              .product-image {
                width: 120px;
                height: 120px;
                object-fit: cover;
                border-radius: 8px;
              }
              
              .product-details {
                flex: 1;
              }
              
              .product-name {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
              }
              
              .product-description {
                color: #666;
                margin-bottom: 12px;
              }
              
              .original-price {
                color: #888;
                margin-bottom: 4px;
              }
              
              .discount-price {
                color: #22c55e;
                font-weight: bold;
                margin-bottom: 4px;
              }
              
              .savings {
                color: #22c55e;
                font-weight: bold;
                margin-bottom: 12px;
              }
              
              .quantity-info {
                margin-top: 12px;
                color: #4a5568;
              }
              
              .footer {
                margin-top: 40px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }

              .order-date {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="${logo}" alt="Casa Tomas Logo" class="logo" />
              <h1>Detalles del Pedido</h1>
            </div>
            
            <div class="customer-info">
              <div class="order-date">Fecha del pedido: ${formatDate(order.createdAt)}</div>
              <h2>Información del Cliente</h2>
              <p><strong>Nombre:</strong> ${order.userName} ${order.userLastName}</p>
              <p><strong>Email:</strong> ${order.userEmail}</p>
              ${order.cellphone ? `<p><strong>Celular:</strong> ${order.cellphone}</p>` : ''}
            </div>

            <h2>Artículos</h2>
            <ul class="product-list">
              ${order.orderItems.map((item, index) => {
                const discountInfo = memoizedDiscountInfo[index];
                
                return `
                  <li class="product-item">
                    ${item.items.map((subItem) => `
                      <img src="${subItem.photo[0]}" alt="${subItem.name}" class="product-image" />
                      <div class="product-details">
                        <div class="product-name">${subItem.marca}</div>
                        <div class="product-description">${subItem.description}</div>
                        
                        <div class="original-price">
                          Precio original por unidad: $${formatPrice(discountInfo.originalUnitPrice)}
                        </div>
                        <div class="original-price">
                          Precio original total: $${formatPrice(discountInfo.originalTotalPrice)}
                        </div>
                        
                        ${discountInfo.hasDiscount ? `
                          <div class="discount-price">
                            Precio con descuento por unidad: $${discountInfo.discountedUnitPrice && formatPrice(discountInfo.discountedUnitPrice)}
                          </div>
                          <div class="discount-price">
                            Precio con descuento total: $${discountInfo.discountedTotalPrice && formatPrice(discountInfo.discountedTotalPrice)}
                          </div>
                          <div class="savings">
                            Ahorro: ${discountInfo.discountPercentage}%
                          </div>
                        ` : ''}
                        
                        <div class="quantity-info">
                          <div>Cantidad total ordenada: ${discountInfo.totalOrderedQuantity}</div>
                          ${Object.entries(item.quantity).map(([color, qty]) => `
                            <div><strong>${color}:</strong> ${qty} unidades</div>
                          `).join('')}
                        </div>
                      </div>
                    `).join('')}
                  </li>
                `;
              }).join('')}
            </ul>
            
            <div class="footer">
              <p>Casa Tomas - 100 años cosiendo juntos</p>
              <p>¡Gracias por su compra!</p>
            </div>
          </body>
        </html>
      `;

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Error preparing print:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-[70vh] md:ml-[20vh] lg:ml-[40vh] xl:ml-[60vh] 2xl:ml-[80vh]">
      <div className="bg-white w-96 p-6 rounded-md overflow-y-auto max-h-[90vh]">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Fecha del pedido: {formatDate(order.createdAt)}</p>
          <h2 className="text-lg font-semibold">Cliente: {order.userName} {order.userLastName}</h2>
          <p>Email: {order.userEmail}</p>
          {order.cellphone && <p>Celular: {order.cellphone}</p>}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Artículos:</h2>
          <ul>
            {order.orderItems.map((item, index) => {
              const discountInfo = memoizedDiscountInfo[index];
              return (
                <li key={item._id} className="mb-4">
                  {item.items.map((subItem) => (
                    <div key={subItem._id} className="flex mb-2">
                      <img src={subItem.photo[0]} alt={subItem.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-medium">{subItem.marca}</h3>
                        <p className="text-sm text-gray-600">{subItem.description}</p>
                        <div className="mt-2">
                          {Object.entries(item.quantity).map(([color, qty]) => (
                            <p key={color} className="text-sm text-gray-700">
                              <span className="font-semibold">{color}:</span> {qty} unidades
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">Precio original por unidad: ${formatPrice(discountInfo.originalUnitPrice)}</p>
                        <p className="text-sm text-gray-500">Precio original total: ${formatPrice(discountInfo.originalTotalPrice)}</p>
                        {discountInfo.hasDiscount && (
                          <div className="mt-2 text-green-600">
                            <p>Precio con descuento por unidad: ${discountInfo.discountedUnitPrice && formatPrice(discountInfo.discountedUnitPrice)}</p>
                            <p>Precio con descuento total: ${discountInfo.discountedTotalPrice && formatPrice(discountInfo.discountedTotalPrice)}</p>
                            <p>Ahorro: {discountInfo.discountPercentage}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            CERRAR
          </button>
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-md ${isPrinting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isPrinting ? 'Preparando...' : 'IMPRIMIR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;