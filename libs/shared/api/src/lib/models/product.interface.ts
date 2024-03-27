import { Id } from './id.type';

export enum Conditie {
  Nieuw = 'Nieuw',
  Zo_Goed_Als_Nieuw = 'Zo Goed Als Nieuw',
  Licht_Gebruikt = 'Licht Gebruikt',
  Zichtbaar_Gebruikt = 'Zichtbaar Gebruikt',
}

export interface IProduct {
  _id: Id;
  nameProduct: string;
  description: string;
  price: number;
  productImageUrl: string;
  favorite?: boolean;
  shopId?: string;
  condition: Conditie;
  creatorID: string;
}

export type ICreateProduct = Pick<
  IProduct,
  | 'nameProduct'
  | 'description'
  | 'price'
  | 'condition'
  | 'productImageUrl'
  | 'creatorID' //| 'shopId'
>;
export type IUpdateProduct = Partial<Omit<IProduct, 'id'>>;
export type IUpsertProduct = IProduct;
