import type { ReviewResponse } from "../../../interfaces/responses/reviewResponse";
import { useAdminDeleteReview } from "../../../hooks/admin-hooks/useAdminDeleteReview";

interface Props {
    review: ReviewResponse
}

const ReviewCard = ({ review }: Props) => {

  const {mutate , isPending} = useAdminDeleteReview();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{review.username}</h3>
          <p className="text-sm text-gray-500">
            {new Date(review.reviewDate).toLocaleDateString('pl-PL')}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <span className="ml-2 text-sm text-gray-600">({review.rate})</span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-sm font-medium text-gray-700">Roślina: </span>
        <span className="text-sm text-green-600 font-medium">{review.plant.name}</span>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium hover:cursor-pointer"
        onClick={() => mutate(review.id)} disabled={isPending}>
          {isPending ? "Usuwanie..." : "Usuń"}
        </button>
      </div>
    </div>
  )
}

export default ReviewCard