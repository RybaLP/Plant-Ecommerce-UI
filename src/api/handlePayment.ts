import type { CheckoutResponse } from "../interfaces/responses/checkoutResponse";
import { apiClient } from "./apiclients/apiClient";

export const handlePayment = async (orderId : number) : Promise<CheckoutResponse> => {
    const response = await apiClient.post("/api/payment/stripe/session", {orderId});
    return response.data;
}