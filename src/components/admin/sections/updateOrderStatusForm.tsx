import type { SetStateAction } from "react";
import type { OrderType } from "../../../types/orderType";
import { useState } from "react";
import { useUpdateOrderStatus } from "../../../hooks/admin-hooks/useUpdateOrderStatus";

interface Props {
    orderStatus: OrderType;
    id: number;    
    setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
    orderNumber : string;
}

const UpdateOrderStatusForm = ({ orderStatus, id, setIsFormOpen, orderNumber }: Props) => {
    const [order_status, setOrder_Status] = useState<OrderType>(orderStatus);
    const {mutate} = useUpdateOrderStatus();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(
            {id , orderStatus : order_status},
            {
                onSuccess : () => {
                    setIsFormOpen(false);
                }
            }
        )
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            <div className='bg-white p-8 rounded-xl shadow-2xl max-w-md w-full'>
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Zmiana statusu zamówienia
                    </h1>
                    <p className="text-gray-600">
                        Zamówienie: <span className="font-semibold">#{orderNumber}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wybierz nowy status
                        </label>
                        <select 
                            value={order_status}
                            onChange={(e) => setOrder_Status(e.target.value as OrderType)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                            <option value="PENDING">Oczekujące</option>
                            <option value="PROCESSING">W trakcie realizacji</option>
                            <option value="SHIPPED">Wysłane</option>
                            <option value="DELIVERED">Dostarczone</option>
                            <option value="CANCELLED">Anulowane</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                        >
                            Anuluj
                        </button>
                        <button 
                            type="submit"
                            className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-150 shadow-md"
                        >
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateOrderStatusForm;