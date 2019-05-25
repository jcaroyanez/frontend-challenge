import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { productsReducer } from './reducers/products.reducer';
import { ListProductsComponent } from './components/list-products/list-products.component';

import { ClickStopPropagationDirective } from './directive/click-stop-propagation.directive';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TrolleyComponent } from './components/trolley/trolley.component';

import { environment } from 'src/environments/environment.prod';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { categoriesReducer } from './reducers/categories.reducer';
import { CategoriesEffect } from './effects/categories.effect';
import { ProductsEffect } from './effects/products.action';
import { trolleyReducer } from './reducers/trolley.reducers';
import { FiltersLayoutComponent } from './layouts/filters-layout/filters-layout.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClickStopPropagationDirective,
    TrolleyComponent,
    CategoryComponent,
    ContentLayoutComponent,
    ListProductsComponent,
    FiltersLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    StoreModule.forRoot({categories:categoriesReducer,products:productsReducer,trolley:trolleyReducer}),
    EffectsModule.forRoot([CategoriesEffect,ProductsEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production,
    })
  ],
  entryComponents:[
    TrolleyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
