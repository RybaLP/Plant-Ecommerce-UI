import { useFindAllOrders } from "../../../hooks/admin-hooks/useFindAllOrders"
import type { Order } from "../../../interfaces/order/order";
import OrderComponent from "../comp/orderComponent";

const OrdersSection = () => {
  const { data, isLoading, isError } = useFindAllOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Ładowanie zamówień...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-red-800 mb-2">Błąd ładowania</h3>
        <p className="text-red-600">Wystąpił problem podczas ładowania listy zamówień.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
        >
          ⟳ Spróbuj ponownie
        </button>
      </div>
    );
  }

  const orders: Order[] = data ?? [];
  
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  let lastDisplayedDate = '';

  return (
    <div className="space-y-8">

{/* To do later */}
      
      {/* <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Zamówienia</h1>
        <p className="text-green-100 text-lg mb-6">Zarządzaj wszystkimi zamówieniami w systemie</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-black text-2xl text-center">Wszystkie</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-black text-2xl text-center">Dostarczone</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-black text-2xl text-center">W realizacji</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-black text-2xl text-center">Oczekujące</div>
          </div>
        </div>
      </div> */}

      {sortedOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Brak zamówień</h3>
          <p className="text-gray-600 text-lg">Nie znaleziono żadnych zamówień w systemie.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedOrders.map((order) => {
            const orderDate = new Date(order.orderDate);
            const dateKey = orderDate.toLocaleDateString('pl-PL');
            
            const showDateHeader = dateKey !== lastDisplayedDate;
            lastDisplayedDate = dateKey;
            
            return (
              <div key={order.id} className="space-y-4">
                {showDateHeader && (
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {orderDate.toLocaleDateString('pl-PL', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric',
                        weekday: 'long' 
                      })}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
                  </div>
                )}
                <OrderComponent
                  orderDate={orderDate}
                  totalPrice={order.totalPrice}
                  shippingAddress={order.shippingAddress}
                  deliveryPrice={order.deliveryPrice}
                  status={order.status}
                  orderNumber={order.orderNumber}
                  nip={order.nip}
                  companyName={order.companyName}
                  id={order.id}
                  orderItems = {order.orderItems}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrdersSection;