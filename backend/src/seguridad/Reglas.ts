import { deny, IRules } from 'graphql-shield';
import { merge } from 'lodash';

import {
  backOfficeMutationsRules,
  backOfficeQueriesRules,
} from '../backoffice/seguridad/Politicas';
import { configQueriesRules } from '../configuraciones/seguridad/Politicas';
import {
  auditoriasMutations,
  auditoriasQueries,
  evaluacionesQueries,
  contratistaQueries,
  trabajadoresContratistaMutations,
  trabajadoresContratistaQueries,
} from '../modulos/contratistas/seguridad/Reglas';
import {
  correoMutations,
  correosQueries,
} from '../modulos/correos/seguridad/Politicas';
import {
  planesMutations,
  planesQueries,
} from '../modulos/planes/seguridad/Politicas';
import {
  trabajadoresMutations,
  trabajadoresQueries,
} from '../modulos/trabajadores/seguridad/Reglas';

const denegado = {
  '*': deny,
};

const reglas: IRules = {
  Query: merge(
    auditoriasQueries,
    trabajadoresQueries,
    contratistaQueries,
    trabajadoresContratistaQueries,
    evaluacionesQueries,
    configQueriesRules,
    backOfficeQueriesRules,
    correosQueries,
    planesQueries,
    denegado
  ),
  Mutation: merge(
    auditoriasMutations,
    trabajadoresMutations,
    trabajadoresContratistaMutations,
    backOfficeMutationsRules,
    correoMutations,
    planesMutations,
    denegado
  ),
};

export default reglas;
