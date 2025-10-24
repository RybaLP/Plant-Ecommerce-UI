import { useQuery } from "@tanstack/react-query"
import type { Order } from "../interfaces/order/order"
import { getClientOrders } from "../api/getClientOrders"


export const useClientOrders = () => {
    const {data, isLoading, isError, error} = useQuery<Order[]>({
        queryKey : ["client-orders"],
        queryFn : getClientOrders,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime : 1000 * 60 * 6,
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}