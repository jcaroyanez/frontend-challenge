import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes } from '../actions/categories.action';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CATEGORIES } from '../mokups/categories';
import { Store } from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducer';

@Injectable()
export class CategoriesEffect{
    listCategories:any[] = [];

    @Effect()
        getAllCategories$ = this.action.pipe(
            ofType(ActionTypes.getAllCategories),
            mergeMap(() => of({type:ActionTypes.setListCategories,payload:CATEGORIES}))
        )

    @Effect()
    setCategorieSelected$ = this.action.pipe(
        ofType(ActionTypes.getRamdonCategory),
        mergeMap(() => of({type:ActionTypes.setCategorySelected,payload:this.listCategories[Math.floor(Math.random()*this.listCategories.length)]}))
    )    
        
    constructor(
        private action:Actions,
        private store:Store<CategoriesState>
    ){
        this.store.select('categories').subscribe((state:CategoriesState) => {
            this.listCategories = state.listCategories;
        })
    }
}