import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthenticationStore } from "../store/authenticationStore";

interface PropType {
  deliveryPrice: number;
  payOnDelivery: boolean;
}

interface DiscountPropType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({ deliveryPrice, payOnDelivery }: PropType) => {

  const {isAuthenticated} = useAuthenticationStore();
  const { cartQuery } = useCart();
  const {cart} = useCartStore();

  const guestCartItems = cart.items;
  const authenticatedCartItems = cartQuery.data?.cartItems || [];

  const shoppingItems = isAuthenticated ? authenticatedCartItems : guestCartItems;

  const [isOpen, setIsOpen] = useState(false);
  let extraPayment: number = 0;
  if (payOnDelivery === true) {
    extraPayment = 7.00;
  } else if (payOnDelivery === false) {
    extraPayment = 0.00;
  }

  console.log("shopping items" , shoppingItems);

  return (
    <div className="flex flex-col space-y-6">
      {shoppingItems.map((item) => (
        <div key={item.plant.id} className="flex items-center gap-4">
          <img
            src={item.plant.imageUrl}
            width={70}
            height={70}
            alt={item.plant.name}
            className="rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium text-black">{item.plant.name}</span>
            <span className="text-sm text-black">{item.quantity} szt.</span>
            <span className="text-sm text-gray-500">
              Cena: {(item.plant.price * item.quantity).toFixed(2)} zł
            </span>
          </div>
        </div>
      ))}
      <div className="flex flex-row p-3 mt-3 bg-emerald-600 rounded-lg">
        {isOpen ? (
          <DiscountCodeOpen setIsOpen={setIsOpen} />
        ) : (
          <DiscountCodeClosed setIsOpen={setIsOpen} />
        )}
      </div>
      <div className="flex flex-col space-y-1 text-black">
        <span>
          Koszyk:{" "}
          {shoppingItems
            .reduce((value, item) => value + item.plant.price * item.quantity, 0)
            .toFixed(2)}{" "}
          zł
        </span>
        <span>Kurier: {deliveryPrice?.toFixed(2)} zł</span>
        {payOnDelivery && (
          <span>Płatność za pobraniem: 7.00 zł</span>
        )}
        <span className="font-bold text-emerald-600">
          Do zapłaty:{" "}
          {(
            shoppingItems.reduce(
              (value, item) => value + item.plant.price * item.quantity,
              0
            ) +
            (deliveryPrice || 0) +
            extraPayment
          ).toFixed(2)}{" "}
          zł
        </span>
      </div>
    </div>
  );
};

const DiscountCodeOpen = ({ setIsOpen }: DiscountPropType) => {
  return (
    <div className="flex flex-col w-full">
      <div
        onClick={() => setIsOpen(false)}
        className="cursor-pointer font-bold text-white hover:underline mb-2"
      >
        <span>Anuluj</span>
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="np. ZNIŻKA10"
          className="border border-gray-300 text-black px-2 py-1 rounded-l w-full"
        />
        <button className="bg-emerald-700 text-white px-4 py-1 rounded-r hover:bg-emerald-800">
          Aktywuj
        </button>
      </div>
    </div>
  );
};

const DiscountCodeClosed = ({ setIsOpen }: DiscountPropType) => {
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="cursor-pointer text-emerald-200 hover:underline"
    >
      <span>Masz kod promocyjny?</span>
    </div>
  );
};

export default OrderSummary;