import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  
  /* contactoURL = 'http://localhost:8080/persona/contacto/'; */
  contactoURL = ' https://damp-island-31662.herokuapp.com/api/persona/contacto/';

  constructor(private httpClient: HttpClient) { }

  
  public obtenerDatos(): Observable<Contacto[]> {
    return this.httpClient.get<Contacto[]>(this.contactoURL + 'traer');
  }

  public detalles(id: number): Observable<Contacto> {
    return this.httpClient.get<Contacto>(this.contactoURL + `detalle/${id}`);
  }


  public buscar(id: number): Observable<Contacto> {
    return this.httpClient.get<Contacto>(this.contactoURL + `buscar/${id}`);
  }

  public crear(contacto: Contacto): Observable<any> {
    return this.httpClient.post<any>(this.contactoURL + 'crear', contacto);
  }

  public editar(id: number, contacto: Contacto): Observable<any> {
    return this.httpClient.put<any>(this.contactoURL + `editar/${id}`, contacto);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.contactoURL + `borrar/${id}`);
  }

}
