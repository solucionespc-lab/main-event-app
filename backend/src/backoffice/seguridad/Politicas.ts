import { allow } from 'graphql-shield';

const backOfficeMutationsRules = {
  saveBOContratistas: allow,
  saveBOTrabajadores: allow,
  saveBOTrabContratistas: allow,
  saveBOEvaCalidad: allow,
  saveBOEvaContractual: allow,
  saveUsuario: allow,
};

const backOfficeQueriesRules = {
  extraerDatos: allow,
  extraerDatoContratistas: allow,
  extraerDatosContractuales: allow,
  extraerDatosComerciales: allow,
  getUsuarios: allow,
};

export { backOfficeMutationsRules, backOfficeQueriesRules };
