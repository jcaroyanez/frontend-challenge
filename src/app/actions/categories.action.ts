import { Action } from '@ngrx/store';

export enum ActionTypes{
    getAllCategories = '[ Categoires ] getAllCategories',
    setListCategories = '[ Categories ] setListCategories',
    getRamdonCategory = '[ Categories ] getRamdonCategory',
    setCategorySelected ='[ Categories ] setCategorySelected',
}

export class GetAllCategories implements Action{
    readonly type = ActionTypes.getAllCategories;
}

export class SetListCategories implements Action{
    readonly type = ActionTypes.setListCategories;

    constructor(public payload:any[]){}
}

export class GetRandomCategory implements Action{
    readonly type = ActionTypes.getRamdonCategory;
}

export class SetCategorySelected implements Action{
    readonly type = ActionTypes.setCategorySelected;

    constructor(public payload:{}){}
}



export type Actions = GetAllCategories |
                      SetListCategories |
                      GetRandomCategory |
                      SetCategorySelected;