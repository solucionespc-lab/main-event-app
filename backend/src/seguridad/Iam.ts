import { IamType } from '../seguridad/types/SeguridadTypes';

const access: IamType = {
  version: '1.2.0',
  grupos: {
    propietario: {
      roles: ['superadministrador'],
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      privilegios: '0:012345678:0123',
      organizacion: 'Terpel',
    },
    cliente: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['administrador', 'dirección', 'regional', 'sin regional'],
      privilegios: '0:01234567:3',
      organizacion: 'Terpel',
    },
    proveedor: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['coordinación', 'regional', 'sin regional'],
      privilegios: '0:012348:3',
      organizacion: 'Terpel-externo',
    },
    soporte: {
      firmas: ['yr5fS3jQTA94', 'aEqj4MY56xyk', '4N349Qxj6Cn4', '4gj3CyJu9tb6'],
      roles: ['soporte-app', 'soporte-cloud'],
      privilegios: '0:012345678:0123',
      organizacion: 'Soluciones PC',
    },
  },
  modulos: {
    0: 'contratistas',
    1: 'ordenes',
    2: 'requisitos',
    3: 'usuarios',
  },
  acciones: {
    aplicacion: [
      'leer',
      'escribir',
      'aprobar',
      'cargarArchivos',
      'descargarArchivos',
    ],
    infraestructura: [
      'crearTokens',
      'crearUsuarios',
      'llamar',
      'configuracion',
    ],
  },
};

export default access;
