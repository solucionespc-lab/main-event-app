import { allow } from 'graphql-shield';

const contratistaQueries = {
  getContratistas: allow,
  getContratista: allow,
  getSeguridadSocial: allow,
};

const contratistaMutations = {
  saveContratista: allow,
  saveSeguridadSocial: allow,
};

const auditoriasMutations = {
  saveAuditoria: allow,
};

const auditoriasQueries = {
  getAuditoria: allow,
  getAuditorias: allow,
};

const evaluacionesQueries = {
  getEvaAuditoria: allow,
  getEvaCalidad: allow,
  getEvaContractual: allow,
};

const trabajadoresContratistaQueries = {
  getCursos: allow,
  getEventualidades: allow,
  getTrabajadorContratista: allow,
  getTrabajadoresContratista: allow,
  getHistorialTrabajador: allow,
};

const trabajadoresContratistaMutations = {
  importHistorialTrabajador: allow,
  importTrabajadoresContratista: allow,
  saveHistorialTrabajador: allow,
  saveTrabajadorContratista: allow,
  trabajadoresContratistasAlistas: allow,
  saveCursos: allow,
  saveEventualidad: allow,
};

export {
  trabajadoresContratistaMutations,
  trabajadoresContratistaQueries,
  evaluacionesQueries,
  auditoriasMutations,
  auditoriasQueries,
  contratistaMutations,
  contratistaQueries,
};
