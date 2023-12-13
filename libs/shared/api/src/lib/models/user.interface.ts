import { Id } from './id.type';

type User = string;

export interface IUser {
  id: Id;
  name: string;
  address: string;
  number: number;
  email: string;
  password: string;
  bday: Date;
  token?: string | null;
  // isAdmin: boolean;
}

export type ICreateUser = Pick<
  IUser,
  'name' | 'email' | 'password' | 'bday' // | 'isAdmin'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
