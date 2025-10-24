import { createUserOrder } from "../api/createUserOrder";
import type { CreateUserOrder } from "../interfaces/requests/createUserOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteUserOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (reqBody : CreateUserOrder) => createUserOrder(reqBody),
        onSuccess : (data) => {
            queryClient.invalidateQueries({queryKey : ["client-orders"]});
        }
    })
}