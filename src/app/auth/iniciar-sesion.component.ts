import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesion } from '../models/iniciar-sesion';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  iniciarSesion: IniciarSesion;
  password: string;
  usernameOrEmail: string;

  roles: string[] = [];
  errMsj: string;

  constructor(private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {

    this.form = this.formBuilder.group(
      {
        usernameOrEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        token: [''],
        username: [''],
        authorities: [''],
        roles: ['']

      })
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {

      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

  }

  get UsernameOrEmail() {

    return this.form.get('usernameOrEmail');
  }

  get Password() {

    return this.form.get('password');
  }

  onEnviar(event: Event): void {
    event.preventDefault;
    this.iniciarSesion = new IniciarSesion(this.form.get('usernameOrEmail')?.value, this.form.get('password')?.value);
    this.autenticacionService.authenticateUser(this.form.value).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;

      this.tokenService.setToken(data.tokenDeAcceso);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['/portfolio']);

      console.log("DATA: " + JSON.stringify(data));

    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err.error.mensaje;
      console.log(err.error.mensaje);
    }
    )
  }
}
