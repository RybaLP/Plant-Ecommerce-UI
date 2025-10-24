import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../api/updateAddress";
import type { Address } from "../interfaces/address";
import toast from "react-hot-toast";

export function useUpdateClientAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedAddress: Address) => updateAddress(updatedAddress),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["client-contact-info"] });

      const previousData = queryClient.getQueryData(["client-contact-info"]);

      queryClient.setQueryData(["client-contact-info"], (oldData: any) => {
        if (!oldData) return oldData;
        return { ...oldData, address: data };
      });

      return { previousData };
    },

    onError: (err, _data, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["client-contact-info"], context.previousData);
      }
      toast.error("Nie udało się zaktualizować adresu.");
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["client-contact-info"], (oldData: any) => {
        if (!oldData) return oldData;
        return { ...oldData, address: data };
      });
      toast.success("Adres został pomyślnie zaktualizowany!");
    },
  });
}
