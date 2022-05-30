import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExperienciaLaboral } from '../models/experiencia-laboral';
import { ExperienciaLaboralService } from '../servicios/experiencia-laboral.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-experiencia-laboral',
  templateUrl: './ver-experiencia-laboral.component.html',
  styleUrls: ['./ver-experiencia-laboral.component.css'],
  providers: [ExperienciaLaboralService]
})

export class VerExperienciaLaboralComponent implements OnInit {

  experienciaLaboral: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: ExperienciaLaboralService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarExperienciaLaboral();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }
  cargarExperienciaLaboral(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.experienciaLaboral = data;
      console.log("experienciaLaboral" + JSON.stringify(data));

    });
  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Experiencia Laboral Eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarExperienciaLaboral();
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




