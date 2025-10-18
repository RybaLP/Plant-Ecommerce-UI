import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClientCart } from "../api/getClientCart";
import { deleteCartItem } from "../api/deleteCartItem";
import type { Cart } from "../interfaces/cart/cart";
import { addToCart } from "../api/addToCart";
import type { CartItem } from "../interfaces/cart/cartItem";
import { useAuthenticationStore } from "../store/authenticationStore";
import { updateItemQuantity } from "../api/updateItemQuantity";

export function useCart () {
    const queryClient = useQueryClient();

    const {isAuthenticated} = useAuthenticationStore();

    const cartQuery = useQuery({
        queryKey : ["cart"],
        queryFn : getClientCart,
        enabled : isAuthenticated,
    })

    const addMutate = useMutation({
        mutationFn : (item : CartItem) => addToCart(item),
        onMutate : async (newItem) => {
            await queryClient.cancelQueries({queryKey : ["cart"]});
            const prevCart = queryClient.getQueryData<Cart>(["cart"]);
            if (prevCart) {
                queryClient.setQueryData<Cart>(["cart"], {...prevCart, cartItems : [...prevCart.cartItems, newItem]})
            }
            return {prevCart};
        },

        onError : (_err , _newItem , ctx) => {
            if(ctx?.prevCart) queryClient.setQueryData(["cart"], ctx.prevCart);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    })

    const deleteMutation = useMutation({
        mutationFn : (plantId : number) => deleteCartItem(plantId),
        onMutate : async (plantId) => {
            await queryClient.cancelQueries({queryKey : ["cart"]});
            const prevCart = queryClient.getQueryData<Cart>(["cart"]);

            if (prevCart) {
                queryClient.setQueryData<Cart>(["cart"], {
                    ...prevCart, cartItems : prevCart.cartItems.filter (i => i.plantId !== plantId)
                })
            } 
            return {prevCart};
        }, 

        onError : (_err , _id , ctx) => {
            if (ctx?.prevCart) queryClient.setQueryData(["cart"], ctx.prevCart);
        },

        onSettled : () => {
            queryClient.invalidateQueries({queryKey : ["cart"]});
        }
    });

    const updateQuantityMutation = useMutation({
        mutationFn : ({plantId , quantity} : {plantId : number ,quantity : number }) => updateItemQuantity({plantId, quantity}),
        onMutate : async ({plantId , quantity}) => {
            await queryClient.cancelQueries({queryKey : ["cart"]});
            const prevCart = queryClient.getQueryData<Cart>(["cart"]);

            if (prevCart) {
                const updatedItems = prevCart.cartItems.map((item) => 
                    item.plantId == plantId ? {...item, quantity } : item 
                );


                queryClient.setQueryData<Cart>(["cart"], {
                    ...prevCart,
                    cartItems : updatedItems,
                });
            }

            return {prevCart} ;
        },
        
        onError: (_err, _vars, ctx) => {
        if (ctx?.prevCart) queryClient.setQueryData(["cart"], ctx.prevCart);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    })

    return {
        cartQuery,
        addMutate,
        deleteMutation,
        updateQuantityMutation
    }
}