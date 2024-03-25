import { ObjectId } from "mongoose"

export type ProductFilter = {
    name?: string
    categoryName?: string
    price?: {
        max?: number,
        min?: number
    }
}

export type GetProductsRequest = {
    filter?: ProductFilter
}

export type AddProductRequest = {
    name: string
    categoryId: ObjectId,
    price: number
}

export type UpdateProductRequest = {
    name: string
    categoryId: ObjectId,
    price: number
    available: boolean
}