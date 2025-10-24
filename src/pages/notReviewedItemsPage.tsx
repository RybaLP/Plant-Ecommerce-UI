import { useEffect, useState } from "react";
import { getNotReviewedItems } from "../api/getNotReviewedItems";
import type { Plant } from "../interfaces/plant";
import type { Rate } from "../types/rate";
import CreateReviewForm from "../components/createReviewForm";
import { createReview } from "../api/createReview";
import toast from "react-hot-toast";

const NotReviewedItemsPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Plant[]>([]);
  const [rate, setRate] = useState<Rate>("RECOMMEND");
  const [currentPlantId, setCurrentPlantId] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState("");

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const data = await getNotReviewedItems();
      setItems(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSendData = (plantId: number) => {
    setCurrentPlantId(plantId);
    setIsFormOpen(true);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await createReview({
        plantId: currentPlantId,
        comment,
        rate,
      });

      if (success) {
        toast.success("Pomyślnie utworzono recenzję ✨");

        await fetchItems();

        setIsFormOpen(false);
        setComment("");
        setRate("RECOMMEND");
      }
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się utworzyć recenzji 😞");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-lg font-medium text-gray-600 animate-pulse">
          Ładowanie danych...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500 font-medium">
        Wystąpił błąd podczas pobierania danych 😞
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Przedmioty do zrecenzowania
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Brak przedmiotów do zrecenzowania 🎉
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 backdrop-blur-sm shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-xl mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {item.name}
              </h2>
              <button
                className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => handleSendData(item.id)}
              >
                Zrecenzuj
              </button>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <CreateReviewForm
          setIsFormOpen={setIsFormOpen}
          comment={comment}
          setComment={setComment}
          rate={rate}
          setRate={setRate}
          handleCreateReview={handleCreateReview}
        />
      )}
    </div>
  );
};

export default NotReviewedItemsPage;