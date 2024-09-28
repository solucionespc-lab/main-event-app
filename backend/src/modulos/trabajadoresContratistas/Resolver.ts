import {
  guardarCursos,
  guardarEventualidad,
  guardarHistTrabContratista,
  guardarTrabContratista,
  importarHistTrab,
  importarTrabContratistas,
  listaTrabContratista,
} from './resolvers/Mutations';
import {
  traerCursos,
  traerEventualidades,
  traerHistorialTrab,
  traerTrabConstratista,
  traerTrabContratistas,
} from './resolvers/Queries';

const TrabajadoresContratistaResolver = {
  Query: {
    getEventualidades: traerEventualidades,
    getCursos: traerCursos,
    getTrabajadoresContratista: traerTrabContratistas,
    getTrabajadorContratista: traerTrabConstratista,
    getHistorialTrabajador: traerHistorialTrab,
  },
  Mutation: {
    trabajadoresContratistasAlistas: listaTrabContratista,
    importTrabajadoresContratista: importarTrabContratistas,
    saveTrabajadorContratista: guardarTrabContratista,
    saveHistorialTrabajador: guardarHistTrabContratista,
    saveCursos: guardarCursos,
    saveEventualidad: guardarEventualidad,
    importHistorialTrabajador: importarHistTrab,
  },
};

export default TrabajadoresContratistaResolver;
