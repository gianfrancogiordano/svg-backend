import { UsuariosActivos } from './usuarios-activos';

export class UsuariosActivosLista {

  private static _instance: UsuariosActivosLista;
  private lista: UsuariosActivos[] = []; 

  private constructor() {}

  get listaUsuariosActivos(): UsuariosActivos[] {
    return this.lista;
  }

  // Singleton
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public agerarUsuarioActivo( usuario: UsuariosActivos ) {

    let isIn = false;
    this.lista.forEach( usuarioLista => {
      if( usuarioLista.getIdSocket() === usuario.getIdSocket() ) {
        isIn = true;
      }
    });

    if(!isIn) {
      this.lista.push( usuario );
    }
  }

  public eliminarUsuarioActivo( cliente: string ): string {

    let negocio = '';

    this.lista.forEach( (usuarioLista, index) => {

        if( cliente === usuarioLista.getIdSocket() ) {

          negocio = usuarioLista.getIdNegocio();
          this.lista.splice(index, 1);
        }

    });

    return negocio;
    
  }

  public getCountActiveUsers( negocio: string ): number {

    let cantidadUsuarios = 0;
    this.lista.forEach( usuario  => {
        if( usuario.getIdNegocio() === negocio ) {
            cantidadUsuarios += 1;
        }

    });

    return cantidadUsuarios;

  }

  public getAllCountActiveUsers(): number {
    return this.lista.length;
  }
  
}