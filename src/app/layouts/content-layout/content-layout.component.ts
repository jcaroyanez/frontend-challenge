import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesState } from 'src/app/reducers/categories.reducer';
import { PRODUCTS } from '../../mokups/produts';
import { Product } from 'src/app/models/products';
import { SetListProducts, ClickSetListProducts } from 'src/app/actions/products.action';
import { ProductsState } from 'src/app/reducers/products.reducer';
import { TrolleyState } from 'src/app/reducers/trolley.reducers';
import { SetTrolleyList } from 'src/app/actions/trolley.action';
import { ListProductsComponent } from 'src/app/components/list-products/list-products.component';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  @ViewChild(ListProductsComponent) filtersLayoutComponent:ListProductsComponent;

  categorySelected: any = null;
  listProducts: Product[] = PRODUCTS;
  listMenu:any[] = [];

  constructor(
    private storeCategories: Store<CategoriesState>,
    private storeProducts: Store<ProductsState>,
    private storeTrolley:Store<TrolleyState>
  ) {
  }

  ngOnInit() {
    this.storeCategories.select('categories').subscribe((state: CategoriesState) => {
      this.listMenu = [];

      this.categorySelected = state.categorySelected;
      
      if(this.categorySelected){
        this.searchProductOfCategory();
      }

    });
  }

  searchProductOfCategory() {
    let auxProducts: any[] = [];

    this.listProducts.forEach((product: Product) => {
      if (this.categorySelected.id == product.sublevel_id) {
        auxProducts.push(product);
      }
    })

    this.categorySelected.products = auxProducts;

    this.recursiveSearchProductOfCategory(this.categorySelected.sublevels, false);

    this.storeProducts.dispatch(new SetListProducts(this.categorySelected.products));

    if(localStorage.getItem('trolleyListProduct')){
      this.storeTrolley.dispatch(new SetTrolleyList(JSON.parse(localStorage.getItem('trolleyListProduct'))));
    }
  }

  recursiveSearchProductOfCategory(item: any, sub: boolean) {
    item.forEach((sublevels: any) => {
      if (sub) {
        if (sublevels.sublevels) {
          this.listMenu.push({name:sublevels.name,styleClass:"text-category-menu",id:sublevels.id})
        } else {
          this.listMenu.push({name:sublevels.name,styleClass:"text-subcategory",id:sublevels.id})
        }
      } else {
        this.listMenu.push({name:sublevels.name,styleClass:"text-category-menu",id:sublevels.id})
      }

  
      this.listProducts.forEach((produtc: Product) => {
        if (sublevels.id == produtc.sublevel_id) {
          this.categorySelected.products.push(produtc);
        }
      });

      if (sublevels.sublevels) {
        this.recursiveSearchProductOfCategory(sublevels.sublevels, true);
      }
    });
  }

  openProductsCategories(idCategory:string){
    this.storeProducts.dispatch(new ClickSetListProducts(idCategory));
  }

  orderLessPrice(){
    this.filtersLayoutComponent.orderLessPriceList();
  }

  orderHigherPrice(){
    this.filtersLayoutComponent.orderHigherPriceList();
  }

  orderLessQuantity(){
    this.filtersLayoutComponent.orderLessQuantityList();
  }

  orderHigHerQuantity(){
    this.filtersLayoutComponent.orderHigherQuantityList();
  }

  orderAvailability(){
    this.filtersLayoutComponent.orderAvailabilityList();
  }

}
