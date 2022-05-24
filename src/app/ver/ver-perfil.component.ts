import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../servicios/perfil.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css'],
  providers: [PerfilService]
})
export class VerPerfilComponent implements OnInit {
  
  perfil: any[]=[];
  roles: string[];
  isAdmin = false;

  constructor(private datosPortfolio:PerfilService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarPerfil();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
    
  }
  cargarPerfil():void {
     this.datosPortfolio.obtenerDatos().subscribe(data =>{
       console.log("perfil" + JSON.stringify(data));
       this.perfil=data;
     });
   
  }

  borrar(id: number) {

    /* alert('borrar el ' + id); */
      
      this.datosPortfolio.borrar(id).subscribe(data => {
      this.toastr.success('Experiencia Laboral Eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarPerfil();
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

