import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes = [
  { path: 'pedidos', component: PedidoComponent },
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' },  // Redireciona para pedidos ao carregar a aplicação
  { path: '**', redirectTo: '/pedidos' }  // Redireciona caso rota não seja encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
