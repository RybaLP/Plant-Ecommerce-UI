import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DeliveryAndPayment from "../components/deliveryAndPayment"
import OrderSummary from "../components/orderSummary"
import { useAuthenticationStore } from "../store/authenticationStore"
import { useGuestFormStore } from "../store/useGuestFormStore"
import type { CreateUserOrder } from "../interfaces/requests/createUserOrder"
import type { CreateGuestOrder } from "../interfaces/requests/createGuestOrder"
import { createUserOrder } from "../api/createUserOrder"
import { createGuestOrder } from "../api/createGuestOrder.ts"
import { useCartStore } from "../store/useCartStore.ts"
import toast from "react-hot-toast"

const OrderPage = () => {

  // constants
  const makeOrder : string = "Złóż zamówienie";
  const payAndMakeOrder : string = "Złóż i opłać zamówienie";
  const navigate = useNavigate();

  // all use statements
  const [deliveryPrice, setDeliveryPrice] = useState(15.00);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [isCompanyOrder , setIsCompanyOrder] = useState(false);
  const [nip, setNip] = useState("");
  const [companyName, setCompanyName] = useState("");

  // request field logic
  const totalDeliveryPrice = payOnDelivery ? deliveryPrice + 7.00 : deliveryPrice;

  // stores
  const {isAuthenticated} = useAuthenticationStore();
  const {setGuestInfo, guestEmail, clearGuestForm , guestFirstName, guestLastName, guestPhone , shippingAddress} = useGuestFormStore();
  const {cart} = useCartStore();

  const handleCreateOrder = async () => {

    if (isAuthenticated) {
      const reqBody : CreateUserOrder = {deliveryPrice : totalDeliveryPrice,
      paymentMethod : payOnDelivery ? "CASH_ON_DELIVERY" : "STRIPE",
      isCompanyOrder : isCompanyOrder , nip : nip, companyName : companyName};
      
      const data = await createUserOrder(reqBody);
      if(data) {
        toast.success("Created successfuly");
      }

    }

    else if (!isAuthenticated) {
        const reqBody : CreateGuestOrder= {deliveryPrice : totalDeliveryPrice,
          paymentMethod : payOnDelivery ? "CASH_ON_DELIVERY" : "STRIPE",
          isCompanyOrder : isCompanyOrder, nip : nip , companyName : companyName,
          guestFirstName : guestFirstName , guestLastName : guestLastName, guestEmail : guestEmail,
          guestPhone : guestPhone, cartItems : cart.items, shippingAddress : shippingAddress
        }

        const data = await createGuestOrder(reqBody);
        if(data) {
          toast.success("Created succesffuly!");
        }
    }
  }


  return (
    <section className="grid grid-cols-1 md:grid-cols-5">
      <div className="col-span-3">
        <DeliveryAndPayment setDeliveryPrice={setDeliveryPrice} deliveryPrice={deliveryPrice} setPayOnDelivery={setPayOnDelivery} setGuestInfo = {setGuestInfo} 
        setNip={setNip} setIsCompanyOrder={setIsCompanyOrder} setCompanyName = {setCompanyName} isCompanyOrder={isCompanyOrder}/>
      </div>

      <div className="col-span-2">
         <OrderSummary deliveryPrice={deliveryPrice} payOnDelivery={payOnDelivery}/>

        <button className="p-3 bg-emerald-400 text-xl mt-7 rounded-2xl cursor-pointer text-white"
        onClick={handleCreateOrder}>
            <span>{payOnDelivery ? makeOrder : payAndMakeOrder}</span>
        </button>
      </div>
    </section>
  )
}

export default OrderPage