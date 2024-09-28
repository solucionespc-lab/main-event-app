export const REF_AUDITORIAS = 'col_auditorias';
export const REF_CONTRATISTAS = 'col_contratistas';
export const ORIGEN_PLANES_AUDITORIAS = 'O01';
export const PLANES_REF_AUDITORIA = 'col_planes';

export const LOGO =
  process.env.APP_ENV !== 'development'
    ? 'https://firebasestorage.googleapis.com/v0/b/internal-bucket-biod/o/logo.webp?alt=media&token=a2d23927-3333-4beb-879c-db955b680596'
    : 'http://127.0.0.1:9199/v0/b/internal-bucket-biod/o/logo.webp?alt=media&token=52e5f418-31b4-4441-a2da-117f10c3f12a';

export const RANGOS_CALIFICACIONES = [
  { min: 0.94, valor: 5 },
  { min: 0.86, valor: 4 },
  { min: 0.7, valor: 3 },
  { min: 0.5, valor: 2 },
  { min: 0, valor: 1 },
];
