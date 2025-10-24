import { useQuery, useQueryClient , useMutation } from "@tanstack/react-query";
import { deleteReview } from "../api/deleteReview";

export const useDeleteReview = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (id : number) => deleteReview(id),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['client-reviews']});
        }
    });
};