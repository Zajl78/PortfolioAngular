import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from '../models/habilidades';
import { HabilidadesService } from '../servicios/habilidades.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-habilidades',
  templateUrl: './ver-habilidades.component.html',
  styleUrls: ['./ver-habilidades.component.css'],
  providers: [HabilidadesService]
})
export class VerHabilidadesComponent implements OnInit {

  habilidades: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: HabilidadesService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarHabilidades();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }

  cargarHabilidades(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log("habilidades" + JSON.stringify(data));
      this.habilidades = data;
    });

  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Habilidad Eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarHabilidades();
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
