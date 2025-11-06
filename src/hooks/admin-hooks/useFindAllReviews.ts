import { useQuery } from "@tanstack/react-query";
import { findAllReviews } from "../../api/admin-api/findAllReviews";
import type { ReviewResponse } from "../../interfaces/responses/reviewResponse";

export const useFindAllReviews = () => {
    const {data, isLoading, isError} = useQuery<ReviewResponse[]>({
        queryKey : ["all-reviews"],
        queryFn : findAllReviews,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    return {data, isLoading, isError};
}