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

// Fetch a product by ID
export const useGetProductByID = (id: string) =>
  useQuery<Product>({
    queryKey: ['products', id],
    queryFn: async () => (await productClient.get<Product>(`/products/${id}`)).data
  })

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

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async (product: { id: string; title?: string; img?: File; price?: number; quantity?: number }) => {
      const formData = new FormData();
      if (product.title) formData.append('title', product.title);
      if (product.price !== undefined) formData.append('price', product.price.toString());
      if (product.quantity !== undefined) formData.append('quantity', product.quantity.toString());
      if (product.img) formData.append('img', product.img);

      const response = await productClient.put<Product>(`/products/${product.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
  });

// Delete a product
export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await productClient.delete(`/products/${id}`);
      return response.data;
    },
  });