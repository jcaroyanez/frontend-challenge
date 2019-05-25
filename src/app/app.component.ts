import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesState } from './reducers/categories.reducer';
import { GetAllCategories, GetRandomCategory, SetCategorySelected } from './actions/categories.action';
import { TrolleyState } from './reducers/trolley.reducers';
import { SetTrolleyList } from './actions/trolley.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  listCategories:any[] = [];

  constructor(
    private storeCategories:Store<CategoriesState>,
    private storeTrolley:Store<TrolleyState>
  ){
    this.storeCategories.dispatch(new GetAllCategories());
    this.storeCategories.dispatch(new GetRandomCategory());
  }

  ngOnInit(){
    this.storeCategories.select('categories').subscribe((state:CategoriesState) => {
      this.listCategories = state.listCategories;
    });
    this.storeTrolley.select('trolley').subscribe((state:TrolleyState) => {
      if(state != undefined && state.trolleyListProduct.length > 0){
         localStorage.setItem('trolleyListProduct',JSON.stringify(state.trolleyListProduct));
      }
    })
  }

  categorySelected(category:any){
     this.storeCategories.dispatch(new SetCategorySelected(category));
  }

}
