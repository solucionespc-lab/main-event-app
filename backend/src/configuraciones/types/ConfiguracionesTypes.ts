interface IAM {
  version: string;
  acciones: {
    [key: string]: string[];
  };
  modulos: {
    descripcion: string;
    titulo: string;
    url: string;
    subGrupo: string;
    responsable: string;
    imagen: string;
    estaActivo: boolean;
    llaveModulo: string;
  }[];
}

export interface ConfiguracionesType {
  iam: IAM;
  responsablesPlan: string;
  listas: string;
}
