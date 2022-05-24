import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnologias } from '../models/tecnologias';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { TecnologiasService } from '../servicios/tecnologias.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-tecnologias',
  templateUrl: './editar-tecnologias.component.html',
  styleUrls: ['./editar-tecnologias.component.css']
})
export class EditarTecnologiasComponent implements OnInit {

  form:FormGroup;
  tecnologia: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private tecnologiasService: TecnologiasService,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
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
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.tecnologiasService.detalles(id).subscribe(
      data => {
      
      this.tecnologia=data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
        
            
           
        }  
        );
      
        
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
  

  onUpdate(event: Event): void {
    event.preventDefault;
  
    const id = this.activatedRoute.snapshot.params['id'];
  
    this.tecnologiasService.editar(id, this.form.value).subscribe (data => { 
  
    this.isLogged=true;
    this.isLoginFail=false;
    console.log("DATA: " + JSON.stringify(data));
  
    this.toastr.success('Tecnología actualizada', 'Ok', {timeOut: 3000, positionClass: 'toast-top-center'
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
    
    
   
  
  