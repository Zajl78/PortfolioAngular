import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idiomas } from '../models/idiomas';
import { IdiomasService } from '../servicios/idiomas.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-idiomas',
  templateUrl: './ver-idiomas.component.html',
  styleUrls: ['./ver-idiomas.component.css'],
  providers: [IdiomasService]
})
export class VerIdiomasComponent implements OnInit {
  idiomas: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: IdiomasService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarIdiomas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }

  cargarIdiomas(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log("idiomas" + JSON.stringify(data));
      this.idiomas = data;
    });



  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Idioma eliminado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarIdiomas();
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
