import { gql } from 'graphql-tag';

const ConfigSchema = gql`
  type Acciones {
    aplicacion: [String]
    infraestructura: [String]
  }

  type Modulos {
    descripcion: String
    titulo: String
    url: String
    subGrupo: String
    responsable: String
    imagen: String
    estaActivo: Boolean
    llaveModulo: String
  }

  type Configuraciones {
    acciones: Acciones
    modulos: [Modulos]
    responsablesPlan: String
    listas: String
  }

  extend type Query {
    getConfiguraciones: Configuraciones
  }
`;

export default ConfigSchema;
