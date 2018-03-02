import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from './usuario.service';

@Component({
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Detalle del usuario';
  errorMessage: string;
  usuario: any;
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
      this.obtenerUsuario(id);
    }
  }

  obtenerUsuario(id: number) {
    this._productService.obtenerUsuario(id).subscribe(
      usuario => {
        this.usuario = usuario;
        console.log("obterner usuario", this.usuario)
      },
      error => this.errorMessage = <any>error);
  }

  borrarUsuario(codigo) {
    this._productService.borrar(codigo).subscribe( response => {
      this.borrado = true;
      return true;
    },
    error => {
      alert("hubo un error al tratar de borrar el usuario");
      return false;
    })
  }

    editar (): boolean {
        if (this.editando === false) {
            this.editando = true;
            return false;

        }
        console.log("valor editado", this.editado)
        console.log("id", this.usuario.id)

        this._productService.editarUsuario(this.usuario).subscribe( response => {
            this.editado = true;
            return true;
        }, error => {
            alert("hubo un error al tratar de editar los detalles del usuario");
            return false;
        });
        
    }

    onBack(): void {
        this._router.navigate(['/usuarios']);
    }

}
