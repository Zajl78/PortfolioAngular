import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { PerfilService } from '../servicios/perfil.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-nuevo-perfil',
  templateUrl: './nuevo-perfil.component.html',
  styleUrls: ['./nuevo-perfil.component.css']
})
export class NuevoPerfilComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private perfilService: PerfilService,
    private autenticacionService: AutenticacionService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        puesto: ['', Validators.required],
        acerca_de_mi: ['', Validators.required],
        fotoPerfil: ['', Validators.required]


      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  get FullName() {

    return this.form.get('fullName');
  }
  get Puesto() {

    return this.form.get('puesto');
  }
  get Acerca_de_mi() {

    return this.form.get('acerca_de_mi');
  }
  get FotoPerfil() {

    return this.form.get('fotoPerfil');
  }


  onCreate(event: Event): void {
    event.preventDefault;


    this.perfilService.crear(this.form.value).subscribe(data => {

      this.isLogged = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Perfil creado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/nuevo-perfil']);



      }
    );

  }
}

