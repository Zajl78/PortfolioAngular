import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Habilidades } from '../models/habilidades';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { HabilidadesService } from '../servicios/habilidades.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-habilidades',
  templateUrl: './editar-habilidades.component.html',
  styleUrls: ['./editar-habilidades.component.css']
})
export class EditarHabilidadesComponent implements OnInit {

  form: FormGroup;
  habilidad: any;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private habilidadesService: HabilidadesService,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
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
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.habilidadesService.detalles(id).subscribe(
      data => {

        this.habilidad = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);



      }
    );


  }

  get Habilidad() {

    return this.form.get('habilidad');
  }

  onUpdate(event: Event): void {
    event.preventDefault;

    const id = this.activatedRoute.snapshot.params['id'];

    this.habilidadesService.editar(id, this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Habilidad actualizada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/editar-habilidades']);



      }
    );

  }

}

