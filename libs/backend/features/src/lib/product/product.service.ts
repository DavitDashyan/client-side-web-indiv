import { Injectable, NotFoundException } from '@nestjs/common';
import { Conditie, ICreateProduct, IProduct } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductService {
    TAG = 'ProductService';

    private product$ = new BehaviorSubject<IProduct[]>([
        {
            id: '0',
            nameProduct: 'iphone 13',
            description: 'groen',
            price: 567,
            condition: Conditie.Nieuw,
        },
        {
            id: '1',
            nameProduct: 'iphone 15',
            description: 'rood',
            price: 997,
            condition: Conditie.Nieuw,
        },
        {
            id: '2',
            nameProduct: 'iphone 14',
            description: 'wit',
            price: 857,
            condition: Conditie.Zo_Goed_Als_Nieuw,
        },
        {
            id: '3',
            nameProduct: 'iphone 11',
            description: 'paars',
            price: 857,
            condition: Conditie.Zichtbaar_Gebruikt,
        },

    ]);

    private productSubject = new BehaviorSubject<IProduct[]>(this.product$.value);

    getProductObservable(): Observable<IProduct[]> {
        return this.productSubject.asObservable();
    }
    
    getAll(): IProduct[] {
        Logger.log('getAll', this.TAG);
        return this.product$.value;
    }

    getOne(id: string): IProduct {
        Logger.log(`getOne(${id})`, this.TAG);
        const product = this.product$.value.find((usr) => usr.id === id);
        if (!product) {
            throw new NotFoundException(`Product could not be found!`);
        }
        return product;
    }


create(product: ICreateProduct): IProduct {
    Logger.log('create', this.TAG);
    const current = this.product$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
    const newProduct: IProduct = {
        ...product,
        id: `product-${Math.floor(Math.random() * 10000)}`,
    };
    // Add it to our list of users
    this.product$.next([...current, newProduct]);
    this.productSubject.next([...current, newProduct]); // Notify subscribers
    return newProduct;
    }      
}