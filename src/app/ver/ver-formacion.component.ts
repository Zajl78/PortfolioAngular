import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formacion } from '../models/formacion';
import { FormacionService } from '../servicios/formacion.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-formacion',
  templateUrl: './ver-formacion.component.html',
  styleUrls: ['./ver-formacion.component.css'],
  providers: [FormacionService]
})
export class VerFormacionComponent implements OnInit {
  formacion: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: FormacionService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarFormacion();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }
  cargarFormacion(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log("formacion" + JSON.stringify(data));
      this.formacion = data;
    });


  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Formación Eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarFormacion();
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

