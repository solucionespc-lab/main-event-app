import { gql } from 'graphql-tag';

const AuditoriaesSchema = gql`
  type AuditoriaType {
    auditado: Boolean
    auditorInspector: String
    cargoAuditor: String
    contratista: String
    correo: String
    criterio: String
    cedulaNitContratista: String
    fecha: String
    temasAuditoria: [TemaType]
    idAuditoria: String
    idContratista: String
    nombreAuditado: String
    objetivo: String
    preguntasAuditoria: [PreguntaAuditoria]
    procesoCliente: String
    tipo: String
    totalAuditoria: Float
    tipoAuditoria: String
    duenoProceso: String
    programa: String
    tipoEvaluacion: String
    firma: FirmaType
    plan: Planes
  }

  type FirmaType {
    nombre: String
    url: String
  }

  type TemaType {
    codigo: String
    tipo: String
    ponderado: Int
  }

  type PreguntaAuditoria {
    codigoPregunta: String
    respuesta: String
    observaciones: String
    descripcion: String
    puntaje: Float
  }

  input AuditoriaInput {
    auditado: Boolean
    cargoAuditor: String
    auditorInspector: String
    contratista: String
    correo: String
    criterio: String
    fecha: String
    idAuditoria: String
    cedulaNitContratista: String
    idContratista: String
    nombreAuditado: String
    objetivo: String
    temasAuditoria: [TemaInput]
    preguntasAuditoria: [PreguntaAuditoriaInput]
    procesoCliente: String
    tipo: String
    totalAuditoria: Float
    tipoAuditoria: String
    duenoProceso: String
    programa: String
    tipoEvaluacion: String
    firma: FirmaInput
    plan: PlanInput
  }

  input FirmaInput {
    nombre: String
    url: String
  }

  input TemaInput {
    codigo: String
    tipo: String
    ponderado: Int
  }

  input PreguntaAuditoriaInput {
    codigoPregunta: String
    respuesta: String
    observaciones: String
    descripcion: String
    puntaje: Float
  }

  input FiltrosAuditoriaInput {
    auditado: String
    fechaFin: String
    criterio: String
    fechaInicio: String
    idContratista: String
  }

  extend type Mutation {
    saveAuditoria(auditoria: AuditoriaInput): String
  }

  extend type Query {
    getAuditoria(id: String, idContratista: String): AuditoriaType
    getAuditorias(filtros: FiltrosAuditoriaInput): [AuditoriaType]
  }
`;

export default AuditoriaesSchema;
