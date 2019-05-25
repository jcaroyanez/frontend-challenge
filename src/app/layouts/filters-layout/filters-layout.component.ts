import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsState } from 'src/app/reducers/products.reducer';
import { SendQuantityFilter, SendPriceFilter } from 'src/app/actions/products.action';

@Component({
  selector: 'app-filters-layout',
  templateUrl: './filters-layout.component.html',
  styleUrls: ['./filters-layout.component.scss']
})
export class FiltersLayoutComponent implements OnInit {
  filterQuantity:number;
  minPrice:number;
  maxPrice:number;
  @Output() warnOrderLessPrice$ = new EventEmitter();
  @Output() warOrderHigherPrice$ = new EventEmitter();
  @Output() warOrderLessQuantity$ = new EventEmitter();
  @Output() warOrderHegherQuantity$ = new EventEmitter();
  @Output() warOrderAvailability$ = new EventEmitter();

  constructor(
    private storeProducts: Store<ProductsState>
  ) { }

  ngOnInit() {
  }

  filterQuantiry(){
    if(this.filterQuantity > 0){
      this.storeProducts.dispatch(new SendQuantityFilter(this.filterQuantity));
    }else{
      this.storeProducts.dispatch(new SendQuantityFilter(0));
    }
  }

  filterPrice(){
     if(this.minPrice > 0 && this.maxPrice > 0){
       this.storeProducts.dispatch(new SendPriceFilter({min:this.minPrice,max:this.maxPrice}));
     }else{
       this.minPrice = 0;
       this.maxPrice = 0;
       this.storeProducts.dispatch(new SendPriceFilter({min:0,max:0}));
     }
  }

  orderLessPrice(){
    this.warnOrderLessPrice$.emit();
  }

  orderHigherPrice(){
    this.warOrderHigherPrice$.emit();
  }

  orderLessQuantity(){
    this.warOrderLessQuantity$.emit();
  }

  orderHigHerQuantity(){
     this.warOrderHegherQuantity$.emit();
  }
  
  orderAvailability(){
    this.warOrderAvailability$.emit();
  }
}
