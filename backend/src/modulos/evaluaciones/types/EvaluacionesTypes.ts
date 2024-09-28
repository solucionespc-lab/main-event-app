export interface TemaType {
  codigoTema: string;
  ponderado: number;
  descripcion: string;
}

export interface AspectosEvaluarInput {
  preguntaCodigo: string;
  puntaje: number;
}

export interface AspectosEvaluarType {
  preguntaCodigo: string;
  puntaje: number;
}

export interface EvaluacionInput {
  id?: string;
  idContratista: string;
  aspectosEvaluar: AspectosEvaluarType[];
  cedulaNit: string;
  clasificacionContratista: string;
  nombreEvaluador: string;
  descripcioncompra: string;
  fechaPeriodoEvaluarFin: string;
  fechaElaboracion: string;
  fechaPeriodoEvaluarInicio: string;
  nombreContratista: string;
  observaciones: string;
  tipoBienCompra: string;
  tipodeCompra: string;
  tipoContratista: string;
  totalEvaluacion: number;
}

export interface EvaluacionType {
  id?: string;
  idContratista: string;
  aspectosEvaluar: AspectosEvaluarType[];
  cedulaNit: string;
  clasificacionContratista: string;
  nombreEvaluador: string;
  descripcioncompra: string;
  fechaPeriodoEvaluarFin: string;
  fechaElaboracion: string;
  fechaPeriodoEvaluarInicio: string;
  nombreContratista: string;
  observaciones: string;
  tipoBienCompra: string;
  tipodeCompra: string;
  tipoContratista: string;
  totalEvaluacion: number;
}

export interface DatosEvaluadorInput {
  cargoEvaluador: string;
  nombreEvaluador: string;
}

export interface DatosEvaluadorType {
  cargoEvaluador: string;
  nombreEvaluador: string;
}

export interface FiltrosEvaType {
  filtros: {
    idBaseDatos: string;
    idContratista: string;
    fechaInicio: string;
    fechaFinal: string;
    idCompra: string;
  };
}
