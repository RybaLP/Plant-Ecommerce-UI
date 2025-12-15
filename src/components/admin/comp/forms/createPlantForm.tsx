import type { SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import type { PlantType } from "../../../../types/plantType";
import type { PlantRequest } from "../../../../interfaces/requests/plantRequest";
import { useCreatePlant } from "../../../../hooks/admin-hooks/useCreatePlant";

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const CreatePlantForm = ({ setIsOpen }: Props) => {
  const { mutate, isPending } = useCreatePlant();

  const [formData, setFormData] = useState<PlantRequest>({
    name: "",
    category: "OTHER",
    price: 0,
    quantityInStock: 0,
    imageUrl: "",
    size: "",
    description: "",
  });

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
    ORNAMENTAL : "Ozdobne"
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
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
          Dodaj nową roślinę 🌱
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
              Rozmiar
            </label>
            <input
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="np. 30–40 cm"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Opis
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Krótki opis rośliny..."
              className="w-full border border-gray-300 p-2 rounded h-24 resize-none focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Link do zdjęcia
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/roslina.jpg"
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
              {isPending ? "Zapisywanie..." : "Dodaj roślinę"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlantForm;
