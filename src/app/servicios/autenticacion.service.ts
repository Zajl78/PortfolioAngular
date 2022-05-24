import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { NuevoRegistro } from '../models/nuevo-registro';
import { JwtAuthresponseDto } from '../models/jwt-authresponse-dto';
import { IniciarSesion } from '../models/iniciar-sesion';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  authURL='http://localhost:8080/auth/';

  currentUserSubject:BehaviorSubject<any>

  constructor(private httpClient: HttpClient) { 
    console.log ("El Servicio de Autenticación está corriendo");

    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
    }

    public authenticateUser(iniciarSesion: IniciarSesion):Observable<JwtAuthresponseDto> {
      return this.httpClient.post<JwtAuthresponseDto>(this.authURL + 'iniciarSesion', iniciarSesion).pipe(map(data=>{
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        
        this.currentUserSubject.next(data);
        
        return data;
      }))
    
    
    }
      

   /*  public registrarUsuario(nuevoRegistro: NuevoRegistro): Observable<JwtAuthresponseDto> {
      return this.httpClient.post<any>(this.authURL + 'registrar', nuevoRegistro);
    } */

    get UsuarioAutenticado()
    {

      return this.currentUserSubject.value;
    }
}
