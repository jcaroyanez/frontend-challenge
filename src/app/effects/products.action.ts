import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PRODUCTS } from '../mokups/produts';
import { Product } from '../models/products';
import { ActionTypesProducts, ClickSetListProducts } from '../actions/products.action';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffect{
    listProdcts:Product[];

    @Effect()
        setListProduct$ = this.action.pipe(
            ofType(ActionTypesProducts.clickSetListProducts),
            map((action:ClickSetListProducts) => action.payload),
            mergeMap((toPayload:any) => of({type:ActionTypesProducts.setListProducts,payload:this.listProdcts.filter(product => product.sublevel_id == toPayload)}))
        )

    constructor(
        private action:Actions
    ){
        this.listProdcts = PRODUCTS;
    }
}