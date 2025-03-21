import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './views/perfil/perfil.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { HabitacionComponent } from './views/habitacion/habitacion.component';
import { RegistroComponent } from './views/registro/registro.component';
import { AlertaComponent } from './views/alerta/alerta.component';
import { Login2Component } from './views/login/login.component';
import { authGuard } from './auth.guard';
import { RECETAComponent } from './views/RECETA/RECETA.component';
import { CamasComponent } from './views/camas/camas.component';
import { IncidenciasComponent} from './views/incidencias/incidencias.component';


const routes: Routes = [
  {path:"perfil", component: PerfilComponent, canActivate: [authGuard] },
  { path: 'inicio', component: CamasComponent,  canActivate: [authGuard] },
  { path: 'habitacion', component: HabitacionComponent,  canActivate: [authGuard]  },
  { path: 'registro', component: RegistroComponent,  canActivate: [authGuard]  },
  { path: 'alerta', component: AlertaComponent,  canActivate: [authGuard]  },
  { path: 'login', component: Login2Component },
  { path: 'receta', component: RECETAComponent,  canActivate: [authGuard]},
  { path: 'incidencias', component: IncidenciasComponent,  canActivate: [authGuard]},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a '/home'
  { path: '**', redirectTo: '/inicio' } // Redirige cualquier ruta no reconocida a '/home'

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
