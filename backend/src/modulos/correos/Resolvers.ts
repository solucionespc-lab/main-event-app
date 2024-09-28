import { modificarCorreos } from './resolvers/Mutations';
import { traerCorreos } from './resolvers/Queries';

const CorreosResolver = {
  Query: {
    getCorreos: traerCorreos,
  },
  Mutation: {
    saveCorreos: modificarCorreos,
  },
};

export default CorreosResolver;
