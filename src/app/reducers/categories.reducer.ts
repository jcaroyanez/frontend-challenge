import { ActionTypes, Actions } from '../actions/categories.action';

export interface CategoriesState{
    listCategories:any[],
    categorySelected:null
}

export const initialStateCategories:CategoriesState = { listCategories:[],categorySelected:null };

export function categoriesReducer( state = initialStateCategories, actions:Actions){
   switch (actions.type) {
       case ActionTypes.setListCategories:
          return Object.assign({},{
            ...state,
            listCategories:[...state.listCategories, ...actions.payload]
        })
       case ActionTypes.setCategorySelected:
            return Object.assign({},{
                ...state,
                categorySelected:actions.payload
            })   
       default:
           return state;
   }
}