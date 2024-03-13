// // import { IProduct } from '@avans-nx-workshop/shared/api';

// // export interface ICartItem {
// //   product: IProduct;
// //   quantity: number;
// // }

// // export interface ICart {
// //   items: ICartItem[];
// //   subtotal: number;
// //   taxes: number;
// //   shipping: number;
// //   total: number;
// // }


import { ICartItem, ICart } from '@avans-nx-workshop/shared/api';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class AddToCartDto implements ICartItem{
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsInt()
    @IsNotEmpty()
    quantity!: number;
}

export class UpdateQuantityDto {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsInt()
    @IsNotEmpty()
    quantity!: number;
}
