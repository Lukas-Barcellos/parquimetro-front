import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../../model/pagamento/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  apiUrl: string = environment.apiUrlBase + 'api/pagamentos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.apiUrl);
  }

  getAllFormaDePagamento(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/formaPagamento`);
  }

  add(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.apiUrl, pagamento);
  }
}
