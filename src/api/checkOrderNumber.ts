import { publicApiClient } from "./apiclients/publicApiClient";

export const checkOrderNumber =async (orderNumber : string) => {
    const response = await publicApiClient.post(`/api/orders/check?orderNumber=${orderNumber}`);
    return response.data;
}