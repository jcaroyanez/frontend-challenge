import { Product } from '../models/products';
import { Actions, ActionTypesProducts } from '../actions/products.action';

export interface ProductsState{
    listProducts:Product[],
    quantityFilter:number,
    priceFilter:{min:number,max:number};
}

export const inititalProductsState:ProductsState = {listProducts:[],quantityFilter:0,priceFilter:{min:0,max:0}};

export function productsReducer( state = inititalProductsState, actions:Actions){
   switch (actions.type) {
       case ActionTypesProducts.setListProducts:
            return Object.assign({},{
                ...state,
                listProducts:actions.payload
            }) 
       case ActionTypesProducts.sendQuantityFilter:
            return Object.assign({},{
                ...state,
                quantityFilter:actions.payload
            })
       case ActionTypesProducts.sendPriceFilter:
            return Object.assign({},{
                ...state,
                priceFilter:actions.payload
            })
       default:
           return state;
   }
}