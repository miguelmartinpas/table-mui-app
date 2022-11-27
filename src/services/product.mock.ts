import { Product } from "./products.interface"

export const defaultProduct = (): Partial<Product> => {
    return {
        title: "Demo Product",
        description: "Demo product description",
        price: 5,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "Demo",
        category: "none",
        thumbnail: "https://2img.net/r/ihimizer/img519/4406/uirc4.png",
        images: []
    }
} 
