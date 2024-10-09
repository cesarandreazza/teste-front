import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: any[] = [];
  produtos: any[] = [];
  novoPedido: any = {
    nomeCliente: '',
    emailCliente: '',
    pago: false,
    itensPedido: []
  };
 // Variáveis para o item selecionado
 produtoSelecionadoId: number = 0;
 quantidade: number = 1;
 itensPedido: any[] = [];
 
  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.listarPedidos();
    this.listarProdutos();
  }

  adicionarItem(): void {
    const produtoSelecionado = this.produtos.find(p => p.id === +this.produtoSelecionadoId);

    if (produtoSelecionado && this.quantidade > 0) {
      this.novoPedido.itensPedido.push({
        idProduto: produtoSelecionado.id,
        quantidade: this.quantidade
      });
      this.itensPedido.push({
        idProduto: produtoSelecionado.id,
        quantidade: this.quantidade,
        nomeProduto: produtoSelecionado.nome
      });
    }
  }
  // Remove um item da lista de pedido
  removerItem(index: number): void {
      this.novoPedido.itensPedido.splice(index, 1);
    this.itensPedido.splice(index, 1);
  }

  listarPedidos(): void {
    this.pedidoService.listarPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  listarProdutos(): void {
    this.pedidoService.listarProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  salvarPedido(): void {
    if (this.novoPedido.id > 0) {
      this.atualizarPedido(this.novoPedido);
    }
    else{
      this.criarPedido();
    }
  }

  criarPedido(): void {
    this.pedidoService.criarPedido(this.novoPedido).subscribe(() => {
      this.listarPedidos();
      this.novoPedido = { nomeCliente: '', emailCliente: '', pago: false, itensPedido: [] };
    });
    this.produtoSelecionadoId =  0;
    this.quantidade= 1;
    this.itensPedido = [];
  }
  atualizarPedido(pedido: any): void {
    this.pedidoService.atualizarPedido(pedido).subscribe(() => {
      this.listarPedidos();
      this.novoPedido = { nomeCliente: '', emailCliente: '', pago: false, itensPedido: [] };
    });
    this.produtoSelecionadoId =  0;
    this.quantidade= 1;
    this.itensPedido = [];
  }

  excluirPedido(id: number): void {
    this.pedidoService.excluirPedido(id).subscribe(() => {
      this.listarPedidos();
    });
  }
  editarPedido(pedido: any): void {
    this.novoPedido = pedido;
    this.itensPedido = pedido.itensPedido.map((item: any) => {
      const produto = this.produtos.find((p: any) => p.id === item.idProduto);
      return {
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        nomeProduto: produto.nome
      };
    });
  }
}
