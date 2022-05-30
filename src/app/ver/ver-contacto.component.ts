import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../servicios/contacto.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-contacto',
  templateUrl: './ver-contacto.component.html',
  styleUrls: ['./ver-contacto.component.css'],
  providers: [ContactoService]
})

export class VerContactoComponent implements OnInit {
  contacto: any[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio: ContactoService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarContacto();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  cargarContacto(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log("contacto" + JSON.stringify(data));
      this.contacto = data;
    });

  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */

    this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Contacto Eliminado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarContacto();
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

