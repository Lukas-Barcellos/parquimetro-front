import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Tempo } from '../../model/tempo/tempo';
import { ControleTempo } from '../../model/controle.tempo/controle.tempo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempoService {

  apiUrl: string = environment.apiUrlBase + '/api/tempos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tempo[]> {
      return this.http.get<Tempo[]>(this.apiUrl);
    }

  getListaDeTempos(): Observable<ControleTempo[]> {
    return this.http.get<ControleTempo[]>(`${this.apiUrl}/cadastro`);
  }

  update(Tempo: Tempo): Observable<Tempo> {
    return this.http.put<Tempo>(`${this.apiUrl}/${Tempo.id}`, Tempo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  add(Tempo: Tempo): Observable<Tempo> {
    return this.http.post<Tempo>(this.apiUrl, Tempo);
  }

}
