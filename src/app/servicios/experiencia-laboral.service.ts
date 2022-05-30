import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map  } from 'rxjs';
import { ExperienciaLaboral } from '../models/experiencia-laboral';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  /* experienciaLaboralURL = 'https://damp-island-31662.herokuapp.com/persona/experienciaLaboral/';
  experienciaLaboralURL = 'http://localhost:8080/persona/experienciaLaboral/'; */
  experienciaLaboralURL = '/api/persona/experienciaLaboral/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<ExperienciaLaboral[]> {
    return this.httpClient.get<ExperienciaLaboral[]>(this.experienciaLaboralURL + 'traer');
  }

  public detalles(id: number): Observable<ExperienciaLaboral> {
    return this.httpClient.get<ExperienciaLaboral>(this.experienciaLaboralURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<ExperienciaLaboral> {
    return this.httpClient.get<ExperienciaLaboral>(this.experienciaLaboralURL + `buscar/${id}`);
  }

  public crear(experienciaLaboral: ExperienciaLaboral): Observable<any> {
    return this.httpClient.post<any>(this.experienciaLaboralURL + 'crear', experienciaLaboral);
   
  }

  public editar(id: number, experienciaLaboral: ExperienciaLaboral): Observable<any> {
    return this.httpClient.put<any>(`${this.experienciaLaboralURL}` + `editar/${id}`, experienciaLaboral);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.experienciaLaboralURL}` + `borrar/${id}`);
  }

}
