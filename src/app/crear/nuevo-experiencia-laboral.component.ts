import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExperienciaLaboralService } from '../servicios/experiencia-laboral.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../servicios/token.service';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-nuevo-experiencia-laboral',
  templateUrl: './nuevo-experiencia-laboral.component.html',
  styleUrls: ['./nuevo-experiencia-laboral.component.css']
})
export class NuevoExperienciaLaboralComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private experienciaLaboralService: ExperienciaLaboralService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        logo: ['', Validators.required],
        puesto: ['', Validators.required],
        empresa: ['', Validators.required],
        pais: ['', Validators.required],
        desde: ['', Validators.required],
        hasta: ['', Validators.required],
        descripcion: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  get Puesto() {

    return this.form.get('puesto');
  }
  get Empresa() {

    return this.form.get('empresa');
  }
  get Pais() {

    return this.form.get('pais');
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
  get Descripcion() {

    return this.form.get('descripcion');
  }

  onCreate(event: Event): void {
    event.preventDefault;


    this.experienciaLaboralService.crear(this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Experiencia Laboral creada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-experiencia-laboral']);



      }
    );

  }
}

