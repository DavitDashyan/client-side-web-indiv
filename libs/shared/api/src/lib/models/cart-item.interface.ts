import { IProduct } from './product.interface';

export interface ICartItem {
  productId: string;
  quantity: number;
  nameProduct: string;
  price: number;
  productImageUrl: string;
}
