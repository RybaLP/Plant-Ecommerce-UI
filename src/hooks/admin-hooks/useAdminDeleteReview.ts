import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminDeleteReview } from "../../api/admin-api/deleteReview";

export const useAdminDeleteReview = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => adminDeleteReview(id),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: ["all-reviews"] });
        },
        onError: () => {
            toast.error("Nie udalo się usunąc recenzji")
        },
    })
}