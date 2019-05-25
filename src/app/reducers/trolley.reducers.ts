import { Product } from '../models/products';
import { Actions, ActionTypeTrolley } from '../actions/trolley.action';

export interface TrolleyState{
    trolleyListProduct:Product[]
}

export const initialStateTrolley:TrolleyState = { trolleyListProduct:[] };

export function trolleyReducer( state = initialStateTrolley, actions:Actions){
    switch (actions.type) {
        case ActionTypeTrolley.addProductToTrolley:
        if((state.trolleyListProduct.filter((product:Product) => product.id == actions.payload.id)).length > 0){
            return Object.assign({},{
                ...state
            })
        }else{
            return Object.assign({},{
                ...state,
                trolleyListProduct:[...state.trolleyListProduct,actions.payload] 
             })
        }
        case ActionTypeTrolley.deleteProductToList:
            return Object.assign({},{
                ...state,
                trolleyListProduct:[
                    ...state.trolleyListProduct.slice(0,actions.payload),
                    ...state.trolleyListProduct.slice(actions.payload + 1)
                ]
            })
        case ActionTypeTrolley.updateTotalProductTrolley:
            return Object.assign({},{
                ...state,
                trolleyListProduct:state.trolleyListProduct.map((product:any) => product.id === actions.id ? {...product,...actions.payload} : product)
            })
        case ActionTypeTrolley.setTrolleyList:
            return Object.assign({},{
                ...state,
                trolleyListProduct:actions.payload
            })              
        default:
            return state;
    }
}