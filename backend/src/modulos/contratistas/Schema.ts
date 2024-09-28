import { gql } from 'graphql-tag';

const ContratistasSchema = gql`
  type Contratista {
    id: String
    nombreContratista: String
    cedulaNit: String
    tipo_proveedor: String
    clasificacion_proveedor: String
    estado: Boolean
    responsable: Responsable
  }

  type Responsable {
    responsable_correo: String
    responsable_cargo: String
    responsable_nombre: String
    responsable_telefono: String
  }

  input ContratistasFiltrosInput {
    cantidadTrabajadores: String
    idContratista: String
    porVencer: Boolean
    vencimiento: Boolean
    tipoContratista: String
  }

  extend type Query {
    getContratista(id: ID!): Contratista
    getContratistas(filtros: ContratistasFiltrosInput!): [Contratista]
    getSeguridadSocial(
      year: Int
      idContratista: String
    ): [DatosTrabajadorHistoria]
  }
`;

export default ContratistasSchema;
