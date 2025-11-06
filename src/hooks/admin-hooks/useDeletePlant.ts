import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePlantById } from "../../api/admin-api/deletePlant";
import toast from "react-hot-toast";

export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePlantById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-plants"] });
      toast.success("Pomyślnie usunięto roślinę z oferty");
    },
    onError: () => {
      toast.error("Nie udało się usunąć rośliny z oferty");
    },
  });
};
