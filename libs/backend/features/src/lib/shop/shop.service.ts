import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateShop, IShop } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ShopService {
    TAG = 'ShopService';

    private shop$ = new BehaviorSubject<IShop[]>([
        {
            id: '0',
            name: 'Bol.com',
            telNumber: 16896878,
            email: 'Bol@gmail.com',
        },
        {
            id: '1',
            name: 'Coolblue.com',
            telNumber: 198786235,
            email: 'Coolblue@gmail.com',
        },
        {
            id: '2',
            name: 'Amazon.com',
            telNumber: 87358345,
            email: 'Amazon@gmail.com',
        },
        {
            id: '3',
            name: 'Mediamarkt.nl',
            telNumber: 345390487,
            email: 'Mediamarkt@gmail.com',
        },
    ]);

    private shopSubject = new BehaviorSubject<IShop[]>(this.shop$.value);

    getUserObservable(): Observable<IShop[]> {
        return this.shopSubject.asObservable();
    }
    
    getAll(): IShop[] {
        Logger.log('getAll', this.TAG);
        return this.shop$.value;
    }

    getOne(id: string): IShop {
        Logger.log(`getOne(${id})`, this.TAG);
        const shop = this.shop$.value.find((shp) => shp.id === id);
        if (!shop) {
            throw new NotFoundException(`Shop could not be found!`);
        }
        return shop;
    }


create(shop: ICreateShop): IShop {
    Logger.log('create', this.TAG);
    const current = this.shop$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
    const newShop: IShop = {
        ...shop,
        id: `shop-${Math.floor(Math.random() * 10000)}`,
    };
    // Add it to our list of shops
    this.shop$.next([...current, newShop]);
    this.shopSubject.next([...current, newShop]); // Notify subscribers
    return newShop;
    }
}