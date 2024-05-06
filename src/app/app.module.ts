import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { NavbarComponent} from './navbar/navbar.component'; // Importa el componente principal 
import { AppComponent } from './app.component';
import { PrincipalComponent } from '../app/principal/principal.component';
import { CamasComponent } from './camas/camas.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { AppRoutingModule } from './app-routing.module';
import { Login2Component } from './login2/login2.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CamasComponent,
    IncidenciasComponent,
    NavbarComponent,
    Login2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
