export class UsuariosActivos {

    public idSocket: string;
    public negocio: string;
  
    constructor(idSocket: string, negocio: string) {
      this.idSocket = idSocket;
      this.negocio = negocio;
    }
  
    public getIdNegocio(): string {
      return this.negocio;
    }

    public getIdSocket(): string {
      return this.idSocket;
    }
  
    public setIdSocket( idSocket: string ): void {
      this.idSocket = idSocket;
    }
  
}