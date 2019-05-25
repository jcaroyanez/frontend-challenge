import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/reducers/products.reducer';
import { Product } from 'src/app/models/products';
import { TrolleyState } from 'src/app/reducers/trolley.reducers';
import { AddProductToTrolley } from 'src/app/actions/trolley.action';
import { SendQuantityFilter } from 'src/app/actions/products.action';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  listProducts:Product[] = [];
  auxListProducs:Product[] = [];
  quantityFilter:number = 0;
  priceFilter:{min:number,max:number};

  constructor(
    private storeProducts:Store<ProductsState>,
    private storeTrolley:Store<TrolleyState>
    ) { 

    }

  ngOnInit() {
    this.storeProducts.select('products').subscribe((state:ProductsState) => {
      this.auxListProducs = state.listProducts;
      this.listProducts = this.auxListProducs;
      if(state.quantityFilter > 0){
        this.quantityFilter = state.quantityFilter;
        if(state.priceFilter.min > 0 && state.priceFilter.max > 0){
          this.priceFilter = state.priceFilter;
          this.listProducts = this.auxListProducs.filter((produc:Product) => produc.quantity >= this.quantityFilter)
                                                  .filter((produc:Product) =>{
                                                    let price = parseFloat(produc.price.split('$')[1]);
                                                    return (price >= this.priceFilter.min && price <= this.priceFilter.max)
                                                  });
        }else{
          this.listProducts = this.auxListProducs.filter((produc:Product) => produc.quantity >= this.quantityFilter);
        }
      }
      if(state.priceFilter.min > 0 && state.priceFilter.max > 0){
        this.priceFilter = state.priceFilter;
        if(!(state.quantityFilter > 0)){
          this.listProducts = this.auxListProducs.filter((produc:Product) =>{
            let price = parseFloat(produc.price.split('$')[1]);
            return (price >= this.priceFilter.min && price <= this.priceFilter.max)
          })
        }
      }
    })
  }

  addProductToTrolley(product:Product){
    product.total = 0;
    this.storeTrolley.dispatch(new AddProductToTrolley(Object.assign({},product)));
  }

  orderLessPriceList(){
     this.listProducts = this.listProducts.sort((aP:Product,bP:Product) => {
       const priceA =  parseFloat(aP.price.split('$')[1]);
       const priceB =  parseFloat(bP.price.split('$')[1]);
       return priceA - priceB;
     })
  }

  orderHigherPriceList(){
    this.listProducts = this.listProducts.sort((aP:Product,bP:Product) => {
      const priceA =  parseFloat(aP.price.split('$')[1]);
      const priceB =  parseFloat(bP.price.split('$')[1]);
      return priceB - priceA;
    })
  }

  orderLessQuantityList(){
    this.listProducts = this.listProducts.sort((aP:Product,bP:Product) => aP.quantity - bP.quantity);
  }

  orderHigherQuantityList(){
    this.listProducts = this.listProducts.sort((aP:Product,bP:Product) => bP.quantity - aP.quantity);
  }

  orderAvailabilityList(){
    this.listProducts = this.listProducts.sort((aP:Product,bP:Product) => Number(aP.available) - Number(bP.available))
  }
}
