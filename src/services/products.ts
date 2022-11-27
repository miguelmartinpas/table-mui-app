import { Product } from "./products.interface";

const BASE_URL = 'http://127.0.0.1:5001'

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?_sort=id&_order=desc`, { method: 'GET' });
    const products = await response.json();

    return products;
} 

export const getProduct = async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'GET' });
    const product = await response.json();

    return product;
} 

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products`, { method: 'POST', body: JSON.stringify(product), headers: { 'Content-Type': 'application/json' } });
    const { status, ok, statusText } = response;
    if (status !== 201) {
        throw new Error('Error on create', { cause: {status, ok, statusText} });
    }
    const products = await response.json();

    return products;
} 

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'PUT', body: JSON.stringify(product), headers: { 'Content-Type': 'application/json' } });
    const { status, ok, statusText } = response;
    if (status !== 200) {
        throw new Error('Error on update', { cause: {status, ok, statusText} });
    }
    const products = await response.json();

    return products;
} 

export const deleteProduct = async (id: string): Promise<void> => {
    const { status, ok, statusText } = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (status !== 200) {
        throw new Error('Error on delete', { cause: {status, ok, statusText} });
    }
} 