import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem } from "../types/Cart";
import { Order } from "../types/Order";
import orderClient from "../clients/OrderClient";


export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await orderClient.get<Order>(`/orders/${id}`)).data,
  });




export const useCreateOrderMutation = () =>
    useMutation({
      mutationFn: async (order: {
        orderItems: CartItem[]
        user: string 
        totalPrice: number
        date: Date
      }) =>
        (
          await orderClient.post<{ message: string; order: Order }>(
            `/orders`,
            order
          )
        ).data,
    })


