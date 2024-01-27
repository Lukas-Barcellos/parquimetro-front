import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Condutor } from '../../model/condutor/condutor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondutorService {

  apiUrl: string = environment.apiUrlBase + '/api/condutores';

  constructor(private http: HttpClient) {}

  update(Condutor: Condutor): Observable<Condutor> {
    return this.http.put<Condutor>(`${this.apiUrl}/${Condutor.id}`, Condutor);
  }

  add(Condutor: Condutor): Observable<Condutor> {
    return this.http.post<Condutor>(this.apiUrl, Condutor);
  }

  getAll(): Observable<Condutor[]> {
    return this.http.get<Condutor[]>(this.apiUrl);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  } 

  getCondutorByNomeCompleto(nomeCompleto: string): Observable<Condutor[]>{
    return this.http.get<any>(`${this.apiUrl}/${nomeCompleto}`);
  }
}
