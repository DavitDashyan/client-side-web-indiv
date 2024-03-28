import { ICartItem } from './cart-item.interface';
import { Id } from './id.type';
import { IProduct } from './product.interface';

export interface ICart {

  productList: IProduct[];
  productId?: string;

  // _id: IProduct;
  // items: ICartItem[];
  // userId: string;
}

// export type ICreateCart = any;

// export type IUpdateCart = Partial<Omit<ICart, 'id'>>;
// export type IUpsertCart = ICart;
