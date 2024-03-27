import { Id } from './id.type';
import { ICartItem } from './cart-item.interface';

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
}

export type ICreateUser = Pick<
  IUser,
  'name' | 'email' | 'password' | 'bday'
>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>>; // & { cartList?: ICart[] };
export type IUpsertUser = IUser;
