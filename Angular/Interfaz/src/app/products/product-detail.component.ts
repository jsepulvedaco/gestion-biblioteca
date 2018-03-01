import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Detalle del libro';
  errorMessage: string;
  libro: any;
  borrado: boolean = false;
  editando = false;
  editado = false;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.obtenerLibro(id);
    }
  }

  obtenerLibro(id: number) {
    this._productService.obtenerLibro(id).subscribe(
      libro => this.libro = libro,
      error => this.errorMessage = <any>error);
  }

  borrarLibro(referencia) {
    this._productService.borrar(referencia).subscribe( response => {
      this.borrado = true;
      return true;
    },
    error => {
      alert("hubo un error al tratar de borrar el libro");
      return false;
    })
  }

    editar (): boolean {
        if (this.editando === false) {
            this.editando = true;
            return false;

        }
        console.log("valor editado", this.editado)
        console.log("id", this.libro.id)

        this._productService.editarLibro(this.libro).subscribe( response => {
            this.editado = true;
            return true;
        }, error => {
            alert("hubo un error al tratar de editar los detalles del libro");
            return false;
        });
        
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

}
