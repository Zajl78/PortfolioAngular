import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ExperienciaLaboral } from '../models/experiencia-laboral';
import { ExperienciaLaboralService } from '../servicios/experiencia-laboral.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-experiencia-laboral',
  templateUrl: './editar-experiencia-laboral.component.html',
  styleUrls: ['./editar-experiencia-laboral.component.css']
})
export class EditarExperienciaLaboralComponent implements OnInit {

  
  formEditar:FormGroup;
  experienciaLaboral: any;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private experienciaLaboralService: ExperienciaLaboralService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

      
    
     this.formEditar = this.formBuilder.group(
        {
          logo: ['', Validators.required],
          puesto: ['', Validators.required],
          empresa: ['', Validators.required],
          pais: ['',Validators.required],
          desde: ['', Validators.required],
          hasta: ['', Validators.required],
          descripcion: ['', Validators.required]
      
      })

     }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];
    
    this.experienciaLaboralService.detalles(id).subscribe(
      data => {
      
      this.experienciaLaboral=data;
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


get Empresa(){

  return this.formEditar.get('empresa');

}

get Pais(){

  return this.formEditar.get('pais');
  
}

get Desde(){
  return this.formEditar.get('desde');
}
get Hasta(){

  return this.formEditar.get('hasta');
}
get Logo(){

  return this.formEditar.get('logo');
  
}
get Descripcion(){

  return this.formEditar.get('descripcion');
  
}

onUpdate(event: Event): void {
  event.preventDefault;

  const id = this.activatedRoute.snapshot.params['id'];
  
  this.experienciaLaboralService.editar(id, this.formEditar.value).subscribe (data => { 

  this.isLoggedIn=true;
  this.isLoginFail=false;
  console.log("DATA: " + JSON.stringify(data));

  this.toastr.success('Experiencia Laboral actualizada', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
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
  
  
 

