import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiHost = 'https://localhost:7182'; 

  constructor(private http: HttpClient) { }

  // Endpoints de Produto
  listarProdutos(): Observable<any> {
    return this.http.get(`${this.apiHost}/Produto/Listar`);
  }

  // Endpoints de Pedido
  listarPedidos(): Observable<any> {
    return this.http.get(`${this.apiHost}/Pedido/Pedidos`);
  }

  criarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiHost}/Pedido/Criar`, pedido);
  }

  atualizarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiHost}/Pedido/Atualizar`, pedido);
  }

  excluirPedido(id: number): Observable<any> {
    return this.http.get(`${this.apiHost}/Pedido/Excluir/${id}`);
  }
}
