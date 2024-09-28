import {
  BulkContratistas,
  BulkEvaComercial,
  BulkEvaContractual,
  BulkTrabajadores,
  BulkTrabContratistas,
  guardarUsuario,
} from './resolvers/Mutations';
import {
  plantillaEvaComerciales,
  plantillaEvaContractuales,
  traerUsuario,
  traerUsuarios,
} from './resolvers/Queries';
import {
  extraerDatosTrabContratistas,
  extraerDatosTrabajadores,
} from './utilidades/Funciones';

const BackOfficeResolver = {
  Query: {
    extraerDatos: extraerDatosTrabajadores,
    extraerDatoContratistas: extraerDatosTrabContratistas,
    extraerDatosComerciales: plantillaEvaComerciales,
    extraerDatosContractuales: plantillaEvaContractuales,
    getUsuarios: traerUsuarios,
    getUsuario: traerUsuario,
  },
  Mutation: {
    saveBOContratistas: BulkContratistas,
    saveBOTrabajadores: BulkTrabajadores,
    saveBOTrabContratistas: BulkTrabContratistas,
    saveBOEvaCalidad: BulkEvaComercial,
    saveBOEvaContractual: BulkEvaContractual,
    saveUsuario: guardarUsuario,
  },
};

export default BackOfficeResolver;
