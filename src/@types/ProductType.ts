import type { CategoryType } from "./CategoryType"

export interface ProductType {
    id:number
    title:string
    price:number,
    description:string
    categoryId:number
    category:CategoryType
    images:string[]
    slug:string
    createdAt:string
    updatedAt:string
}