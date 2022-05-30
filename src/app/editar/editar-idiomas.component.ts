import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idiomas } from '../models/idiomas';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { IdiomasService } from '../servicios/idiomas.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-idiomas',
  templateUrl: './editar-idiomas.component.html',
  styleUrls: ['./editar-idiomas.component.css']
})
export class EditarIdiomasComponent implements OnInit {


  form: FormGroup;
  idioma: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private idiomasService: IdiomasService,
    private activatedRoute: ActivatedRoute,
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
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.idiomasService.detalles(id).subscribe(
      data => {

        this.idioma = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);



      }
    );


  }

  get Nombre() {

    return this.form.get('nombre');
  }
  get Nivel() {

    return this.form.get('nivel');
  }


  onUpdate(event: Event): void {
    event.preventDefault;

    const id = this.activatedRoute.snapshot.params['id'];

    this.idiomasService.editar(id, this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Idioma actualizado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/editar-idiomas']);



      }
    );

  }

}




