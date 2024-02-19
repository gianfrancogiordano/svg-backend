import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { CustomError } from '../../classes/custom-error';

export const generarJWT = (uid: string, role: any, negocio: any) => {

  // Devolvemos una promesa para poder utilizar async/await en donde lo necesitemos para avanzar ...
  return new Promise((resolve, reject) => {

    const payload = { uid, role, negocio };

    sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: '24h',
    }, (err, token) => {

      if (err) {
        return reject(err);
      }

      return resolve(token);

    });

  });

};

export const getMenu = (role: any) => {

  let menu: any = [];
  let subAdmin: any = [];
  let subMenuNegocio: any = [];
  let subNegocio: any = [];
  let subPedidos: any = [];
  let subClientes: any = [];

  role.modulos.forEach((m: any) => {

    // Menu Administrativo
    if (m.modulo === 'administrativo[Menu]' && m.visualizar) {
      menu.push({
        titulo: 'Administrativo',
        icono: 'fas fa-tachometer-alt',
        submenu: subAdmin
      });

    } else if (m.modulo === 'dashboard[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Tablero de control', url: '/dashboard' });

    } else if (m.modulo === 'roles[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Gestión de roles', url: 'roles' });

    } else if (m.modulo === 'usuarios[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Gestión de usuarios', url: 'usuarios' });
    }

    // Menu Inventario
    if (m.modulo === 'productos[Menu]' && m.visualizar) {
      menu.push({
        titulo: 'Inventario',
        icono: 'fas fa-boxes',
        submenu: subMenuNegocio
      });

    } else if (m.modulo === 'inventario[SubMenu]' && m.visualizar) {
      subMenuNegocio.push({ titulo: 'Inventario de telas', url: 'inventario-telas' });
      // subMenuNegocio.push({ titulo: 'Telas', url: 'telas' });
      subMenuNegocio.push({ titulo: 'Productos', url: 'productos' });
      subMenuNegocio.push({ titulo: 'Cortes', url: 'cortes' });
    }

    // Clientes del negocio
    // if (m.modulo === 'clientes[Menu]' && m.visualizar) {
    //   menu.push({
    //     titulo: 'Clientes',
    //     icono: 'fas fa-user-tag',
    //     submenu: subClientes
    //   });

    // } else if (m.modulo === 'clientes[SubMenu]' && m.visualizar) {
    //   subClientes.push({ titulo: 'Clientes Registrados', url: 'clientes' });
    //   subClientes.push({ titulo: 'Clientes Potenciales', url: 'landingleads' });

    // }

    // Menu Pedidos
    // if (m.modulo === 'pedidos[Menu]' && m.visualizar) {
    //   menu.push({
    //     titulo: 'Pedidos',
    //     icono: 'fas fa-shipping-fast',
    //     submenu: subPedidos
    //   });

    // } else if (m.modulo === 'pedidos[SubMenu]' && m.visualizar) {
    //   subPedidos.push({ titulo: 'Pedidos, Ingresos y Gastos', url: 'balances' });
    // }

    // // Menu Gestion de welcome page
    // if (m.modulo === 'productos[Menu]' && m.visualizar) {
    //   menu.push({
    //     titulo: 'Página de Bienvenida',
    //     icono: 'fas fa-th-list',
    //     submenu: subMenuWelcome
    //   });

    // } else if (m.modulo === 'productos[SubMenu]' && m.visualizar) {
    //   subMenuWelcome.push({ titulo: 'Configuración del la Página de bienvenida', url: 'config-welcome' });
    // }

    // // Menu Gestion de creador de página web
    // if (m.modulo === 'productos[Menu]' && m.visualizar) {
    //   menu.push({
    //     titulo: 'Web Creator',
    //     icono: 'fas fa-funnel-dollar',
    //     submenu: subMenuWeb
    //   });

    // } else if (m.modulo === 'productos[SubMenu]' && m.visualizar) {
    //   subMenuWeb.push({ titulo: 'Creador de página web', url: 'config-landing' });
    // }

    // // Configuracion del negocio
    // if (m.modulo === 'negocio[Menu]' && m.visualizar) {
    //   menu.push({
    //     titulo: 'Configuraciones',
    //     icono: 'fas fa-users-cog',
    //     submenu: subNegocio
    //   });

    // } else if (m.modulo === 'negocio[SubMenu]' && m.visualizar) {
    //   // subNegocio.push({ titulo: 'Links de tu Tienda', url: 'market-links' });
    //   // subNegocio.push({ titulo: 'Configuración del negocio', url: 'negocio' });
    //   // subNegocio.push({ titulo: 'Configuración de la tienda', url: 'config-market-user' });
    //   // subNegocio.push({ titulo: 'Configuración de la Página de bienvenida', url: 'config-welcome' });
    //   // subNegocio.push({ titulo: 'Configuración de página web', url: 'config-landing' });
    //   // subNegocio.push({ titulo: 'Configuración de Sedes y Whatsapp', url: 'whatsapp-web-config' });
    //   // subNegocio.push({ titulo: 'Suscripción', url: 'suscripcion' });
    // }

  });

  return menu;
}

export const getAdminMenu = () => {

  let menu: any[] = [];

  menu = [
    {
      titulo: 'Administrativo',
      icono: 'fas fa-tachometer-alt',
      submenu: [
        { titulo: 'Dashboard', url: '' },
        { titulo: 'Negocios', url: 'negocios' },
      ]
    }
  ];

  return menu;

}
