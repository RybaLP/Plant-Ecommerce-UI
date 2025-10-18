import type { Address } from "../address";
import type { CartItem } from "../cart/cartItem";

export interface CreateGuestOrder {
    guestFirstName : string;
    guestLastName : string;
    guestEmail : string;
    guestPhone: string;
    shippingAddress : Address;
    deliveryPrice : number;
    cartItems : CartItem[];
    isCompanyOrder : boolean,
    paymentMethod : "STRIPE" | "CASH_ON_DELIVERY",

    // optional fields
    nip? : string,
    companyName : string
}