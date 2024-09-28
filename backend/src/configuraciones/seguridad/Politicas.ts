import { allow } from 'graphql-shield';

const configQueriesRules = {
  getConfiguraciones: allow,
};

export { configQueriesRules };
