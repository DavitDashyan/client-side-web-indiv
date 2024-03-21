import { Id } from './id.type';
import { ICart } from './cart.interface';
import { ICartItem } from './cart-item.interface';

type User = string;

export interface IUser {
  _id: Id;
  name: string;
  address: string;
  number: number;
  email: string;
  password: string;
  bday: Date;
  token?: string | null;
 // cart: ICart[];
  cart: ICartItem[];
  // isAdmin: boolean;
}

export type ICreateUser = Pick<
  IUser,
  'name' | 'email' | 'password' | 'bday' // | 'isAdmin'
>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>> // & { cartList?: ICart[] };
export type IUpsertUser = IUser;
