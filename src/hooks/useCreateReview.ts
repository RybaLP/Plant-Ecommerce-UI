import { useMutation , useQueryClient, useQuery} from "@tanstack/react-query";
import type { CreateReview } from "../interfaces/requests/createReview";
import { createReview } from "../api/createReview";

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (reqBody : CreateReview) => createReview(reqBody),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["client-reviews"]});
        }
    });
};