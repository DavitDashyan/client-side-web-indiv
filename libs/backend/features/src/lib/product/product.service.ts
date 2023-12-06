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
            productImageUrl: 'https://onlyhere.nl/wp-content/uploads/2022/12/iPhone-13-Mini-Green.jpg',
            favorite: true,
            condition: Conditie.Nieuw,
        },
        {
            id: '1',
            nameProduct: 'iphone 15',
            description: 'rood',
            price: 997,
            productImageUrl: 'https://bigsellers.nl/wp-content/uploads/sites/223/2021/10/BS_shutterstock_627961253.jpg',
            favorite: false,
            condition: Conditie.Nieuw,
        },
        {
            id: '2',
            nameProduct: 'iphone 14',
            description: 'wit',
            price: 857,
            productImageUrl: 'https://cdn.webshopapp.com/shops/268441/files/412332816/apple-iphone-14-128gb-nieuw.jpg',
            favorite: true,
            condition: Conditie.Zo_Goed_Als_Nieuw,
        },
        {
            id: '3',
            nameProduct: 'iphone 11',
            description: 'paars',
            price: 857,
            productImageUrl: 'https://hallomobile.nl/wp-content/uploads/2020/04/og__eecvr2clk3cm_specs.png',
            favorite: true,
            condition: Conditie.Zichtbaar_Gebruikt,
        },
        {
            id: '4',
            nameProduct: 'Ipad 6',
            description: 'Grijs',
            price: 399,
            productImageUrl: 'https://9to5toys.com/wp-content/uploads/sites/5/2022/07/iPad-mini-6-in-hand.jpg?w=1200&h=600&crop=1',
            favorite: false,
            condition: Conditie.Zichtbaar_Gebruikt,
        },
        {
            id: '5',
            nameProduct: 'Ipad 8',
            description: 'White',
            price: 591,
            productImageUrl: 'https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-8th-gen_w-keyboard_09152020.jpg.og.jpg?202310111003',
            favorite: false,
            condition: Conditie.Nieuw,
        },
        {
            id: '6',
            nameProduct: 'Ipad 7',
            description: 'Zwart, 2019, Apple',
            price: 539,
            productImageUrl: 'https://www.notebookcheck.nl/typo3temp/_processed_/e/2/csm_ipad7_2019_with_keyboard_cc2be46465.jpg',
            favorite: true,
            condition: Conditie.Nieuw,
        },
        {
            id: '7',
            nameProduct: 'Apple Tv',
            description: 'Grijs',
            price: 169,
            productImageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSTodz_7xwxv2pP2-lkn_Ho6bwNGy_EJg7g_1xx45tqhOngJUvKnxykhgFD5aPOPd4JDWeihJejeXs8sS1v9o0uIAmICR137MRoSGeIV6iinzAZEdzmLXdJ4w&usqp=CAE',
            favorite: true,
            condition: Conditie.Nieuw,
        },
        {
            id: '8',
            nameProduct: 'LG OLED tv',
            description: 'Heel Groot',
            price: 959,
            productImageUrl: 'data:image/jpeg;base64,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',
            favorite: false,
            condition: Conditie.Nieuw,
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


    //voor search
    // getAllProductsBySearchTerm(searchTerm:string){
    //     return this.getAll().filter(product=> product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()))
    // }
    getAllProductsBySearchTerm(searchTerm:string){
        return this.getAll().filter(product=> product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()))
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