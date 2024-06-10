import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { HabitacionComponent } from './views/habitacion/habitacion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Login2Component } from './views/login/login.component';
import { RECETAComponent } from './views/RECETA/RECETA.component';
import { CamasComponent } from './views/camas/camas.component';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './views/busqueda/busqueda.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PerfilComponent,
    Login2Component,
    RECETAComponent,
    CamasComponent,
    BusquedaComponent,
    HabitacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgApexchartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
