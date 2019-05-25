import { Action } from '@ngrx/store';
import { Product } from '../models/products';


export enum ActionTypesProducts{
    setListProducts = '[ Products ] setListProducts',
    clickSetListProducts = '[ Products] clickSetListProducts',
    sendQuantityFilter = '[ products ] sendQuantityFilter', 
    sendPriceFilter = '[ products ] sendPriceFilter'
}

export class SetListProducts implements Action{
    readonly type = ActionTypesProducts.setListProducts;

    constructor(public payload:Product[]){}
}

export class ClickSetListProducts implements Action{
    readonly type = ActionTypesProducts.clickSetListProducts;

    constructor(public payload:string){}
}

export class SendQuantityFilter implements Action{
    readonly type = ActionTypesProducts.sendQuantityFilter;

    constructor(public payload:number){}
}

export class SendPriceFilter implements Action{
    readonly type = ActionTypesProducts.sendPriceFilter;

    constructor(public payload:{min:number,max:number}){}
}

export type Actions = SetListProducts |
                      SendQuantityFilter|
                      SendPriceFilter;