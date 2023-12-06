import { Id } from './id.type';

type Product = string;

export enum Conditie{
    Nieuw = 'Nieuw',
    Zo_Goed_Als_Nieuw = 'Zo Goed Als Nieuw',
    Licht_Gebruikt = 'Licht Gebruikt',
    Zichtbaar_Gebruikt = 'Zichtbaar Gebruikt',
    }

export interface IProduct {

    id: Id,
    nameProduct: string,
    description: string,
    price: number,

    productImageUrl:string,
    favorite: boolean,
   // stars: number,
    
    condition: Conditie

    }

export type ICreateProduct = Pick<
    IProduct,
    'nameProduct' | 'description' | 'price' | 'condition' | 'productImageUrl' | 'favorite'
>;
export type IUpdateProduct = Partial<Omit<IProduct, 'id'>>;
export type IUpsertProduct = IProduct;
