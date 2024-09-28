import { gql } from 'graphql-tag';

const EvaluacionesSchema = gql`
  type EvaluacionType {
    aspectosEvaluar: [AspectosEvaluarType]
    cedulaNit: String
    clasificacionContratista: String
    nombreEvaluador: String
    descripcioncompra: String
    fechaElaboracion: String
    fechaPeriodoEvaluarFin: String
    fechaPeriodoEvaluarInicio: String
    id: String
    idContratista: String
    nombreContratista: String
    observaciones: String
    tipoBienCompra: String
    tipodeCompra: String
    tipoContratista: String
    totalEvaluacion: Float
    interpretacion: String
  }

  type AspectosEvaluarType {
    preguntaCodigo: String
    puntaje: Int
  }

  input FiltrosEva {
    idBaseDatos: String
    idContratista: String
    fechaInicio: String
    fechaFinal: String
    idCompra: String
  }

  extend type Query {
    getEvaAuditoria(filtros: FiltrosEva): [AuditoriaType]
    getEvaCalidad(filtros: FiltrosEva): [EvaluacionType]
    getEvaContractual(filtros: FiltrosEva): [EvaluacionType]
  }
`;

export default EvaluacionesSchema;
