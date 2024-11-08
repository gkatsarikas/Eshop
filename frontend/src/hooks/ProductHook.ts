import { useQuery } from "@tanstack/react-query"
import { Product } from "../types/Product"
import client from "../APIClient"

export const useGetProductsQuery = () =>
    useQuery({
      queryKey: ['products'],
      queryFn: async () => (await client.get<Product[]>(`/products`)).data,
})


export const useGetProductsByTitle = (title: string) => 
    useQuery({
        queryKey: ['products', title],
        queryFn: async () => (await client.get<Product>(`/products/title/${title}`)).data
    })