import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../models/perfil';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  perfil: Perfil[]=[];
  /* isLoginFail = false;
  roles: string[]=[]; */



  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      
    } else {
      this.isLogged = false;
      
    }

  }


 /*  onLogOut(): void {

    this.tokenService.logOut();

    this.isLogged = false;
    this.tokenService.logOut;
    
    window.location.reload;
    this.router.navigate(['/iniciar-sesion']);
  } */
}
