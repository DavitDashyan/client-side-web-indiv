import { Id } from './id.type';

type Shop = string;

export interface IShop {
  id: Id;
  name: string;
  telNumber: number;
  email: string;
  shopImageUrl: string;
  creatorID: string;
}

export type ICreateShop = Pick<
  IShop,
  'name' | 'telNumber' | 'email' | 'shopImageUrl' | 'creatorID'
>;
export type IUpdateShop = Partial<Omit<IShop, 'id'>>;
export type IUpsertShop = IShop;
