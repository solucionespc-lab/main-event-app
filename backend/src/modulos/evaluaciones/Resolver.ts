import {
  traerAuditoria,
  traerEvaluacionCalidad,
  traerEvaluacionContratual,
} from './resolvers/Queries';

const EvaluacionResolver = {
  Query: {
    getEvaAuditoria: traerAuditoria,
    getEvaCalidad: traerEvaluacionCalidad,
    getEvaContractual: traerEvaluacionContratual,
  },
};

export default EvaluacionResolver;
