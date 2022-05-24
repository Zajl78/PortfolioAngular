import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './auth/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { NuevoExperienciaLaboralComponent } from './crear/nuevo-experiencia-laboral.component';
import { NuevoFormacionComponent } from './crear/nuevo-formacion.component';
import { NuevoHabilidadesComponent } from './crear/nuevo-habilidades.component';
import { NuevoIdiomaComponent } from './crear/nuevo-idioma.component';
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
import { GuardGuard } from './servicios/guard.guard';



const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'portfolio', component:PortfolioComponent},
  {path:'nuevo-experiencia-laboral', component:NuevoExperienciaLaboralComponent},
  {path:'nuevo-formacion', component:NuevoFormacionComponent},
  {path:'nuevo-idiomas', component:NuevoIdiomaComponent},
  {path:'nuevo-tecnologias', component:NuevoTecnologiasComponent},
  {path:'nuevo-proyectos', component:NuevoProyectosComponent},
  {path:'nuevo-habilidades', component:NuevoHabilidadesComponent},
  {path:'editar-contacto/:id', component:EditarContactoComponent},
  {path:'editar-perfil/:id', component:EditarPerfilComponent},
  {path:'editar-experiencia-laboral/:id', component:EditarExperienciaLaboralComponent},
  {path:'editar-formacion/:id', component:EditarFormacionComponent},
  {path:'editar-idiomas/:id', component:EditarIdiomasComponent},
  {path:'editar-tecnologias/:id', component:EditarTecnologiasComponent},
  {path:'editar-proyectos/:id', component:EditarProyectosComponent},
  {path:'editar-habilidades/:id', component:EditarHabilidadesComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
