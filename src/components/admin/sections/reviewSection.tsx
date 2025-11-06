import { useFindAllReviews } from "../../../hooks/admin-hooks/useFindAllReviews"
import ReviewCard from "../comp/reviewCard";

const ReviewsSection = () => {
  const { data: reviews, isLoading, isError } = useFindAllReviews();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Moderacja recenzji</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Łącznie recenzji: <span className="font-semibold">{reviews?.length || 0}</span>
        </p>
        <div className="flex space-x-2">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Wszystkie
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {reviews?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Brak recenzji do moderacji</p>
        </div>
      )}
    </div>
  )
}

export default ReviewsSection