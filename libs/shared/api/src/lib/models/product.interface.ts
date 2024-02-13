import { Id } from './id.type';
import { IShop } from './shop.interface';

type Product = string;

export enum Conditie{
    Nieuw = 'Nieuw',
    Zo_Goed_Als_Nieuw = 'Zo Goed Als Nieuw',
    Licht_Gebruikt = 'Licht Gebruikt',
    Zichtbaar_Gebruikt = 'Zichtbaar Gebruikt',
    }

export interface IProduct {

    id: Id,
    _id?: Id,

    nameProduct: string,
    description: string,
    price: number,

    productImageUrl:string,
    favorite: boolean,
   // stars: number,

   shopId: string,
    
    condition: Conditie,
    creatorID: string

    }

export type ICreateProduct = Pick<
    IProduct,
    'nameProduct' | 'description' | 'price' | 'condition' | 'productImageUrl' | 'favorite' | 'creatorID' | 'shopId'
>;
export type IUpdateProduct = Partial<Omit<IProduct, 'id'>>;
export type IUpsertProduct = IProduct;
