import { Id } from './id.type';

type Product = string;

export enum Conditie{
    Nieuw = 'Nieuw',
    Zo_Goed_Als_Nieuw = 'Zo Goed Als Nieuwe',
    Licht_Gebruikt = 'Licht Gebruikt',
    Zichtbaar_Gebruikt = 'Lichtbaar Gebruikt',
    }

export interface IProduct {

    id: Id,
    nameProduct: string,
    description: string,
    price: number,
    condition: Conditie
    }

export type ICreateProduct = Pick<
    IProduct,
    'nameProduct' | 'description' | 'price' | 'condition'
>;
export type IUpdateProduct = Partial<Omit<IProduct, 'id'>>;
export type IUpsertProduct = IProduct;
