import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './auth/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { NuevoContactoComponent } from './crear/nuevo-contacto.component';
import { NuevoExperienciaLaboralComponent } from './crear/nuevo-experiencia-laboral.component';
import { NuevoFormacionComponent } from './crear/nuevo-formacion.component';
import { NuevoHabilidadesComponent } from './crear/nuevo-habilidades.component';
import { NuevoIdiomaComponent } from './crear/nuevo-idioma.component';
import { NuevoPerfilComponent } from './crear/nuevo-perfil.component';
import { NuevoProyectosComponent } from './crear/nuevo-proyectos.component';
import { NuevoTecnologiasComponent } from './crear/nuevo-tecnologias.component';
import { EditarContactoComponent } from './editar/editar-contacto.component';
import { EditarExperienciaLaboralComponent } from './editar/editar-experiencia-laboral.component';
import { EditarFormacionComponent } from './editar/editar-formacion.component';
import { EditarHabilidadesComponent } from './editar/editar-habilidades.component';
import { EditarIdiomasComponent } from './editar/editar-idiomas.component';
import { EditarPerfilComponent } from './editar/editar-perfil.component';
import { EditarProyectosComponent } from './editar/editar-proyectos.component';
import { EditarTecnologiasComponent } from './editar/editar-tecnologias.component';
import { IndexComponent } from './index/index.component';
import { GuardGuard as guard} from './servicios/guard.guard';



const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'portfolio', component:PortfolioComponent},
  {path:'nuevo-perfil', component:NuevoPerfilComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-contacto', component:NuevoContactoComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-experiencia-laboral', component:NuevoExperienciaLaboralComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-formacion', component:NuevoFormacionComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-idioma', component:NuevoIdiomaComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-tecnologias', component:NuevoTecnologiasComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-proyectos', component:NuevoProyectosComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo-habilidades', component:NuevoHabilidadesComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-contacto/:id', component:EditarContactoComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-perfil/:id', component:EditarPerfilComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-experiencia-laboral/:id', component:EditarExperienciaLaboralComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-formacion/:id', component:EditarFormacionComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-idiomas/:id', component:EditarIdiomasComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-tecnologias/:id', component:EditarTecnologiasComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-proyectos/:id', component:EditarProyectosComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar-habilidades/:id', component:EditarHabilidadesComponent, canActivate:[guard], data:{expectedRol: ['admin', 'user']}},
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
