export interface IFiltroTrabajadorContratista {
  activo: string;
  identificacion: string;
  identificacionContratista: string;
  porVencer: string;
  vencido: string;
}

export interface IFiltroInformeOcupacionalContratista {
  gerenciasDeUsuario: string[];
  gerencia?: string;
  year: number;
}

export type RedisJSON =
  | null
  | boolean
  | number
  | string
  | Date
  | RedisJSONObject;
export interface RedisJSONObject {
  [key: string]: RedisJSON;
}

export interface IRedisInput {
  key: string;
  value: RedisJSON;
}

export interface IinputTrabajadorContratista {
  activo: boolean;
  cargo: string;
  ciudadExpedicion: string;
  ciudadResidencia: string;
  codigoCiudadExpedicion: string;
  codigoCiudadResidencia: string;
  departamentoExpedicion: string;
  departamentoResidencia: string;
  direccion: string;
  fechaIngreso: string;
  fechaNacimiento: string;
  fechaRetiro: string;
  genero: string;
  identificacion: string | number;
  identificacionContratista: string;
  idInternoExterno: string;
  idTrabajador?: string;
  nombreTrabajador: string;
  rh: string;
  tipoIdentificacion: string;
  tipoSangre: string;
}

export interface IinputOcupacionalContratista {
  id?: string;
  idTrabajador: string;
  fechaIngresoCargo: string;
  fechaRetiroCargo: string;
  fechaIngresoEmp: string;
  fechaRetiroEmp: string;
  genero: string;
  cargo: string;
  gerencia: string;
  proceso: string;
  turno: string;
  jefeInmediato: string;
  correo: string;
  tipoContrato: string;
}

export interface IFiltroSociodemograficoYResumen {
  gerenciasDeUsuario: string[];
  gerencia?: string;
  proceso?: string;
  cargo?: string;
  turno?: string;
  year: number;
}

export interface IinputHistorial {
  id?: string;
  idTrabajador: string;
  cedulaTrabajador: string;
  identificacionContratista: string;
  estadoInduccion: string;
  datosTrabajadorHistoria: IDatosTrabajadorHistoria[];
  actosInsegurosFecha: string;
  actosInsegurosDescrip: string;
  actosInsegurosIdentificacion: string;
  actosAccidentesFecha: string;
  actosAccidentesDescrip: string;
  actosAccidentesIdentificacion: string;
}

export interface TypeHistorial {
  id: string;
  cedulaTrabajador: string;
  idTrabajador: string;
  identificacionContratista: string;
  estadoInduccion: string;
  datosTrabajadorHistoria: IDatosTrabajadorHistoria[];
  actosInsegurosFecha: string;
  actosInsegurosDescrip: string;
  actosInsegurosIdentificacion: string;
  actosAccidentesFecha: string;
  actosAccidentesDescrip: string;
  actosAccidentesIdentificacion: string;
}

export interface IDatosTrabajadorHistoria {
  id?: string;
  codigo: string;
  fechaToma: string;
  fechaVencimiento: string;
  evidencias: IEvidencia[];
  periodoVigencia: number;
}

export interface IfiltrosCursos {
  idContratista: string;
  idTrabajador: string;
  codigo: string;
  fechaTomaA: string;
  fechaTomaB: string;
  fechaVencimientoA: string;
  fechaVencimientoB: string;
}

export interface IEvidencia {
  url: string;
  nombre: string;
}

export interface Ietiquetado {
  label: string;
  value: number;
}
export interface IinformeOcupacionalReturned {
  antiguedad: {
    masculino: Ietiquetado[];
    femenino: Ietiquetado[];
  };
  cargo: Ietiquetado[];
  proceso: Ietiquetado[];
  gerencia: Ietiquetado[];
  tipoContrato: Ietiquetado[];
  turno: Ietiquetado[];
  totalTrabajadores: number;
  tipoGerencia?: string;
  year?: number;
}

export interface IDatosEventualidad {
  id?: string;
  descripcion: string;
  fecha: string;
  identificacion: string;
  tipo: string;
  year: number;
  codigo: string;
}

export interface IfiltrosEventualidades {
  fechaA: string;
  fechaB: string;
  idContratista: string;
  idTrabajador: string;
  year: number;
  tipo: string;
  codigo: string;
}

export interface IinformeSociodemograficoReturned {
  edad: {
    masculino: Ietiquetado[];
    femenino: Ietiquetado[];
  };
  estadoCivil: Ietiquetado[];
  numHijos: Ietiquetado[];
  nivelEducativo: Ietiquetado[];
  profesion: Ietiquetado[];
  tipoGerencia?: string;
  totalTrabajadores: number;
  year?: number;
}

export interface IarregoMedidas {
  edadGeneral: number[];
  antiguedadGeneral: number[];
  edadMasculino: number[];
  antiguedadMasculino: number[];
  edadFemenino: number[];
  antiguedadFemenino: number[];
}
