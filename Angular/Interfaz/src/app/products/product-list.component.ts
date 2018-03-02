import { Component, OnInit } from '@angular/core';

//import { any } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Lista de libros';
    
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.librosFiltrados = this.listFilter
        ? this.performFilter(this.listFilter)
        : this.libros;
    }

    librosFiltrados: any[];
    libros: any[] = [];
    loading = true;

    libro = { };
    agregado = false;

    constructor(private _productService: ProductService) {

    }

    performFilter(filterBy: string): any[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.libros.filter((libro: any) =>
              libro.titulo.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    ngOnInit(): void {
        this._productService.obtenerLibros()
                .subscribe(libros => {
                    this.libros = libros;
                    //console.log("libros ", this.libros)
                    this.librosFiltrados = this.libros;
                    this.loading = false
                },
                    error => this.errorMessage = <any>error);
    }

    agregarLibro() {
        console.log("libro", this.libro);

        this._productService.agregarLibro(this.libro)
        .subscribe(
            response => {
                this.agregado = true;
                alert("el libro ha sido agregado");
                this.libro = {};
                
                this._productService.obtenerLibros()
                    .subscribe(libros => {
                        this.libros = libros;
                        console.log("libros ", this.libros)
                        this.librosFiltrados = this.libros;
                    },
                    error => this.errorMessage = <any>error);

            },
            error => {
                return alert("hubo un error al tratar de agregar el libro");
            })     
    }

    ordenar (categoria) {
        if (categoria === 'autor') {
            this.librosFiltrados.sort((a, b) => {

                if (a.autor < b.autor) {
                    return -1;
                }

                if (a.autor > b.autor) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
        }

        else if (categoria === 'estado') {
            this.librosFiltrados.sort((a, b) => {
                return a.estado - b.estado;
            });
        }

        this.libros.reverse();
    }


}
