import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BannerComponent } from './componentes/banner/banner.component';
import { PortfolioService } from './servicios/portfolio.service';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';

import { IniciarSesionComponent } from './auth/iniciar-sesion.component';
import { MenuComponent } from './menu/menu.component';
import { VerContactoComponent } from './ver/ver-contacto.component';
import { VerExperienciaLaboralComponent } from './ver/ver-experiencia-laboral.component';
import { VerFormacionComponent } from './ver/ver-formacion.component';
import { VerHabilidadesComponent } from './ver/ver-habilidades.component';
import { VerIdiomasComponent } from './ver/ver-idiomas.component';
import { VerPerfilComponent } from './ver/ver-perfil.component';
import { VerProyectosComponent } from './ver/ver-proyectos.component';
import { VerTecnologiasComponent } from './ver/ver-tecnologias.component';
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

import { InterceptorService } from './servicios/interceptor.service';

import { ContactoService } from './servicios/contacto.service';
import { ExperienciaLaboralService } from './servicios/experiencia-laboral.service';
import { FormacionService } from './servicios/formacion.service';
import { HabilidadesService } from './servicios/habilidades.service';
import { IdiomasService } from './servicios/idiomas.service';
import { PerfilService } from './servicios/perfil.service';
import { ProyectosService } from './servicios/proyectos.service';
import { TecnologiasService } from './servicios/tecnologias.service';
// External

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NuevoPerfilComponent } from './crear/nuevo-perfil.component';
import { NuevoContactoComponent } from './crear/nuevo-contacto.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    VerContactoComponent,
    VerExperienciaLaboralComponent,
    VerFormacionComponent,
    VerHabilidadesComponent,
    VerIdiomasComponent,
    VerPerfilComponent,
    VerProyectosComponent,
    VerTecnologiasComponent,
    NuevoPerfilComponent,
    NuevoContactoComponent,
    NuevoExperienciaLaboralComponent,
    NuevoFormacionComponent,
    NuevoHabilidadesComponent,
    NuevoIdiomaComponent,
    NuevoProyectosComponent,
    NuevoTecnologiasComponent,
    EditarContactoComponent,
    EditarExperienciaLaboralComponent,
    EditarFormacionComponent,
    EditarHabilidadesComponent,
    EditarIdiomasComponent,
    EditarPerfilComponent,
    EditarProyectosComponent,
    EditarTecnologiasComponent,

    BannerComponent,    
    PortfolioComponent,
    IniciarSesionComponent,
    MenuComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],

  providers: [PortfolioService,
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true },
  ContactoService,
  ExperienciaLaboralService,
  FormacionService,
  HabilidadesService,
  IdiomasService,
  PerfilService,
  ProyectosService,
  TecnologiasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
