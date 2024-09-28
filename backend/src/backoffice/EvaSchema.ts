import { gql } from 'graphql-tag';

const EvaluacionesBOSchema = gql`
  input AspectosEvaluar {
    preguntaCodigo: String
    puntaje: Int
  }

  input EvaluacionesInput {
    fechaElaboracion: String
    fechaPeriodoEvaluarInicio: String
    fechaPeriodoEvaluarFin: String
    cedulaNit: String
    nombreContratista: String
    tipoContratista: String
    clasificacionContratista: String
    tipodeCompra: String
    tipoBienCompra: String
    descripcioncompra: String
    observaciones: String
    nombreEvaluador: String
    cargo: String
    id: String
    idContratista: String
    aspectosEvaluar: [AspectosEvaluar]
    tipoEvaluacion: String
    estadoEva: String
  }

  extend type Mutation {
    saveBOEvaCalidad(BOEvaluacionesInput: [EvaluacionesInput]): String
    saveBOEvaContractual(BOEvaluacionesInput: [EvaluacionesInput]): String
  }
`;

export default EvaluacionesBOSchema;
