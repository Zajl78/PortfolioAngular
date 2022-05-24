import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnologias } from '../models/tecnologias';
import { TecnologiasService } from '../servicios/tecnologias.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-tecnologias',
  templateUrl: './ver-tecnologias.component.html',
  styleUrls: ['./ver-tecnologias.component.css'],
  providers: [TecnologiasService]
})
export class VerTecnologiasComponent implements OnInit {
  tecnologias: any[] = [];
  roles: string[];
  isAdmin = false;
  
  
  constructor(private datosPortfolio:TecnologiasService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarTecnologias();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
    
  }
  cargarTecnologias():void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log("tecnologias" + JSON.stringify(data));
      this.tecnologias=data;
    });
  
  
  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */
      
      this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Experiencia Laboral Eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarTecnologias();
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
