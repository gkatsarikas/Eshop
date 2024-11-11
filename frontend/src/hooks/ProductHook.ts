import { useQuery } from "@tanstack/react-query"
import { Product } from "../types/Product"
import productClient from '../clients/ProductClient';

export const useGetProductsQuery = () =>
    useQuery<Product[]>({
      queryKey: ['products'],
      queryFn: async () => (await productClient.get<Product[]>(`/products`)).data,
})


export const useGetProductsByTitle = (title: string) => 
    useQuery<Product>({
        queryKey: ['products', title],
        queryFn: async () => (await productClient.get<Product>(`/products/title/${title}`)).data
    })