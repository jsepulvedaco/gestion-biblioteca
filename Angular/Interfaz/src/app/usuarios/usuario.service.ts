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

    borrar(codigo): Observable<any> {
        return this._http.post (this.server + 'borrarUsuario', {
            codigo: codigo
        });
    }

    agregarUsuario (usuario): Observable<any> {
        return this._http.post (this.server + 'agregarUsuario', usuario);
    }

    editarUsuario (usuario): Observable<any> {
        console.log("service recibe ", usuario)
        return this._http.put (this.server + 'editarUsuario', usuario);   
    }
    
    obtenerUsuario(id: number): Observable<any> {
        return this.obtenerUsuarios()
            .map((usuarios: any[]) => usuarios.find(u => u.id === id));
    }

    obtenerUsuarios(): Observable<any> {
        return this._http.get (this.server + 'usuarios')
            .do(data => console.log('Usuarios', data));
    }

}
