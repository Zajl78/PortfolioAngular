import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  /* perfilURL = 'https://damp-island-31662.herokuapp.com/persona/'; 
  perfilURL = 'http://localhost:8080/persona/';*/
  perfilURL = '/api/persona/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.perfilURL + 'traer');
  }

  public detalles(id: number): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.perfilURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.perfilURL + `buscar/${id}`);
  }

  public crear(perfil: Perfil): Observable<any> {
    return this.httpClient.post<any>(this.perfilURL + 'crear', perfil);
  }

  public editar(id: number, perfil: Perfil): Observable<any> {
    return this.httpClient.put<any>(this.perfilURL + `editar/${id}`, perfil);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.perfilURL + `borrar/${id}`);
  }
}
