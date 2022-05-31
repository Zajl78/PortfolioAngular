import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idiomas } from '../models/idiomas';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

 /*  idiomasURL = 'https://damp-island-31662.herokuapp.com/persona/idiomas/';
  idiomasURL = 'http://localhost:8080/persona/idiomas/'; */
  idiomasURL = 'https://damp-island-31662.herokuapp.com/api/persona/idiomas/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Idiomas[]> {
    return this.httpClient.get<Idiomas[]>(this.idiomasURL + 'traer');
  }

  public detalles(id: number): Observable<Idiomas> {
    return this.httpClient.get<Idiomas>(this.idiomasURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Idiomas> {
    return this.httpClient.get<Idiomas>(this.idiomasURL + `buscar/${id}`);
  }

  public crear(idiomas: Idiomas): Observable<any> {
    return this.httpClient.post<any>(this.idiomasURL + 'crear', idiomas);
  }

  public editar(id: number, idiomas: Idiomas): Observable<any> {
    return this.httpClient.put<any>(this.idiomasURL + `editar/${id}`, idiomas);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.idiomasURL + `borrar/${id}`);
  }
}
