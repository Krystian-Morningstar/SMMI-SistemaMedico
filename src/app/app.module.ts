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
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RECETAComponent } from './RECETA/RECETA.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CamasComponent,
    IncidenciasComponent,
    NavbarComponent,
    Login2Component,
    RECETAComponent,
    PerfilComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
