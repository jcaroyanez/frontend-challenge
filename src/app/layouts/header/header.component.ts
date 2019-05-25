import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TrolleyComponent } from 'src/app/components/trolley/trolley.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  trolleyModalRef:BsModalRef;

  constructor(
     private modalService:BsModalService
  ) { }

  ngOnInit() {
  }

  openModalTrolley(){
     this.trolleyModalRef = this.modalService.show(TrolleyComponent,{ class: 'modal-trolley modal-lg' });
  }

}
