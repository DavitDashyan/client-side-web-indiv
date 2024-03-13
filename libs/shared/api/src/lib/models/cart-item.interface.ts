import { IProduct } from "./product.interface";

export interface ICartItem {
  productId: string;
  quantity: number;
  product?: IProduct; // Optional product reference
}