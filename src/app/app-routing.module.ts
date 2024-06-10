import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './views/perfil/perfil.component';
import { HabitacionComponent } from './views/habitacion/habitacion.component';
import { Login2Component } from './views/login/login.component';
import { authGuard } from './auth.guard';
import { RECETAComponent } from './views/RECETA/RECETA.component';
import { CamasComponent } from './views/camas/camas.component';
import { BusquedaComponent } from './views/busqueda/busqueda.component';


const routes: Routes = [
  {path:"perfil", component: PerfilComponent, canActivate: [authGuard] },
  { path: 'inicio', component: CamasComponent,  canActivate: [authGuard] },
  { path: 'habitacion', component: HabitacionComponent,  canActivate: [authGuard]  },
  { path: 'login', component: Login2Component },
  { path: 'receta', component: RECETAComponent,  canActivate: [authGuard]},
  {path: 'busqueda', component: BusquedaComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a '/home'
  { path: '**', redirectTo: '/inicio' } // Redirige cualquier ruta no reconocida a '/home'

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
