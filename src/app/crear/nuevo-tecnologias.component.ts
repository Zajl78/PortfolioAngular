import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { TecnologiasService } from '../servicios/tecnologias.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-tecnologias',
  templateUrl: './nuevo-tecnologias.component.html',
  styleUrls: ['./nuevo-tecnologias.component.css']
})
export class NuevoTecnologiasComponent implements OnInit {


  form:FormGroup;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private tecnologiasService: TecnologiasService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

      this.form = this.formBuilder.group(
        {
          logo: ['', Validators.required],
          tecnologia: ['', Validators.required],
          porcentaje: ['', Validators.required]
                
      })

     }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  get Tecnologia(){

    return this.form.get('tecnologia');
  }
  get Porcentaje(){

    return this.form.get('porcentaje');
  }
  
  get Logo(){

    return this.form.get('logo');
  }
  

  onCreate(event: Event): void {
      event.preventDefault;

     
      this.tecnologiasService.crear(this.form.value).subscribe (data => { 
    
      this.isLoggedIn=true;
      this.isLoginFail=false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Nueva Tecnología creada', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
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

