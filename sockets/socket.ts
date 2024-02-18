import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { PedidosActivos } from '../classes/pedidos-activos';
import { PedidosLista } from '../classes/pedidos-lista';

import { UsuariosActivos } from '../classes/usuarios-activos';
import { UsuariosActivosLista } from '../classes/usuarios-activos-lista';

const pedidosLista = PedidosLista.instance;
const usuariosActivosLista = UsuariosActivosLista.instance;

export const desconectar = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('disconnect', () => {
    pedidosLista.borrarPedido(cliente.id);

    // Eliminamos el usuarios que estaba viendo el market
    const delNegocio = usuariosActivosLista.eliminarUsuarioActivo(cliente.id);

    const activeUsers = usuariosActivosLista.getCountActiveUsers(delNegocio);
    io.emit('usuarios-activos-negocio', {usuarios: activeUsers, negocio: delNegocio});

    const allActiveUsers = usuariosActivosLista.getAllCountActiveUsers();
    io.emit('all-usuarios-activos-negocio', {usuarios: allActiveUsers});

  });

}

export const actualizar = (cliente: Socket, io: socketIO.Server) => {

  // Actualizamos los pedidos de los negocios
  io.in(cliente.id).emit('pedido-nuevo', 'recargando pedidos ...');

  // Actualizamos a los clientes si el pedido tiene cambios
  io.in(cliente.id).emit('actualizacion-pedidos');

}

export const nuevoPedidoWhatsapp = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('pedido-whatsapp', ( payload: any ) => {
    // emit para recargar los pedidos del dashboard
    io.emit('pedido-nuevo', 'recargando pedidos ...');
  });

}

export const ingresarPedidoLista = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('configurar-pedido', (payload: any) => {

    const lista = pedidosLista.listaPedidos;
    let pedidoEnLista: boolean = false;

    lista.forEach( (pedido: PedidosActivos) => {

      if( payload.id == pedido.idPedido ) {
        pedido.idSocket = cliente.id;
        pedidoEnLista = true;
      }

    });

    if(!pedidoEnLista) {
      pedidoEnLista = false;
      const pedidoActivo = new PedidosActivos(cliente.id, payload.id, payload.telefono);
      pedidosLista.agregarPedidoActivo(pedidoActivo);
    }

  });

}

export const ingresarUsuarioActivo = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('ingresar-usuario-lista', (payload: any) => {

    const nuevoUsuario = new UsuariosActivos(cliente.id, payload);
    usuariosActivosLista.agerarUsuarioActivo(nuevoUsuario);

    const activeUsers = usuariosActivosLista.getCountActiveUsers(payload);
    io.emit('usuarios-activos-negocio', {usuarios: activeUsers, negocio: payload});

    const allActiveUsers = usuariosActivosLista.getAllCountActiveUsers();
    io.emit('all-usuarios-activos-negocio', {usuarios: allActiveUsers});

  });

}

export const getUsuariosActivos = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('actualizar-usuarios-lista', (payload: any) => {

    const activeUsers = usuariosActivosLista.getCountActiveUsers(payload);
    io.in(cliente.id).emit('usuarios-activos-negocio', {usuarios: activeUsers, negocio: payload});

  });

}

export const getAllUsuariosActivos = (cliente: Socket, io: socketIO.Server) => {

  cliente.on('get-all-usuarios-lista', (payload: any) => {

    console.log('pidiendo todos los usuarios activos');
    const allActiveUsers = usuariosActivosLista.getAllCountActiveUsers();
    io.in(cliente.id).emit('all-usuarios-activos-negocio', {usuarios: allActiveUsers});

  });

}
