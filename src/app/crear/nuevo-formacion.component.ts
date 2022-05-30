import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { FormacionService } from '../servicios/formacion.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-formacion',
  templateUrl: './nuevo-formacion.component.html',
  styleUrls: ['./nuevo-formacion.component.css']
})
export class NuevoFormacionComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private formacionService: FormacionService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        logo: ['', Validators.required],
        tipo: ['', Validators.required],
        titulo: ['', Validators.required],
        institucion: ['', Validators.required],
        lugar: ['', Validators.required],
        desde: ['', Validators.required],
        hasta: ['', Validators.required],
        observacion: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  get Tipo() {

    return this.form.get('tipo');
  }
  get Institucion() {

    return this.form.get('institucion');
  }
  get Lugar() {

    return this.form.get('lugar');
  }
  get Desde() {

    return this.form.get('desde');
  }
  get Hasta() {

    return this.form.get('hasta');
  }
  get Logo() {

    return this.form.get('logo');
  }
  get Observacion() {

    return this.form.get('observacion');
  }
  get Titulo() {

    return this.form.get('titulo');
  }

  onCreate(event: Event): void {
    event.preventDefault;


    this.formacionService.crear(this.form.value).subscribe(data => {

      this.isLoggedIn = true;
      this.isLoginFail = false;

      console.log("DATA: " + JSON.stringify(data));

      
      this.toastr.success('Formación creada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-formacion']);



      }
    );

  }
}
