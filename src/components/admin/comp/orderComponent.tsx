import type { OrderType } from '../../../types/orderType'
import type { Address } from '../../../interfaces/address'
import { useState } from 'react';
import UpdateOrderStatusForm from '../sections/updateOrderStatusForm';
import type { OrderItem } from '../../../interfaces/order/orderItem';

interface Props {
  id: number;
  orderDate: Date;
  totalPrice: number;
  shippingAddress: Address;
  deliveryPrice: number;
  status: OrderType;
  orderNumber: string;
  nip?: string;
  companyName?: string;
  orderItems: OrderItem[]
}

const OrderComponent = ({
  id,
  orderDate,
  totalPrice,
  shippingAddress,
  deliveryPrice,
  status,
  orderNumber,
  nip,
  companyName,
  orderItems
}: Props) => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const handleOpenForm = () => {
    setCurrentId(id);
    setIsFormOpen(true);
  };

  const getStatusStyles = (status: OrderType) => {
    const styles = {
      NEW: 'bg-purple-100 text-purple-800 border border-purple-200',
      PAID: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      DELIVERED: 'bg-green-100 text-green-800 border border-green-200',
      SHIPPED: 'bg-blue-100 text-blue-800 border border-blue-200',
      PROCESSING: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      PENDING: 'bg-orange-100 text-orange-800 border border-orange-200',
      CANCELLED: 'bg-red-100 text-red-800 border border-red-200'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const getStatusText = (status: OrderType) => {
    const texts = {
      NEW: "Nowe",
      PAID: "Opłacone",
      DELIVERED: 'Dostarczone',
      SHIPPED: 'Wysłane',
      PROCESSING: 'W realizacji',
      PENDING: 'Oczekujące',
      CANCELLED: 'Anulowane'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 max-w-2xl mx-auto">

        {/* Nagłówek - kompaktowy */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <h3 className="text-base font-semibold text-gray-900">Zamówienie #{orderNumber}</h3>
            </div>
            <p className="text-xs text-gray-500">
              📅 {orderDate.toLocaleDateString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Status:</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(status)}`}>
              {getStatusText(status)}
            </span>
          </div>
        </div>

        {/* Główne informacje w 2 kolumnach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Lewa kolumna - Adres i rośliny */}
          <div className="space-y-3">
            {/* Adres */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                Adres dostawy
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{shippingAddress.street}</p>
                <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
                {companyName && (
                  <div className="pt-1 border-t border-gray-100">
                    <p className="font-medium">{companyName}</p>
                    {nip && <p className="text-gray-500">NIP: {nip}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Rośliny */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                Rośliny ({orderItems.reduce((sum, item) => sum + item.quantity, 0)} szt.)
              </h4>
              <div className="space-y-1">
                {orderItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-700 truncate">{item.plant.name}</span>
                    <span className="text-gray-600 whitespace-nowrap ml-2">{item.quantity} szt.</span>
                  </div>
                ))}
                {orderItems.length > 3 && (
                  <div className="text-xs text-gray-400 pt-1">
                    +{orderItems.length - 3} więcej...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Podsumowanie */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></span>
              Podsumowanie
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Dostawa:</span>
                <span className="font-medium text-gray-800">{deliveryPrice} zł</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-800">Razem:</span>
                <span className="font-bold text-green-600">{totalPrice} zł</span>
              </div>
            </div>
          </div>
        </div>

        {/* Przycisk */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow"
          onClick={handleOpenForm}
        >
          ✏️ Zmień status zamówienia
        </button>
      </div>

      {isFormOpen && currentId !== null && (
        <UpdateOrderStatusForm
          orderStatus={status}
          id={currentId}
          setIsFormOpen={setIsFormOpen}
          orderNumber={orderNumber}
        />
      )}
    </>
  );
};

export default OrderComponent;