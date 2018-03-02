import { Component, OnInit } from '@angular/core';

//import { any } from './product';
import { ProductService } from './usuario.service';

@Component({
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Lista de usuarios';
    
    errorMessage: string;

    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.usuariosFiltrados = this.listFilter
        ? this.performFilter(this.listFilter)
        : this.usuarios;
    }

    usuariosFiltrados: any[];
    usuarios: any[] = [];
    loading = true;

    usuario = { };
    agregado = false;

    constructor(private _productService: ProductService) {

    }

    performFilter(filterBy: string): any[] {
        filterBy = filterBy.toString();
        return this.usuarios.filter((usuario: any) =>
              usuario.codigo.toString().indexOf(filterBy) !== -1);
    }


    ngOnInit(): void {
        this._productService.obtenerUsuarios()
        .subscribe(usuarios => {
            this.usuarios = usuarios;
            //console.log("usuarios ", this.usuarios)
            this.usuariosFiltrados = this.usuarios;
            this.loading = false
        },
            error => this.errorMessage = <any>error);
    }

    agregarLibro() {
        console.log("usuario", this.usuario);

        this._productService.agregarUsuario(this.usuario)
        .subscribe(
            response => {
                this.agregado = true;
                alert("el usuario ha sido agregado");
                this.usuario = {};
                
                this._productService.obtenerUsuarios()
                .subscribe(usuarios => {
                    this.usuarios = usuarios;
                    console.log("usuarios ", this.usuarios)
                    this.usuariosFiltrados = this.usuarios;
                },
                error => this.errorMessage = <any>error);

            },
            error => {
                return alert("hubo un error al tratar de agregar el usuario");
            })     
    } 

    ordenar (categoria) {
        if (categoria === 'nombre') {
            this.usuariosFiltrados.sort((a, b) => {

                if (a.nombre < b.nombre) {
                    return -1;
                }

                if (a.nombre > b.nombre) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
        }

        else if (categoria === 'permiso') {
            this.usuariosFiltrados.sort((a, b) => {
                return a.permiso - b.permiso;
            });
        }

        this.usuariosFiltrados.reverse();
    } 


}
