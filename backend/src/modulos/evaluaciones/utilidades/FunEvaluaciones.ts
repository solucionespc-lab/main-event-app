import { AspectosEvaluarType } from '../types/EvaluacionesTypes';

export const interCalificacion = (evaluaciones: AspectosEvaluarType[]) => {
  const puntajes = evaluaciones.map((eva) => eva.puntaje);
  const maximoPuntaje = Math.max(...puntajes);

  const numerador = evaluaciones.reduce(
    (calificacion, evaluacion) => calificacion + evaluacion.puntaje,
    0
  );
  const denominador =
    maximoPuntaje === 0 ? 1 : maximoPuntaje * evaluaciones.length;
  const resultado = (numerador / denominador) * 100;

  let interpretacion = 'Sin_evaluar';

  if (resultado > 0 && resultado < 60) {
    interpretacion = 'Critico';
  }

  if (resultado >= 60 && resultado < 85) {
    interpretacion = 'Moderable';
  }

  if (resultado >= 85) {
    interpretacion = 'Aceptable';
  }

  return { totalEvaluacion: resultado, interpretacion };
};
