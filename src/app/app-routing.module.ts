  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { PrincipalComponent} from './principal/principal.component'; // Importa el componente principal
  import { CamasComponent} from './camas/camas.component'; // Importa el componente principal 
  import { PerfilComponent} from './perfil/perfil.component'; // Importa el componente principal 
  import { IncidenciasComponent} from './incidencias/incidencias.component'; // Importa el componente principal 
  import { RecetaComponent} from './receta/receta.component'; // Importa el componente principal 
  const routes: Routes = [
  { path: '', component: CamasComponent }, 
  {path:"perfil", component: PerfilComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'navar', component: PrincipalComponent },
  { path: 'inicio', component: CamasComponent }, 
  { path: 'incidencias', component: IncidenciasComponent },
  { path: 'receta', component: RecetaComponent }, 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
