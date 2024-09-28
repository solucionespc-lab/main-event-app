interface ResponsableType {
  cargo: string;
  correo: string;
  nombre: string;
  telefono: string;
}

interface ServicioType {
  codigoServicio: string;
  cuentaConServicio: boolean;
  cualOtroServicio: string;
}

export interface InfoContratista {
  cedulaNit: string;
  id: number;
  nombreContratista: string;
  responsable: ResponsableType;
  servicio: ServicioType;
  tipoContratista: string;
  idContratista: string;
}

export interface BOContratistaType {
  cedulaNit: string;
  id: number;
  nombreContratista: string;
  clasificacion_proveedor: string;
  tipo_proveedor: string;
  estado: boolean;
  responsable: {
    responsable_cargo: string;
    responsable_correo: string;
    responsable_nombre: string;
    responsable_telefono: string;
  };
}

export interface BOContratistaParams {
  BOContratistaInput: BOContratistaType[];
}

export interface PlantillasCorreoArgs {
  plantilla: {
    subject: string;
    html: string;
    nombreplantilla: string;
  };
}

export interface PlantillaOBj {
  subject: string;
  html: string;
}

export type ContAlgoliaType =
  | {
      objectID: string;
      cedulaNit: string;
      id: number;
      nombreContratista: string;
      clasificacion_proveedor: string;
      tipo_proveedor: string;
      estado: boolean;
      responsable: {
        responsable_cargo: string;
        responsable_correo: string;
        responsable_nombre: string;
        responsable_telefono: string;
      };
    }[]
  | never[];
