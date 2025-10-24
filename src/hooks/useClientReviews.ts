import { useQuery } from "@tanstack/react-query";
import { getClientReviews } from "../api/getClientReviews";
import type { FindClientReviewsResponse } from "../interfaces/responses/findClientReviewsResponse";

export const useClientReviews = () => {
    const {data, isLoading, isError, error} = useQuery<FindClientReviewsResponse[]>({
        queryKey: ["client-reviews"],
        queryFn : getClientReviews,
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