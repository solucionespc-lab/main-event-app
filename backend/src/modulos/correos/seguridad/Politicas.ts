import { allow } from 'graphql-shield';

const correosQueries = {
  getCorreos: allow,
};

const correoMutations = {
  saveCorreos: allow,
};

export { correoMutations, correosQueries };
