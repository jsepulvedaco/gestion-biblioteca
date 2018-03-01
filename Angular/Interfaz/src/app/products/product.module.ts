import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [
	FormsModule,
	CommonModule,
    RouterModule.forChild([
        { path: 'products', component: ProductListComponent },
        { path: 'products/:id',
          canActivate: [ ProductGuardService ],
          component: ProductDetailComponent }
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    
  ],

  exports: [ FormsModule ],

  providers: [
    ProductService,
    ProductGuardService
  ]
})
export class ProductModule { }
