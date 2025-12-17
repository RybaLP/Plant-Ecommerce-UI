import { publicApiClient } from "./apiclients/publicApiClient";
import type { CheckoutResponse } from "../interfaces/responses/checkoutResponse";

export const guestPayment = async (orderId : number) : Promise<CheckoutResponse> => {
    const response = await publicApiClient.post("/api/payment/stripe/session", {orderId});
    return response.data;
}