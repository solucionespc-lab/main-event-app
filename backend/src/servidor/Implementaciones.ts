import { merge } from 'lodash';

import AuditoriaesSchema from '../modulos/auditorias/Schema';
import ContratistasSchema from '../modulos/contratistas/Schema';
import CorreosSchema from '../modulos/correos/Schema';
import EvaluacionesSchema from '../modulos/evaluaciones/Schema';
import PlanesAccionSchema from '../modulos/planes/Schema';
import TrabajadoresSchema from '../modulos/trabajadores/Schema';
import TrabajadoresContratistaSchema from '../modulos/trabajadoresContratistas/Schema';

import CorreosResolver from '../modulos/correos/Resolvers';
import PlanesResolver from '../modulos/planes/Resolvers';

import root from './Root';
import EvaluacionesBOSchema from '../backoffice/EvaSchema';
import BackOfficeResolver from '../backoffice/Resolvers';
import BackOfficeSchema from '../backoffice/Schema';
import BOTrabajadoresSchema from '../backoffice/TrabSchema';
import UsuariosSchema from '../backoffice/UsuarioSchema';
import configuracionesResolvers from '../configuraciones/Resolvers';
import ConfigSchema from '../configuraciones/Schema';
import AuditoriaResolver from '../modulos/auditorias/Resolver';
import ContratistasResolvers from '../modulos/contratistas/Resolver';
import EvaluacionResolver from '../modulos/evaluaciones/Resolver';
import TrabajadoresResolver from '../modulos/trabajadores/Resolver';
import TrabajadoresContratistaResolver from '../modulos/trabajadoresContratistas/Resolver';

export const schemas = [
  root,
  AuditoriaesSchema,
  EvaluacionesSchema,
  ContratistasSchema,
  TrabajadoresContratistaSchema,
  TrabajadoresSchema,
  ConfigSchema,
  BackOfficeSchema,
  BOTrabajadoresSchema,
  EvaluacionesBOSchema,
  CorreosSchema,
  PlanesAccionSchema,
  UsuariosSchema,
];

export const resolvers = merge(
  AuditoriaResolver,
  EvaluacionResolver,
  TrabajadoresContratistaResolver,
  TrabajadoresResolver,
  configuracionesResolvers,
  BackOfficeResolver,
  ContratistasResolvers,
  CorreosResolver,
  PlanesResolver
);
