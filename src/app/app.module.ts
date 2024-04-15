import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importa RouterModule

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]) // Importa RouterModule.forRoot() y configura las rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
