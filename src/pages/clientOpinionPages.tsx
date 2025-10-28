import { useAuthenticationStore } from "../store/authenticationStore";
import { useClientReviews } from "../hooks/useClientReviews";
import NotFoundPage from "./notFoundPage";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteReview } from "../hooks/useDeleteReview";
import toast from "react-hot-toast";
import DeleteReview from "../components/notifications/deleteReview";

const ClientOpinionsPage = () => {
  const { isAuthenticated } = useAuthenticationStore();
  const { data, isLoading, isError } = useClientReviews();
  const { mutateAsync } = useDeleteReview();
  const navigate = useNavigate();

  // notification
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) return <NotFoundPage />;

  const handlePassReviewId = (id: number) => {
    setId(id);
    setIsOpen(true);
  };

  const handleDeleteReview = async () => {
    try {
      await mutateAsync(id);
      toast.success("Pomyślnie usunięto recenzję.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Wystąpił błąd przy usuwaniu recenzji.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Przycisk zawsze widoczny */}
      <div className="w-fit mx-auto mb-8">
        <button
          className="px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white transition-all duration-300"
          onClick={() => navigate("/uzytkownik/opinie/nie-zrecenzowane")}
        >
          Przedmioty do zrecenzowania
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Twoje recenzje</h1>

      {/* Warunkowe informacje o stanie */}
      {isLoading && <p>Ładowanie recenzji...</p>}
      {!isLoading && (isError || !data || data.length === 0) && (
        <p>Nie masz jeszcze żadnych recenzji.</p>
      )}

      {/* Lista recenzji */}
      <div className="flex flex-col gap-4">
        {data?.map((review) => (
          <div key={review.id} className="border p-4 rounded flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src={review.plant.imageUrl}
                alt={review.plant.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{review.plant.name}</p>
                <p>Ocena: {review.rate}</p>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-600">
                  {new Date(review.reviewDate).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:cursor-pointer"
              title="Usuń recenzję"
              onClick={() => handlePassReviewId(review.id)}
            >
              <FaTrash />
              Usuń
            </button>

            {isOpen && (
              <DeleteReview setIsOpen={setIsOpen} handleDeleteReview={handleDeleteReview} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientOpinionsPage;
