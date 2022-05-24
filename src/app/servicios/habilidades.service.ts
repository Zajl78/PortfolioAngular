import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidades } from '../models/habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  habilidadesURL = 'http://localhost:8080/persona/habilidades/';

  constructor(private httpClient: HttpClient) { }

  public obtenerDatos(): Observable<Habilidades[]> {
    return this.httpClient.get<Habilidades[]>(`${this.habilidadesURL}` + 'traer');
  }

  public detalles(id: number): Observable<Habilidades> {
    return this.httpClient.get<Habilidades>(`${this.habilidadesURL}` + `detalle/${id}`);
  }

  public buscar(id: number): Observable<Habilidades> {
    return this.httpClient.get<Habilidades>(`${this.habilidadesURL}`+ `buscar/${id}`);
  }

  public crear(habilidades: Habilidades): Observable<any> {
    return this.httpClient.post<any>(`${this.habilidadesURL}` + 'crear', habilidades);
  }

  public editar(id: number, habilidades: Habilidades): Observable<any> {
    return this.httpClient.put<any>(`${this.habilidadesURL}` + `editar/${id}`, habilidades);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.habilidadesURL}` + `borrar/${id}`);
  }
}
