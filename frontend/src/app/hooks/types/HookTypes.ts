export interface CodigoTema {
  TEMA001: 'TEMA001';
  TEMA002: 'TEMA002';
  TEMA003: 'TEMA003';
  TEMA004: 'TEMA004';
}

export type SessionType = {
  [key: string]: string | null;
};

interface CantidadTrabajadores {
  code: string;
  value: string;
}

interface Generico {
  id: string;
  value: string;
}

interface CategoriaCumplimiento {
  codigo: string;
  ponderado: number;
  tipo: string;
}

interface ClasificacionProveedor {
  codigo: string;
  tipo: string;
}

interface DiasHabilesSeguridad {
  diaHabil: number;
  ultimosDigitosA: number | string;
  ultimosDigitosB: number | string;
}

interface EvaluacionProveedores {
  codigo: string;
  codigoTema: string;
  nombreTema: string;
  descripcion: string;
}

interface AuditoriaPregType {
  descripcion: string;
  respuesta: string;
  observaciones: string;
  codigoPregunta: string;
  puntaje: number;
  tema: string;
}

interface Meses {
  codigo: string;
  mes: number;
  tipo: string;
}

interface PuntajeEvaluar {
  codigo: string;
  puntaje: number;
  tipo: string;
}

interface TemasEvaluaciones {
  codigoTema: CodigoTema;
  descripcion: string;
  ponderado: number;
}

interface Temas {
  codigo: string;
  periodoVigencia: string;
  tipo: string;
}

interface ResponsablesPlan {
  codigo: string;
  value: string;
}
interface ListadoDane {
  ciudad: string;
  codigo: string;
  codigoDane: string;
  departamento: string;
}

interface programa {
  codigo: string;
  descripcion: string;
  tipoEvaluacion: string;
  nombreTema: string;
  normativa: string;
}

export interface Listas {
  cantidadTrabajadores: Record<string, CantidadTrabajadores>;
  categoriaCumplimiento: Record<string, CategoriaCumplimiento>;
  clasificacionProveedor: Record<string, ClasificacionProveedor>;
  diasHabilesSeguridad: Record<string, DiasHabilesSeguridad>;
  estadoInduccion: Record<string, ClasificacionProveedor>;
  estados: Record<string, ClasificacionProveedor>;
  evaluacionProveedores: Record<string, EvaluacionProveedores>;
  listaOrigen: Record<string, ClasificacionProveedor>;
  listaOrigenPlanes: Record<string, ClasificacionProveedor>;
  meses: Record<string, Meses>;
  EVA01: Record<string, AuditoriaPregType>;
  EVA02: Record<string, AuditoriaPregType>;
  EVA03: Record<string, AuditoriaPregType>;
  EVA04: Record<string, AuditoriaPregType>;
  puntajeEvaluar: Record<string, PuntajeEvaluar>;
  servicios: Record<string, ClasificacionProveedor>;
  tipoEvaluacion: Record<string, ClasificacionProveedor>;
  temasAuditoria: Record<string, CategoriaCumplimiento>;
  tipoContratista: Record<string, ClasificacionProveedor>;
  temasEvaluaciones: Record<string, TemasEvaluaciones>;
  temasEventos: Record<string, Temas>;
  temasHistorialTrabajador: Record<string, Temas>;
  temasPlan: Record<string, CategoriaCumplimiento>;
  tipoAuditoria: Record<string, ClasificacionProveedor>;
  tipoBien: Record<string, ClasificacionProveedor>;
  tipoCriterio: Record<string, ClasificacionProveedor>;
  tipoGenero: Record<string, ClasificacionProveedor>;
  tipoID: Record<string, ClasificacionProveedor>;
  tipoProveedor: Record<string, ClasificacionProveedor>;
  tipoRH: Record<string, ClasificacionProveedor>;
  tipoSangre: Record<string, ClasificacionProveedor>;
  RH: Record<string, string>;
  cargos: Record<string, Generico>;
  contratos: Record<string, Generico>;
  enumerador: Record<string, { [key: string]: string }>;
  estadoCivil: Record<string, Generico>;
  genero: Record<string, ListadoType>;
  gerencias: Record<string, ListadoType>;
  grupoSanguineo: Record<string, ListadoType>;
  nivelEducativo: Record<string, ListadoType>;
  procesos: Record<string, ListadoType>;
  profesiones: Record<string, ListadoType>;
  turnos: Record<string, ListadoType>;
  listaDane: Record<string, ListadoDane>;
  programas: Record<string, programa>;
}

export interface ListadosType {
  responsables: Record<string, ResponsablesPlan>;
  listas: Listas;
}
