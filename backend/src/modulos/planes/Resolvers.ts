import { guardarPlanAccion } from './resolvers/Mutations';
import { traerPlanAccion, traerPlanesAccion } from './resolvers/Queries';

const PlanesResolver = {
  Query: {
    getPlanesAccion: traerPlanesAccion,
    getPlan: traerPlanAccion,
  },
  Mutation: {
    savePlanesAccion: guardarPlanAccion,
  },
};

export default PlanesResolver;
