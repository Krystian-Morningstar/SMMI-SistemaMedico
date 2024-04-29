  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { PrincipalComponent} from './principal/principal.component'; // Importa el componente principal
  import { CamasComponent} from './camas/camas.component'; // Importa el componente principal 
  import { NavbarComponent} from './navbar/navbar.component'; // Importa el componente principal 
  import { IncidenciasComponent} from './incidencias/incidencias.component'; // Importa el componente principal 
  const routes: Routes = [
  { path: '', component: CamasComponent }, 
  { path: 'principal', component: PrincipalComponent },
  { path: 'navar', component: PrincipalComponent },
  { path: 'inicio', component: CamasComponent }, 
  { path: 'incidencias', component: IncidenciasComponent }, 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
