import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formacion } from '../models/formacion';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {

 /*  formacionURL = 'https://damp-island-31662.herokuapp.com/persona/formacion/'; 
  formacionURL = 'http://localhost:8080/persona/formacion/';*/
  formacionURL = ' https://damp-island-31662.herokuapp.com/api/persona/formacion/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Formacion[]> {
    return this.httpClient.get<Formacion[]>(this.formacionURL + 'traer');
  }

  public detalles(id: number): Observable<Formacion> {
    return this.httpClient.get<Formacion>(this.formacionURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Formacion> {
    return this.httpClient.get<Formacion>(this.formacionURL + `buscar/${id}`);
  }

  public crear(formacion: Formacion): Observable<any> {
    return this.httpClient.post<any>(this.formacionURL + 'crear', formacion);
  }

  public editar(id: number, formacion: Formacion): Observable<any> {
    return this.httpClient.put<any>(this.formacionURL + `editar/${id}`, formacion);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.formacionURL + `borrar/${id}`);
  }
}
