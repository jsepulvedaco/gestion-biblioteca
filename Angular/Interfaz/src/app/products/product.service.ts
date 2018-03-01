import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private server = 'http://localhost:8080/';

    constructor(private _http: HttpClient) { 
        console.log("servicio")
    }

    obtenerLibros(): Observable<any> {
        return this._http.get (this.server + 'libros')
            .do(data => console.log('All: ' + data))
            //.catch(this.handleError);
    }

    borrar(referencia): Observable<any> {
        return this._http.post (this.server + 'borrarLibro', {
            referencia: referencia
        });
    }

    agregarLibro (libro): Observable<any> {
        return this._http.post (this.server + 'agregarLibro', libro);
    }

    editarLibro (libro): Observable<any> {
        console.log("service recibe ", libro)
        return this._http.put (this.server + 'editarLibro', libro);   
    }

    obtenerLibro(id: number): Observable<any> {
        return this.obtenerLibros()
            .map((products: any[]) => products.find(p => p.id === id));
    }

    obtenerUsuarios(): Observable<any> {
        return this._http.get (this.server + 'usuarios')
            .do(data => console.log('Usuarios', data));
    }

}
