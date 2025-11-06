import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { OrderType } from "../../types/orderType";
import { updateOrderStatus } from "../../api/admin-api/updateOrderStatus";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, orderStatus }: { id: number; orderStatus: OrderType }) =>
      updateOrderStatus(id, orderStatus),

    onSuccess: (_, { id }) => {
      toast.success("Order status updated successfully ✅");

      queryClient.invalidateQueries({ queryKey: ["all-orders"] });

      queryClient.invalidateQueries({ queryKey: ["all-orders", id] });
    },

    onError: (error: any) => {
      console.error(error);
      toast.error("Failed to update order status ❌");
    },
  });
};
