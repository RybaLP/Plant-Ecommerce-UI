import type { SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDeletePlant } from "../../hooks/admin-hooks/useDeletePlant";
import type { Plant } from "../../interfaces/plant";

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  plant: Plant;
}

const DeletePlantNotification = ({ setIsOpen, plant }: Props) => {
  const { mutate } = useDeletePlant();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center transition-all">
        <span
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <IoMdCloseCircle size={32} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Potwierdź usunięcie
        </h1>

        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-14 h-14 object-cover rounded-full border border-gray-300 shadow-sm"
          />
          <p className="text-gray-700 font-medium text-lg">{plant.name}</p>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Czy na pewno chcesz usunąć tę roślinę z oferty? Tej operacji nie da się cofnąć.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => mutate(plant.id)}
            className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-colors"
          >
            Tak, usuń
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 rounded-xl border-2 border-gray-400 font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlantNotification;
