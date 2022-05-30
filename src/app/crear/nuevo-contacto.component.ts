import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ContactoService } from '../servicios/contacto.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.css']
})
export class NuevoContactoComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private contactoService: ContactoService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  get Direccion() {

    return this.form.get('direccion');
  }
  get Telefono() {

    return this.form.get('telefono');
  }
  get Email() {

    return this.form.get('email');
  }

  onCreate(event: Event): void {
    event.preventDefault;


    this.contactoService.crear(this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Contacto creado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-contacto']);



      }
    );

  }
}

