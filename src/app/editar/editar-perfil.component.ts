import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../servicios/perfil.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {


  
  formEditar:FormGroup;
  perfil: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private perfilService: PerfilService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    
      this.formEditar = this.formBuilder.group(
        {
          fullName: ['', Validators.required],
          puesto: ['', Validators.required],
          acerca_de_mi: ['', Validators.required],
          fotoPerfil: ['',Validators.required]
         
      
      })

     }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.perfilService.detalles(id).subscribe(
      data => {
      
      this.perfil=data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
        
            
           
        }  
        );
      
        
      }  


get Puesto(){

  return this.formEditar.get('puesto');
}

get FullName(){

  return this.formEditar.get('fullName');
}
get Acerca_de_mi(){

  return this.formEditar.get('acerca_de_mi');
}
get FotoPerfil(){

  return this.formEditar.get('fotoPerfil');
}

onUpdate(event: Event): void {
  event.preventDefault;

  const id = this.activatedRoute.snapshot.params['id'];

  this.perfilService.editar(id, this.formEditar.value).subscribe (data => { 

  this.isLogged=true;
  this.isLoginFail=false;
  console.log("DATA: " + JSON.stringify(data));

  this.toastr.success('Perfil actualizado', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
});
 this.router.navigate(['/portfolio']);
},
err => {
this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'
});
this.router.navigate(['/']);

    
   
}  
);

}

}
  
  
 