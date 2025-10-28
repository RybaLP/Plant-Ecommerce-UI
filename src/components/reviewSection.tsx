import type { Review } from "../interfaces/review";

type Props = {
    reviews: Review[];
};

const ReviewSection = ({ reviews }: Props) => {

    if (reviews.length === 0) {
        return <p className="text-gray-500 mt-4">Brak recenzji dla tego produktu.</p>;
    }

    return (
        <section className="max-w-6xl mt-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Opinie klientów</h2>

            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">{review.username ?? "użytkownik"}</span>
                        <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                                review.rate === "NOT_RECOMMEND"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {review.rate === "RECOMMEND" ? "Polecam" : "Nie polecam"}
                        </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-2">{new Date(review.reviewDate).toLocaleDateString()}</p>
                </div>
            ))}
        </section>
    );
};

export default ReviewSection;
