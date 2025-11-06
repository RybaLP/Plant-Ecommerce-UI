import type { SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import type { Plant } from "../../../../interfaces/plant";
import { useUpdatePlant } from "../../../../hooks/admin-hooks/useUpdatePlant";
import type { PlantType } from "../../../../types/plantType";
import type { UpdatePlant } from "../../../../interfaces/requests/updatePlant";

interface Props {
  plant: Plant;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}


const UpdatePlantForm = ({ plant, setIsOpen }: Props) => {
  const { mutate, isPending } = useUpdatePlant();

  const [formData, setFormData] = useState<UpdatePlant>({
    name: plant.name ?? "",
    category: plant.category ?? "",
    price: plant.price ?? 0,
    quantityInStock: plant.quantityInStock ?? 0,
    imageUrl: plant.imageUrl ?? "",
  });

  useEffect(() => {
    setFormData({
      name: plant.name ?? "",
      category: plant.category ?? "",
      price: plant.price ?? 0,
      quantityInStock: plant.quantityInStock ?? 0,
      imageUrl: plant.imageUrl ?? "",
    });
  }, [plant]);

  const PLANT_TYPES: PlantType[] = [
  "DECIDUOUS",
  "CONIFEROUS",
  "FLOWERING",
  "HERBAL",
  "FRUIT",
  "OTHER",
    ];

    const PLANT_TYPE_LABELS: Record<PlantType, string> = {
  DECIDUOUS: "Liściaste",
  CONIFEROUS: "Iglaste",
  FLOWERING: "Kwitnące",
  HERBAL: "Ziołowe",
  FRUIT: "Owocowe",
  OTHER: "Inne",
};

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: plant.id, reqBody: formData });
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <span
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edytuj roślinę 🌿
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nazwa rośliny
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

         

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Kategoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              <option value="">-- Wybierz kategorię --</option>
              {PLANT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {PLANT_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Cena (zł)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Ilość w magazynie
              </label>
              <input
                type="number"
                name="quantityInStock"
                value={formData.quantityInStock}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Link do zdjęcia
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 rounded-md border border-gray-400 hover:bg-gray-100 transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlantForm;
