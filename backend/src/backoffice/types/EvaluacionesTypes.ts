interface AspectosEvaluar {
  preguntaCodigo: string;
  puntaje: number;
}

interface DatosEvaluador {
  cargoEvaluador: string;
  nombreEvaluador: string;
}

export interface EvaluacionesInput {
  fechaElaboracion: string;
  fechaPeriodoEvaluarInicio: string;
  fechaPeriodoEvaluarFin: string;
  cedulaNit: string;
  nombreContratista: string;
  tipoContratista: string;
  clasificacionContratista: string;
  tipodeCompra: string;
  tipoBienCompra: string;
  descripcioncompra: string;
  observaciones: string;
  nombreEvaluador: string;
  cargo: string;
  id: string;
  idContratista: string;
  aspectosEvaluar: AspectosEvaluar[];
}

export interface AspectosEvaluarOutput {
  preguntaCodigo: string;
  puntaje: number;
  codigoPuntaje: string;
}

export interface AspectosEvaluarType {
  preguntaCodigo: string;
  puntaje: number;
}

export interface EvaluacionOutput {
  id?: string;
  idContratista: string;
  aspectosEvaluar: AspectosEvaluarOutput[];
  cedulaNit: string;
  clasificacionContratista: string;
  datosEvaluador: DatosEvaluador;
  descripcionCompra: string;
  fechaPeriodoEvaluarFinal: string;
  fechaElaboracion: string;
  fechaPeriodoEvaluarInicio: string;
  nombreContratista: string;
  observaciones: string;
  tipoBienCompra: string;
  tipoCompra: string;
  tipoContratista: string;
  totalEvaluacion: number;
  interpretacion: string;
}

export interface EvaParams {
  BOEvaluacionesInput: EvaluacionesInput[];
}
