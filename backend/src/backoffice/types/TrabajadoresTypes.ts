interface IEvidencia {
  url: string;
  nombre: string;
}

interface histOcuContratistaType {
  id?: string;
  codigo: string;
  fechaToma: string;
  fechaVencimiento: string;
  evidencias: IEvidencia[];
  periodoVigencia: number;
}

export interface TrabajadoresType {
  cedula: string;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  estadoCivil: string;
  numHijos: string;
  nivelEducativo: string;
  profesion: string;
  procesoActual: string;
  gerencia: string;
  nombreContacto: string;
  numContacto: string;
  grupoSanguineo: string;
  rh: string;
  correo: string;
  turnoActual: string;
  cargo: string;
  jefeInmediato: string;
  tipoContrato: string;
  fechaIngresoEmp: string;
}

export interface BOTrabParams {
  BOTrabajadoresInput: TrabajadoresType[];
}

export interface trabContratistaType {
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

export interface historialContratistaType {
  id: string;
  cedulaTrabajador: string;
  idTrabajador: string;
  identificacionContratista: string;
  estadoInduccion: string;
  actosInsegurosFecha: string;
  actosInsegurosDescrip: string;
  actosInsegurosIdentificacion: string;
  actosAccidentesFecha: string;
  actosAccidentesDescrip: string;
  actosAccidentesIdentificacion: string;
}

export type datosTrabajadorHistoria = histOcuContratistaType[];

export interface BOTrabContratistasParams {
  BOTrabContratistasInput: trabContratistaType[];
}
