/* import { Component, OnInit } from '@angular/core';
import { NuevoRegistro } from '../models/nuevo-registro';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  isLoggedIn = false;
  isLoginFail = false;
  nuevoRegistro: NuevoRegistro;
  nombre: string;
  username: string;
  email: string;
  password: string;
  roles: string[]=[];
  errMsj: string;

  constructor(private tokenService: TokenService,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private formBuilder: FormBuilder ) { 


              }

  ngOnInit(): void {

   if(this.tokenService.getToken()){

      this.isLoggedIn=true;
      this.isLoginFail=false;
    } 

  }

  onEnviar(event: Event): void
  {
    event.preventDefault;
    this.nuevoRegistro = new NuevoRegistro (this.username, this.password, this.email, this.nombre);
    this.autenticacionService.registrarUsuario(this.nuevoRegistro).subscribe(data =>{
      this.isLoggedIn=false;
      this.isLoginFail=false;

      this.autenticacionService.setUsername(data.username);
      this.autenticacionService.setE(data.username);
      this.autenticacionService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['/']);

      console.log("DATA: " + JSON.stringify(data));

    },
    err => {
      this.isLoggedIn=false;
      this.isLoginFail=true;
      this.errMsj = err.error.mensaje;
      //console.log(err.error.mensaje);
    }
    )} 

}
 */