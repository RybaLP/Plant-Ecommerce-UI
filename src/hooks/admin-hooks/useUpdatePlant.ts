import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePlant } from "../../api/admin-api/updatePlant";
import toast from "react-hot-toast";
import type { UpdatePlant } from "../../interfaces/requests/updatePlant";

export const useUpdatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reqBody }: { id: number; reqBody: UpdatePlant }) =>
      updatePlant(id, reqBody),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-plants"] });
      toast.success("Roślina została zaktualizowana pomyślnie 🌿");
    },

    onError: () => {
      toast.error("Nie udało się zaktualizować rośliny");
    },
  });
};
