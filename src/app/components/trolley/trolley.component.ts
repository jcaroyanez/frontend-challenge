import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { TrolleyState } from 'src/app/reducers/trolley.reducers';
import { Product } from 'src/app/models/products';
import { DeleteProductToList, UpdateTotalProductTrolley } from 'src/app/actions/trolley.action';

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.component.html',
  styleUrls: ['./trolley.component.scss']
})
export class TrolleyComponent implements OnInit {
  trolleyListProduct:Product[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private storeTrolley:Store<TrolleyState>
    ) { }

  ngOnInit() {
    this.storeTrolley.select('trolley').subscribe((state:TrolleyState) => {

      if(state != undefined){
         this.trolleyListProduct = state.trolleyListProduct;
      }
    })
  }

  remove(i){
    this.storeTrolley.dispatch(new DeleteProductToList(i));
  }

  updateTotalProduct(index,event){
      if(this.trolleyListProduct[index].total != null){
        this.storeTrolley.dispatch(new UpdateTotalProductTrolley(this.trolleyListProduct[index].id,Object.assign({},{total:this.trolleyListProduct[index].total})))
      }
  }

}
