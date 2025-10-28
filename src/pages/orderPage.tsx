import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryAndPayment from "../components/deliveryAndPayment";
import OrderSummary from "../components/orderSummary";
import { useAuthenticationStore } from "../store/authenticationStore";
import { useGuestFormStore } from "../store/useGuestFormStore";
import type { CreateUserOrder } from "../interfaces/requests/createUserOrder";
import type { CreateGuestOrder } from "../interfaces/requests/createGuestOrder";
import { createGuestOrder } from "../api/createGuestOrder.ts";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import { useCompleteUserOrder } from "../hooks/useCompleteUserOrder";
import { useClientContactInfo } from "../hooks/useClientContactInfo";
import ClientContactInfoForm from "../components/clientContactInfoForm";

const OrderPage = () => {
  // Stałe
  const makeOrder = "Złóż zamówienie";
  const payAndMakeOrder = "Złóż i opłać zamówienie";
  const navigate = useNavigate();

  // Stany
  const [deliveryPrice, setDeliveryPrice] = useState(15.0);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [isCompanyOrder, setIsCompanyOrder] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [nip, setNip] = useState("");
  const [companyName, setCompanyName] = useState("");

  const totalDeliveryPrice = payOnDelivery ? deliveryPrice + 7.0 : deliveryPrice;

  const { isAuthenticated } = useAuthenticationStore();
  const {
    setGuestInfo,
    guestEmail,
    clearGuestForm,
    guestFirstName,
    guestLastName,
    guestPhone,
    shippingAddress,
  } = useGuestFormStore();
  const { cart } = useCartStore();

  const { mutateAsync } = useCompleteUserOrder();
  const { clientContactInfo, isFetched } = useClientContactInfo();

  useEffect(() => {
    if (isFetched && isAuthenticated && !clientContactInfo) {
      setIsContactInfoOpen(true);
    }
  }, [isAuthenticated, clientContactInfo]);

  const handleCreateOrder = async () => {
    if (isAuthenticated) {
      const reqBody: CreateUserOrder = {
        deliveryPrice: totalDeliveryPrice,
        paymentMethod: payOnDelivery ? "CASH_ON_DELIVERY" : "STRIPE",
        isCompanyOrder,
        nip,
        companyName,
      };

      try {
        const data = await mutateAsync(reqBody);
        if (data.stripeCheckoutUrl) {
          window.location.href = data.stripeCheckoutUrl;
        } else {
          navigate("/zamowienie?orderNumber=" + data.orderNumber);
        }
      } catch (error) {
        toast.error("Nie udało się utworzyć zamówienia");
      }
    } else {
      const reqBody: CreateGuestOrder = {
        deliveryPrice: totalDeliveryPrice,
        paymentMethod: payOnDelivery ? "CASH_ON_DELIVERY" : "STRIPE",
        isCompanyOrder,
        nip,
        companyName,
        guestFirstName,
        guestLastName,
        guestEmail,
        guestPhone,
        cartItems: cart.items,
        shippingAddress,
      };

      try {
        const data = await createGuestOrder(reqBody);
        if (data.stripeCheckoutUrl) {
          window.location.href = data.stripeCheckoutUrl;
        } else {
          toast.success("Zamówienie utworzone pomyślnie!");
          navigate("/koszyk");
        }
      } catch (error) {
        toast.error("Nie udało się utworzyć zamówienia");
      }
    }
  };

  return (
    <>
      {isContactInfoOpen && (
        <ClientContactInfoForm setIscontactInfoOpen={setIsContactInfoOpen} />
      )}

      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-3">
          <DeliveryAndPayment
            setDeliveryPrice={setDeliveryPrice}
            deliveryPrice={deliveryPrice}
            setPayOnDelivery={setPayOnDelivery}
            setGuestInfo={setGuestInfo}
            setNip={setNip}
            setIsCompanyOrder={setIsCompanyOrder}
            setCompanyName={setCompanyName}
            isCompanyOrder={isCompanyOrder}
            isAddressFormOpen={isAddressFormOpen}
            setIsAddressFormOpen={setIsAddressFormOpen}
            clientContactInfo={clientContactInfo}
          />
        </div>

        <div className="col-span-2">
          <OrderSummary
            deliveryPrice={deliveryPrice}
            payOnDelivery={payOnDelivery}
          />

          <button
            className="p-3 bg-emerald-500 text-xl mt-7 rounded-2xl cursor-pointer text-white w-full hover:bg-emerald-600 transition"
            onClick={handleCreateOrder}
          >
            <span>{payOnDelivery ? makeOrder : payAndMakeOrder}</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
