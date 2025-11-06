import { useQuery } from "@tanstack/react-query";
import type { Order } from "../../interfaces/order/order";
import { findAllOrders } from "../../api/admin-api/findAllOrders";

export const useFindAllOrders = () => {
    const {data, isLoading, isError} = useQuery<Order[]>({
        queryKey : ["all-orders"],
        queryFn : findAllOrders,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })


    return {
        data,
        isLoading,
        isError
    }
}