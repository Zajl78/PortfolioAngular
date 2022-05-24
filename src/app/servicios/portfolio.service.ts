import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url: String = 'http://localhost:8080/';

  constructor(private http:HttpClient) {
    
   }

  obtenerDatos ():Observable<any>{
    return this.http.get<any>((`${this.url}`  + 'traer'));

  }

  public buscar(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}` + `buscar/${id}`);
  }

  public crear({}): Observable<any> {
    return this.http.post<any>(`${this.url}` + 'crear', {});
  }

  public editar(id: number, {}): Observable<any> {
    return this.http.put<any>(`${this.url}` + `editar/${id}`, {});
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}` + `borrar/${id}`);
  }


}

