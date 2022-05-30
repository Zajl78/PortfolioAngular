import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnologias } from '../models/tecnologias';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasService {

  /* tecnologiasURL = 'https://damp-island-31662.herokuapp.com/persona/tecnologias/'; 
  tecnologiasURL = 'http://localhost:8080/api/persona/tecnologias/';*/
  tecnologiasURL = '/api/persona/tecnologias/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Tecnologias[]> {
    return this.httpClient.get<Tecnologias[]>(this.tecnologiasURL + 'traer');
  }
  

  public detalles(id: number): Observable<Tecnologias> {
    return this.httpClient.get<Tecnologias>(this.tecnologiasURL + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Tecnologias> {
    return this.httpClient.get<Tecnologias>(this.tecnologiasURL + `buscar/${id}`);
  }

  public crear(tecnologias: Tecnologias): Observable<any> {
    return this.httpClient.post<any>(this.tecnologiasURL + 'crear', tecnologias);
  }

  public editar(id: number, tecnologias: Tecnologias): Observable<any> {
    return this.httpClient.put<any>(this.tecnologiasURL + `editar/${id}`, tecnologias);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.tecnologiasURL + `borrar/${id}`);
  }
}
