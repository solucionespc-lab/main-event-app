import { guardarAuditoria } from './resolvers/Mutations';
import { traerAuditoria, traerContratistas } from './resolvers/Queries';

const AuditoriaResolver = {
  Query: {
    getAuditoria: traerAuditoria,
    getAuditorias: traerContratistas,
  },
  Mutation: {
    saveAuditoria: guardarAuditoria,
  },
};

export default AuditoriaResolver;
