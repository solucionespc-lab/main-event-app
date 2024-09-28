import { gql } from 'graphql-tag';

const PlanesAccionSchema = gql`
  type Planes {
    aprobacion: Boolean
    codigoItem: String
    estado: String
    fechaAsignacion: String
    fechaCompromiso: String
    fechaEjecucion: String
    id: ID
    origen: String
    idContratista: String
    nombreContratista: String
    cedulaNitContratista: String
    correo: String
    descripcion: String
    responsable: String
    tema: String
    fechaPrimerPlazo: String
    fechaSegundoPlazo: String
    fechaTercerPlazo: String
  }

  input PlanInput {
    idContratista: ID
    id: ID
    aprobacion: Boolean
    estado: String
    fechaAsignacion: String
    fechaCompromiso: String
    fechaEjecucion: String
    descripcion: String
    responsable: String
    tema: String
    origen: String
    nombreContratista: String
    cedulaNitContratista: String
    correo: String
    fechaPrimerPlazo: String
    fechaSegundoPlazo: String
    fechaTercerPlazo: String
  }

  input FiltrosPlanesInput {
    origen: String
    fechaAsigInicio: String
    fechaAsigFinal: String
    fechaCompInicial: String
    fechaCompFinal: String
    fechaEjeInicial: String
    fechaEjeFinal: String
    responsable: String
    idContratista: String!
    estado: String
  }

  extend type Query {
    getPlanesAccion(filtros: FiltrosPlanesInput): [Planes]
    getPlan(idPlan: ID!): Planes
  }

  extend type Mutation {
    savePlanesAccion(plan: PlanInput): String
  }
`;

export default PlanesAccionSchema;
