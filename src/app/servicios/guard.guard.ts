import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

constructor (private autenticacionService: AutenticacionService, private router: Router){

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    
    let currentUser=this.autenticacionService.UsuarioAutenticado;

  if(currentUser && currentUser.accessToken)
  {
  return true;
  
  } else 
  {
  
  this.router.navigate(['/portfolio']);
  return false;
  }
}
} 

/* realRol: string;

  constructor(private tokenService: TokenService,
    private router: Router

  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN'){
        this.realRol = 'admin';
      }
    });
    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/']);
      return false;
    }

    return true;
  } 
} */



