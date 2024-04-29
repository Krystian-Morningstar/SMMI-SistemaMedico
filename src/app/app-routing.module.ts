  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { PrincipalComponent} from './principal/principal.component'; // Importa el componente principal
  import { CamasComponent} from './camas/camas.component'; // Importa el componente principal 

  const routes: Routes = [
  { path: '', component: CamasComponent }, 
  { path: 'principal', component: PrincipalComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
