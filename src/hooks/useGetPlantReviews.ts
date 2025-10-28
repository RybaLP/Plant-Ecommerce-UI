import { useQuery } from "@tanstack/react-query";
import { getPlantReviews } from "../api/getPlantReviews";
import type { Review } from "../interfaces/review";

export const useGetPlantReviews = (id : number) => {
    const {data , isLoading} = useQuery<Review[]>({
        queryKey : ["plant-reviews" , id ],
        queryFn : () => getPlantReviews(id),
        enabled: !!id 
    });

    return {isLoading, data};
}