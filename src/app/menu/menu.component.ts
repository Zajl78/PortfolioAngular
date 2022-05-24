import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  
 /* 
  isLoginFail = false;
  roles: string[]=[];
 */
  constructor(private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true;
     
    } else {
      this.isLogged = false;
      
    }

  }

  onLogOut(): void {

    this.tokenService.logOut();
    this.isLogged=false;
    this.router.navigate(['/']);
   /*  window.location.reload(); */
   
  }

 
}
