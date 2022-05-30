import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from '../models/proyectos';
import { ProyectosService } from '../servicios/proyectos.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-proyectos',
  templateUrl: './ver-proyectos.component.html',
  styleUrls: ['./ver-proyectos.component.css'],
  providers: [ProyectosService]
})
export class VerProyectosComponent implements OnInit {
  proyectos: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: ProyectosService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }
  cargarProyectos(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log("proyectos" + JSON.stringify(data));
      this.proyectos = data;
    });


  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Proyecto Eliminado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarProyectos();
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }

    );

  }

}
