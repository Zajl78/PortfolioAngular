import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { HabilidadesService } from '../servicios/habilidades.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-habilidades',
  templateUrl: './nuevo-habilidades.component.html',
  styleUrls: ['./nuevo-habilidades.component.css']
})
export class NuevoHabilidadesComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private habilidadesService: HabilidadesService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        habilidad: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  get Habilidad() {

    return this.form.get('habilidad');
  }

  onCreate(event: Event): void {
    event.preventDefault;


    this.habilidadesService.crear(this.form.value).subscribe(data => {

      this.isLoggedIn = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Habilidad creada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-habilidades']);



      }
    );

  }
}

