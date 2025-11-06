import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthenticationStore } from "../store/authenticationStore";
import { FaTag, FaTimes } from "react-icons/fa";

interface PropType {
  deliveryPrice: number;
  payOnDelivery: boolean;
}

interface DiscountPropType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({ deliveryPrice, payOnDelivery }: PropType) => {
  const { isAuthenticated } = useAuthenticationStore();
  const { cartQuery } = useCart();
  const { cart } = useCartStore();

  const guestCartItems = cart.items;
  const authenticatedCartItems = cartQuery.data?.cartItems || [];

  const shoppingItems = isAuthenticated ? authenticatedCartItems : guestCartItems;

  const [isOpen, setIsOpen] = useState(false);
  const extraPayment = payOnDelivery ? 7.00 : 0.00;

  const subtotal = shoppingItems.reduce((value, item) => value + item.plant.price * item.quantity, 0);
  const total = subtotal + deliveryPrice + extraPayment;

  return (
    <div className="flex flex-col space-y-6 p-6 border border-gray-200 rounded-lg bg-white ">
      {/* Products List */}
      <div className="space-y-4">
        {shoppingItems.map((item) => (
          <div key={item.plant.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0">
            <img
              src={item.plant.imageUrl}
              width={80}
              height={80}
              alt={item.plant.name}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-900 block">{item.plant.name}</span>
              <span className="text-sm text-gray-600">{item.quantity} szt.</span>
              <span className="text-sm font-medium text-gray-900 block mt-1">
                {(item.plant.price * item.quantity).toFixed(2)} zł
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className="border-t border-gray-200 pt-4">
        {isOpen ? (
          <DiscountCodeOpen setIsOpen={setIsOpen} />
        ) : (
          <DiscountCodeClosed setIsOpen={setIsOpen} />
        )}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Koszyk:</span>
          <span>{subtotal.toFixed(2)} zł</span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>Dostawa:</span>
          <span>{deliveryPrice.toFixed(2)} zł</span>
        </div>
        
        {payOnDelivery && (
          <div className="flex justify-between text-gray-700">
            <span>Płatność za pobraniem:</span>
            <span>7.00 zł</span>
          </div>
        )}
        
        <div className="flex justify-between text-lg font-bold text-emerald-700 pt-3 border-t border-gray-200">
          <span>Do zapłaty:</span>
          <span>{total.toFixed(2)} zł</span>
        </div>
      </div>
    </div>
  );
};

const DiscountCodeOpen = ({ setIsOpen }: DiscountPropType) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 flex items-center gap-2">
          <FaTag size={14} className="text-emerald-600" />
          Kod promocyjny
        </span>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Wprowadź kod promocyjny"
          className="flex-1 border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Aktywuj
        </button>
      </div>
    </div>
  );
};

const DiscountCodeClosed = ({ setIsOpen }: DiscountPropType) => {
  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
    >
      <FaTag size={14} />
      <span>Masz kod promocyjny?</span>
    </button>
  );
};

export default OrderSummary;