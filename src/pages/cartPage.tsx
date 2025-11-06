import EmptyCart from "../components/emptyCart";
import { useCartStore } from "../store/useCartStore";
import { useAuthenticationStore } from "../store/authenticationStore";
import { useCart } from "../hooks/useCart";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useState } from "react";
import CleanCartWarning from "../components/notifications/cleanCartWarning";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticationStore();
  const guestCart = useCartStore((state) => state.cart);
  const { cartQuery, deleteMutation, updateQuantityMutation } = useCart();
  const { updateQuantity, totalPrice, removeItem } = useCartStore();
  const [isCleanCartWarningOpen, setIsCleanCartWarning] = useState(false);

  const authenticatedTotalPrice = cartQuery.data?.cartItems.reduce((sum, i) => sum + i.plant.price * i.quantity, 0) ?? 0;

  const handleWarningCart = () => setIsCleanCartWarning((s) => !s);

  const handleDecreaseQuantity = (plantId: number, quantity: number) => {
    if (!isAuthenticated && quantity > 1) {
      updateQuantity(plantId, quantity - 1);
    }
  };

  const handleIncreaseQuantity = (plantId: number, quantity: number) => {
    if (!isAuthenticated) {
      updateQuantity(plantId, quantity + 1);
    }
  };


  const handleContinue = () => {
    if(isAuthenticated){
      navigate("/koszyk/zamowienie")
    } else if (!isAuthenticated) {
      navigate("/koszyk/konto")
    }
  }

  //  GUEST CART
  if (!isAuthenticated) {
    return (
      <section className="bg-white text-gray-900 p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
        {isCleanCartWarningOpen && (
          <CleanCartWarning handleWarningCart={handleWarningCart} />
        )}

        <header className="flex justify-between items-center mb-6 border-b pb-4">
         <h2 className="text-2xl font-bold">
           Koszyk ({guestCart?.items?.length ?? 0} {guestCart?.items?.length === 1 ? "produkt" : "produkty"})
         </h2>

          <div className="flex space-x-4 text-gray-500">
            <button
              onClick={handleWarningCart}
              className="hover:text-red-600 transition"
            >
              🗑️ Wyczyść koszyk
            </button>
          </div>
        </header>

        {guestCart.items?.length > 0 ? (
          <>
            {guestCart.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg mb-4 flex items-center justify-between border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.plant.imageUrl}
                    alt={item.plant.name}
                    className="w-20 h-20 object-contain rounded-md border border-gray-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.plant.name}</h3>
                    <p className="text-sm text-gray-500">
                      Cena:{" "}
                      <span className="font-bold text-gray-900">{item.plant.price} zł</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.plantId, item.quantity)}
                    className="hover:text-green-600 transition"
                  >
                    <CiSquareMinus size={32} />
                  </button>
                  <span className="text-xl font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.plantId, item.quantity)}
                    className="hover:text-green-600 transition"
                  >
                    <CiSquarePlus size={32} />
                  </button>

                  <button className="text-gray-400 hover:text-red-400 transition">❤️</button>
                  <button
                    onClick={() => removeItem(item.plantId)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right border-t pt-4">
              <span className="text-lg font-semibold">
                Przewidywana suma:{" "}
                <span className="text-green-600">{totalPrice.toFixed(2)} zł</span>
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="p-4 font-bold bg-orange-500 text-white hover:cursor-pointer rounded-2xl" onClick={handleContinue}>
               Przejdź do podsumowania
              </button>
            </div>

          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    );
  }

  if (isAuthenticated) {
    if (cartQuery.isLoading) return <div className="text-center">Ładowanie koszyka...</div>;
    if (cartQuery.isError) return <div className="text-center text-red-500">Błąd ładowania koszyka</div>;

    const cart = cartQuery.data;

    return (
      <section className="bg-white text-gray-900 p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
        {isCleanCartWarningOpen && (
          <CleanCartWarning handleWarningCart={handleWarningCart} />
        )}

        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">
            Koszyk ({cart?.cartItems.length ?? 0} {cart?.cartItems.length === 1 ? "produkt" : "produkty"})
          </h2>
          <div className="flex space-x-4 text-gray-500">
            <button
              onClick={() => setIsCleanCartWarning(true)}
              className="hover:text-red-600 transition"
            >
              🗑️ Wyczyść koszyk
            </button>
          </div>
        </header>

        {cart && cart.cartItems.length > 0 ? (
          <>
            {cart.cartItems.map((item) => (
              <div
                key={item.plant.id}
                className="bg-white p-4 rounded-lg mb-4 flex items-center justify-between border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.plant.imageUrl}
                    alt={item.plant.name}
                    className="w-20 h-20 object-contain rounded-md border border-gray-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.plant.name}</h3>
                    <p className="text-sm text-gray-500">
                      Cena:{" "}
                      <span className="font-bold text-gray-900">{item.plant.price} zł</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor={`quantity-${item.plant.id}`}
                    className="text-sm text-gray-500"
                  >
                    Ilość:
                  </label>

                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantityMutation.mutate({
                        plantId: item.plant.id,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="bg-white border border-gray-300 rounded-md p-1 text-gray-900 focus:ring-2 focus:ring-green-400"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => deleteMutation.mutate(item.plant.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right border-t pt-4">
              <span className="text-lg font-semibold">
                Przewidywana suma:{" "}
                <span className="text-green-600">
                  {authenticatedTotalPrice?.toFixed(2)} zł
                </span>
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="p-4 font-bold bg-orange-500 text-white hover:cursor-pointer rounded-2xl" onClick={handleContinue}>
               Przejdź do podsumowania
              </button>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    );
  }

  return null;
};

export default CartPage;
