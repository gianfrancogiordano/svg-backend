import { PedidosActivos } from './pedidos-activos';

export class PedidosLista {

  private static _instance: PedidosLista;

  private lista: PedidosActivos[] = []; 

  private constructor() {}

  get listaPedidos(): PedidosActivos[] {
    return this.lista;
  }

  // Singleton
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public borrarPedido(idSocket: string) {
    this.lista = this.lista.filter( (pedido: PedidosActivos) => pedido.idSocket != idSocket );
  }

  public agregarPedidoActivo( pedido: PedidosActivos ) {
    this.lista.push( pedido );
  }
  
}