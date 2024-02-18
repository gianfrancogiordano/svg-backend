
export class PedidosActivos {

  public idSocket: string;
  public telefono: string;
  public idPedido: string = '';

  constructor(idSocket: string, idPedido: string, telefono: string) {

    this.idSocket = idSocket;
    this.idPedido = idPedido;
    this.telefono = telefono;

  }

  public getIdPedido(): string {
    return this.idPedido;
  }

  public getTelefono(): string {
    return this.telefono;
  }

  public getIdSocket(): string {
    return this.idSocket;
  }

  public setIdSocket( idSocket: string ): void {
    this.idSocket = idSocket;
  }

}