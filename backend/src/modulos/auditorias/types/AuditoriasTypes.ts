export interface AuditoriaInput {
  auditado: boolean;
  autidorInspector: string;
  contratista: string;
  correo: string;
  criterio: string;
  cedulaNitContratista: string;
  fecha: string;
  idAuditoria?: string;
  idContratista: string;
  objetivo: string;
  preguntasAuditoria: PreguntaAuditoriaInput[];
  procesoCliente: string;
  temasAuditoria: TemaType[];
  tipo: string;
  totalAuditoria: number;
  plan: {
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
  };
}

export interface AuditoriaType {
  auditado: boolean;
  autidorInspector: string;
  contratista: string;
  criterio: string;
  cedulaNitContratista: string;
  fecha: string;
  id: string;
  idContratista: string;
  objetivo: string;
  preguntasAuditoria: PreguntaAuditoria[];
  procesoCliente: string;
  temas: TemaType[];
  temasAuditoria: TemaType[];
  tipo: string;
  totalAuditoria: number;
}

export interface FiltrosAuditoria {
  auditado?: string;
  criterio: string;
  fechaFin: string;
  fechaInicio: string;
  idContratista?: string;
}
export interface PreguntaAuditoria {
  codigoPregunta: string;
  respuesta: string;
  observaciones: string;
  descripcion: string;
  puntaje: number;
}

export interface PreguntaAuditoriaInput {
  codigoPregunta: string;
  respuesta: string;
  observaciones: string;
  descripcion: string;
  puntaje: number;
}

export interface TemaType {
  codigo: string;
  ponderado: number;
  tipo: string;
}
