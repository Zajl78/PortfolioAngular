import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { TokenService } from './token.service';
import { JwtAuthresponseDto } from '../models/jwt-authresponse-dto';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

constructor(private autenticacionService: AutenticacionService,
            private tokenService: TokenService) { }

  intercept(req: HttpRequest<JwtAuthresponseDto>, next: HttpHandler): Observable<HttpEvent<JwtAuthresponseDto>> {

var currentUser = this.autenticacionService.UsuarioAutenticado;

    if (currentUser && currentUser.accessToken) 
    {
      req=req.clone({
        setHeaders:{
          Authorization:`Bearer ${currentUser.accessToken}`
        }
      })
    }

      console.log ("Interceptor esta corriendo" + JSON.stringify (currentUser));
    
      return next.handle (req);
    }

  }

    /* let intReq = req;
    const token = this.tokenService.getToken();
    if(token !=null) {

      intReq=req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)})
    }

    console.log ("Interceptor esta corriendo" + JSON.stringify (currentUser));
    return next.handle (req);
  }
    

  }
  

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}]; */