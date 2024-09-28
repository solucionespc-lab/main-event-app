import { allow } from 'graphql-shield';

const planesQueries = {
  getPlanesAccion: allow,
  getPlan: allow,
};

const planesMutations = {
  savePlanesAccion: allow,
};

export { planesMutations, planesQueries };
