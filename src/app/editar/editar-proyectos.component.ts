import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyectos } from '../models/proyectos';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { ProyectosService } from '../servicios/proyectos.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-proyectos',
  templateUrl: './editar-proyectos.component.html',
  styleUrls: ['./editar-proyectos.component.css']
})
export class EditarProyectosComponent implements OnInit {

  form: FormGroup;
  proyecto: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private proyectosService: ProyectosService,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
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
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.proyectosService.detalles(id).subscribe(
      data => {

        this.proyecto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);



      }
    );


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

  onUpdate(event: Event): void {
    event.preventDefault;

    const id = this.activatedRoute.snapshot.params['id'];

    this.proyectosService.editar(id, this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Proyecto actualizado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/editar-proyectos']);



      }
    );

  }

}




