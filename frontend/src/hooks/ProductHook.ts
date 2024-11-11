import { useMutation, useQuery, } from "@tanstack/react-query";
import { Product } from "../types/Product";
import productClient from '../clients/ProductClient';

// Fetch all products
export const useGetProductsQuery = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await productClient.get<Product[]>('/products')).data,
  });

// Fetch a product by title
export const useGetProductsByTitle = (title: string) => 
  useQuery<Product>({
    queryKey: ['products', title],
    queryFn: async () => (await productClient.get<Product>(`/products/title/${title}`)).data,
  });

export const useCreateProductMutation = () =>
useMutation({
    mutationFn: async (product: { title: string; img: File; price: number; quantity: number }) => {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('img', product.img);

    const response = await productClient.post<Product>('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
    },
});