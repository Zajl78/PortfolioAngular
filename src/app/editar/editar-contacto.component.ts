import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../servicios/contacto.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent implements OnInit {



  formEditar: FormGroup;
  contacto: any;
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[] = [];

  constructor(private contactoService: ContactoService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {


    this.formEditar = this.formBuilder.group(
      {
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required]

      })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    const id = this.activatedRoute.snapshot.params['id'];
    this.contactoService.detalles(id).subscribe(
      data => {

        this.contacto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);



      }
    );


  }


  get Direccion() {

    return this.formEditar.get('direccion');
  }

  get Telefono() {

    return this.formEditar.get('telefono');
  }
  get Email() {

    return this.formEditar.get('email');
  }

  onUpdate(event: Event): void {
    event.preventDefault;

    const id = this.activatedRoute.snapshot.params['id'];

    this.contactoService.editar(id, this.formEditar.value).subscribe(data => {

      this.isLoggedIn = true;
      this.isLoginFail = false;
      console.log("DATA: " + JSON.stringify(data));

      this.toastr.success('Contacto actualizado', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.router.navigate(['/portfolio']);
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/editar-contacto']);



      }
    );

  }

}


