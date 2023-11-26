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
    }

export type ICreateUser = Pick<
    IUser,
    'name' | 'address' | 'number' | 'email' | 'password' | 'bday'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;