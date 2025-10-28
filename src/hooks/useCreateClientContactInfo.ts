import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientContaftInfo } from "../api/createClientContactInfo";
import type { ClientContactInfo } from "../interfaces/clientContactInfo";

export const useCreateClientContactInfo = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (reqBody : ClientContactInfo) => createClientContaftInfo(reqBody),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["client-contact-info"]});
        }
    })
}