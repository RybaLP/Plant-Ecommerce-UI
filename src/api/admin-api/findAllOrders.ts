import { apiAdmin } from "../apiclients/adminApiClient"
import type { Order } from "../../interfaces/order/order";

export const findAllOrders = async () : Promise <Order[]> => {
    const response = await apiAdmin.get("/api/orders/admin/find-all");
    return response.data;
}