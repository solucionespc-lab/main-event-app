import { gql } from 'graphql-tag';

const BackOfficeSchema = gql`
  input InfoContratistaInput {
    id: Int
    nombreContratista: String
    cedulaNit: String
    tipo_proveedor: String
    clasificacion_proveedor: String
    estado: Boolean
    responsable: ResponsableInput
  }

  input ResponsableInput {
    responsable_correo: String
    responsable_cargo: String
    responsable_nombre: String
    responsable_telefono: String
  }

  extend type Query {
    extraerDatos: String
    extraerDatoContratistas: String
    extraerDatosComerciales: String
    extraerDatosContractuales: String
  }

  extend type Mutation {
    saveBOContratistas(BOContratistaInput: [InfoContratistaInput]): String
  }
`;

export default BackOfficeSchema;
