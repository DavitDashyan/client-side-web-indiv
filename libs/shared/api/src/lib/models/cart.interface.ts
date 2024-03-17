// // // import { Id } from './id.type';

// // // type Cart = string;

// // // export interface ICart {

// // //  product: Product;
// // //  quantity: number = 1;
// // //  price: number = this.product.price;

// // //     }

// // // export type ICreateCart = Pick<
// // //     ICart,
// // //     'nameProduct' | 'description' | 'price' | 'condition' | 'productImageUrl' | 'favorite'
// // // >;
// // // export type IUpdateProduct = Partial<Omit<IProduct, 'id'>>;
// // // export type IUpsertProduct = IProduct;

// // export interface ICartItem {
// //   productId: string;
// //   quantity: number;
// //   product?: IProduct; // Optional product reference
// // }

// //-----------------------------------------------------
import { ICartItem } from './cart-item.interface';
import { Id } from './id.type';

export interface ICart {
  _id: Id;
  items: ICartItem[];
  // totalQuantity: number;
  // totalPrice: number;
  userId: string;
}

export type ICreateCart = any;

export type IUpdateCart = Partial<Omit<ICart, 'id'>>;
export type IUpsertCart = ICart;
