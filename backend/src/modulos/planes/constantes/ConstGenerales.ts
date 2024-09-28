export const REF_PLANES = 'col_planes';

export const LOGO =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-biod/o/logo.webp?alt=media&token=a2d23927-3333-4beb-879c-db955b680596'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket-biod/o/logo.webp?alt=media&token=52e5f418-31b4-4441-a2da-117f10c3f12a';

export const ROLES_PLANES = ['soporte-app', 'administrador'];
export const FECHAS_FILTROS = [
  'fechaAsigInicio',
  'fechaCompInicial',
  'fechaEjeInicial',
];
