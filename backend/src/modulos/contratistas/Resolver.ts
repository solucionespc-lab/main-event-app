import {
  traerContratista,
  traerContratistas,
  traerSeguridadSocial,
} from './resolvers/Queries';

const ContratistasResolver = {
  Query: {
    getSeguridadSocial: traerSeguridadSocial,
    getContratistas: traerContratistas,
    getContratista: traerContratista,
  },
};

export default ContratistasResolver;
