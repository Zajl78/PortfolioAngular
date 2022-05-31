import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  /* proyectosURL = 'https://damp-island-31662.herokuapp.com/persona/proyectos/'; 
  proyectosURL = 'http://localhost:8080/persona/proyectos/';*/
  proyectosURL = 'https://damp-island-31662.herokuapp.com/api/persona/proyectos/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(this.proyectosURL + 'traer');
  }

  public detalles(id: number): Observable<Proyectos> {
    return this.httpClient.get<Proyectos>(this.proyectosURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Proyectos> {
    return this.httpClient.get<Proyectos>(this.proyectosURL + `buscar/${id}`);
  }

  public crear(proyectos: Proyectos): Observable<any> {
    return this.httpClient.post<any>(this.proyectosURL + 'crear', proyectos);
  }

  public editar(id: number, proyectos: Proyectos): Observable<any> {
    return this.httpClient.put<any>(this.proyectosURL + `editar/${id}`, proyectos);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyectosURL + `borrar/${id}`);
  }
}
