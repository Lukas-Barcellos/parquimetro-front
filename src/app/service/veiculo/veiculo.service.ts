import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Veiculo } from '../../model/veiculo/veiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  apiUrl: string = environment.apiUrlBase + '/api/veiculos';

  constructor(private http: HttpClient) {}

  update(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${veiculo.id}`, veiculo);
  }

  add(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }

  getAll(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  getAllCores(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cores`);
  }

  getVeiculoPorPlaca(placa: string): Observable<Veiculo[]>{
    return this.http.get<any>(`${this.apiUrl}/${placa}`);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  } 

}
