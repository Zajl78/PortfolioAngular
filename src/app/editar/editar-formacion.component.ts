import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Formacion } from '../models/formacion';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { FormacionService } from '../servicios/formacion.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-formacion',
  templateUrl: './editar-formacion.component.html',
  styleUrls: ['./editar-formacion.component.css']
})
export class EditarFormacionComponent implements OnInit {

  form:FormGroup;
  formacion: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private formacionService: FormacionService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

      this.form = this.formBuilder.group(
        {
          logo: ['', Validators.required],
          tipo: ['', Validators.required],
          titulo: ['', Validators.required],
          institucion: ['', Validators.required],
          lugar: ['',Validators.required],
          desde: ['', Validators.required],
          hasta: ['', Validators.required],
          observacion: ['', Validators.required]
      
      })

     }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.formacionService.detalles(id).subscribe(
      data => {
      
      this.formacion=data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
        
            
           
        }  
        );
      
        
      }  

  get Tipo(){

    return this.form.get('tipo');
  }
  get Institucion(){

    return this.form.get('institucion');
  }
  get Lugar(){

    return this.form.get('lugar');
  }
  get Desde(){

    return this.form.get('desde');
  }
  get Hasta(){

    return this.form.get('hasta');
  }
  get Logo(){

    return this.form.get('logo');
  }
  get Observacion(){

    return this.form.get('observacion');
  }
  get Titulo(){

    return this.form.get('titulo');
  }

  onUpdate(event: Event): void {
    event.preventDefault;
  
    const id = this.activatedRoute.snapshot.params['id'];
  
    this.formacionService.editar(id, this.form.value).subscribe (data => { 
  
    this.isLogged=true;
    this.isLoginFail=false;
    console.log("DATA: " + JSON.stringify(data));
  
    this.toastr.success('Formación actualizada', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
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

