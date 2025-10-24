import { useAuthenticationStore } from "../store/authenticationStore";
import { useClientOrders } from "../hooks/useClientOrders";
import NotFoundPage from "./notFoundPage";

const ClientOrdersPage = () => {
  const { isAuthenticated } = useAuthenticationStore();
  const { data, isLoading, isError } = useClientOrders();

  if (!isAuthenticated) return <NotFoundPage />;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Wczytywanie zamówień...</p>
      </div>
    );

  if (isError || !data || data.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Brak zamówień do wyświetlenia.</p>
      </div>
    );

  const statusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "text-blue-500";
      case "PAID":
        return "text-green-500";
      case "PROCESSING":
        return "text-yellow-500";
      case "SHIPPED":
        return "text-indigo-500";
      case "DELIVERED":
        return "text-emerald-600";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Moje zamówienia
      </h1>

      <div className="space-y-4">
        {data.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <p className="text-gray-800 font-semibold">
                Zamówienie: {order.orderNumber}
              </p>
              <p className={`font-medium ${statusColor(order.status)}`}>
                {order.status}
              </p>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Kwota:</span>{" "}
                {order.totalPrice} zł
              </p>
              <p>
                <span className="font-medium">Dostawa:</span>{" "}
                {order.deliveryPrice} zł
              </p>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-800 mb-1">Produkty:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {order.orderItems.map((item, i) => (
                  <li key={i}>
                    {item.plant.name} × {item.quantity} —{" "}
                    {item.priceAtPurchase} zł
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientOrdersPage;
