import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductListComponent } from './usuario-list.component';
import { ProductDetailComponent } from './usuario-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductGuardService } from './usuario-guard.service';
import { ProductService } from './usuario.service';

@NgModule({
  imports: [
	FormsModule,
	CommonModule,
    RouterModule.forChild([
        { path: 'usuarios', component: ProductListComponent },
        { path: 'usuarios/:id',
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
export class UsuarioModule { }
