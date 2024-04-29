import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { NavbarComponent} from './navbar/navbar.component'; // Importa el componente principal 
import { AppComponent } from './app.component';
import { PrincipalComponent } from '../app/principal/principal.component';
import { CamasComponent } from './camas/camas.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CamasComponent,
    IncidenciasComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
