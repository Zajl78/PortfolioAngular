import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ProyectosService } from '../servicios/proyectos.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-proyectos',
  templateUrl: './nuevo-proyectos.component.html',
  styleUrls: ['./nuevo-proyectos.component.css']
})
export class NuevoProyectosComponent implements OnInit {


  form: FormGroup;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private proyectosService: ProyectosService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        proyecto: ['', Validators.required],
        descripcion: ['', Validators.required],
        fecha: ['', Validators.required],
        imagen: ['', Validators.required],
        link: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

  get Proyecto() {

    return this.form.get('proyecto');
  }
  get Descripcion() {

    return this.form.get('descripcion');
  }
  get Fecha() {

    return this.form.get('fecha');
  }
  get Imagen() {

    return this.form.get('imagen');
  }
  get Link() {

    return this.form.get('link');
  }

  onCreate(event: Event): void {
    event.preventDefault;


    this.proyectosService.crear(this.form.value).subscribe(data => {

      this.isLoggedIn = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Proyecto creado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-proyectos']);



      }
    );

  }
}

