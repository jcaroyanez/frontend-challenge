import { Action } from '@ngrx/store';
import { Product } from '../models/products';

export enum ActionTypeTrolley{
    addProductToTrolley = ' [ Trolley] addProductToTrolley',
    deleteProductToList = '[ Trolley] deleteProductToList',
    updateTotalProductTrolley = '[ Trolley] updateTotalProduct',
    setTrolleyList = '[ Trolley ] setTrolleyList'
}

export class AddProductToTrolley implements Action{
    readonly type = ActionTypeTrolley.addProductToTrolley;

    constructor(public payload:Product){}
}

export class DeleteProductToList implements Action{
    readonly type = ActionTypeTrolley.deleteProductToList;

    constructor(public payload:number){}
}

export class UpdateTotalProductTrolley implements Action{
    readonly type = ActionTypeTrolley.updateTotalProductTrolley;

    constructor(public id:string,public payload:{total:number}){}
}

export class SetTrolleyList implements Action {
    readonly type = ActionTypeTrolley.setTrolleyList;

    constructor(public payload:any){}
}

export type Actions = AddProductToTrolley |
                      DeleteProductToList |
                      UpdateTotalProductTrolley |
                      SetTrolleyList;
