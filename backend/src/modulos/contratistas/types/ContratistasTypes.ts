export interface ContratistaInput {
  cedulaNit: string;
  id?: string;
  nombreContratista: string;
  otroServicio: string;
  responsables: ResponsableInput[];
  servicios: ServicioInput[];
}

export interface ContratistaInputAlgolia {
  cedulaNit: string;
  id?: string;
  nombreContratista: string;
  otroServicio: string;
  responsables?: ResponsableInput[];
  servicios?: ServicioInput[];
  tipoContratista: string;
}

export interface ContratistasFiltros {
  tipoContratista: string;
  idContratista: string;
}

export interface ContratistaTablaType {
  cedulaNit: string;
  id?: string;
  nombreContratista: string;
  nombreResponsable: string;
  tipoContratista: string;
}

export interface ContratistaType {
  cedulaNit: string;
  id?: string;
  nombreContratista: string;
  otroServicio: string;
  responsables: ResponsableInput[];
  servicios: ServicioInput[];
  tipoContratista: string;
}

export interface ResponsableInput {
  cargo: string;
  correo: string;
  nombre: string;
  telefono: string;
}

export interface ResponsableType {
  cargo: string;
  correo: string;
  nombre: string;
  telefono: string;
}

export interface ServicioInput {
  codigo: string;
  value: boolean;
}

export interface ServicioType {
  codigo: string;
  value: boolean;
}
