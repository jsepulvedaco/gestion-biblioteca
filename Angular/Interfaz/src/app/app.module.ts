import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // agregado
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { Pipe, PipeTransform } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
	FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    ProductModule,
    UsuarioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
