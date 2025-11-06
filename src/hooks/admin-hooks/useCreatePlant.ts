import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { PlantRequest } from "../../interfaces/requests/plantRequest";
import { createPlant } from "../../api/admin-api/createPlant";
import toast from "react-hot-toast";

export const useCreatePlant = () => {
    
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (reqBody : PlantRequest) => createPlant(reqBody),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["all-plants"]});
            toast.success("Udało się utworzyć roślinę");
        },
        onError : () => {
            toast.error("Nie udałlo sie utworzyć rośliny");
        }
    })
}