import { Id } from './id.type';

export interface ICartItem {
  _id: Id;
  productId: Id;
  quantity: number;
  nameProduct: string;
  price: number;
  productImageUrl: string;
}

export type ICreateCartItem = Pick<
  ICartItem,
   'productId' | 'quantity' | 'nameProduct' | 'price' // | 'isAdmin'
>;
export type IUpdateCartItem = Partial<Omit<ICartItem, 'id'>>;
export type IUpsertCartItem = ICartItem;
