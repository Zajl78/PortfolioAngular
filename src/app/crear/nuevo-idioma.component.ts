import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { IdiomasService } from '../servicios/idiomas.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-idioma',
  templateUrl: './nuevo-idioma.component.html',
  styleUrls: ['./nuevo-idioma.component.css']
})
export class NuevoIdiomaComponent implements OnInit {


  form:FormGroup;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private idiomasService: IdiomasService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

      this.form = this.formBuilder.group(
        {
          nombre: ['', Validators.required],
          nivel: ['', Validators.required]

      })

     }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  get Nombre(){

    return this.form.get('nombre');
  }
  get Nivel(){

    return this.form.get('nivel');
  }
  

  onCreate(event: Event): void {
      event.preventDefault;

     
      this.idiomasService.crear(this.form.value).subscribe (data => { 
    
      this.isLoggedIn=true;
      this.isLoginFail=false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Idioma creado', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
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

