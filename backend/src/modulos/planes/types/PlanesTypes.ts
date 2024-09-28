export interface PlanTypes {
  aprobacion: boolean;
  codigoItem: string;
  estado: string;
  fechaAsignacion: string;
  fechaCompromiso: string;
  fechaEjecucion: string;
  id: string;
  idOrigen: string;
  idContratista: string;
  nombreContratista: string;
  cedulaNitContratista: string;
  origen: string;
  descripcion: string;
  responsable: string;
  tema: string;
  correo: string;
}

export interface Filtro {
  origen: string;
  fechaAsigInicio: string;
  fechaAsigFinal: string;
  fechaCompInicial: string;
  fechaComFinal: string;
  fechaEjeInicial: string;
  fechaEjeFinal: string;
  responsable: string;
  idContratista?: string;
  estado: string;
}

export type FiltrosType = {
  filtros: Filtro;
};

export interface PlanTypesInput {
  plan: PlanTypes;
}
