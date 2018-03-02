import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/libros']">Libros</a></li>
                    <li><a [routerLink]="['/usuarios']">Usuarios</a></li>
                    <li><a [routerLink]="['/prestamos']">Préstamos</a></li>
                    <li><a [routerLink]="['/welcome']">Información</a></li>
                    
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
    `
})
export class AppComponent {
  pageTitle: string = 'Gestión de libros';
}
