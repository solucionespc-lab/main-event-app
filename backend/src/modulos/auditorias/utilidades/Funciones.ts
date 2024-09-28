import { RANGOS_CALIFICACIONES } from '../constantes/ConstAuditorias';

export const transformarCaliAuditorias = (calificacion: number) => {
  for (const rango of RANGOS_CALIFICACIONES) {
    if (calificacion >= rango.min) {
      return rango.valor;
    }
  }

  return 1;
};
