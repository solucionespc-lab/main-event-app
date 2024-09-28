import { lazy } from 'react';

export const componentes = {
  roles: lazy(() => import('@/app/interfaz/modulos/seleccion-rol/page')),
  comprar: lazy(() => import('@/app/interfaz/modulos/comprar-ticket/page')),
  crear: lazy(() => import('@/app/interfaz/modulos/crear-evento/page')),
  eventos: lazy(() => import('@/app/interfaz/modulos/eventos/page')),
  logistica: lazy(() => import('@/app/interfaz/modulos/logistica/page')),
};
