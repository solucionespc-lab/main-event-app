/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { REF_AUDITORIAS } from '../../auditorias/constantes/ConstAuditorias';
import { AuditoriaType } from '../../auditorias/types/AuditoriasTypes';
import {
  REF_CONTRATISTAS,
  REF_EVA_CALIDAD,
  REF_EVA_CONTRACTUAL,
} from '../constantes/ConstEvaluaciones';

import type {
  FiltrosEvaType,
  EvaluacionType,
} from '../types/EvaluacionesTypes';

type QueryType =
  | admin.firestore.Query<EvaluacionType, admin.firestore.DocumentData>
  | admin.firestore.CollectionReference<
      EvaluacionType,
      admin.firestore.DocumentData
    >;

export const traerAuditoria: ResolverArgs<
  FiltrosEvaType,
  AuditoriaType[]
> = async (_, { filtros }) => {
  if (!filtros.idBaseDatos || !filtros.idContratista) return [];
  const db = admin.firestore();
  const { fechaInicio, fechaFinal } = filtros;

  const AuditoriaRef = db
    .collection(REF_CONTRATISTAS)
    .doc(filtros.idBaseDatos)
    .collection(REF_AUDITORIAS)
    .withConverter(firestoreDataType<AuditoriaType>())
    .where('fecha', '>=', fechaInicio)
    .where('fecha', '<=', fechaFinal);

  try {
    const auditorias = await AuditoriaRef.get();
    return auditorias.docs.map((auditoria) => auditoria.data());
  } catch (error) {
    logger.error(error);
    return [];
  }
};

export const traerEvaluacionCalidad: ResolverArgs<
  FiltrosEvaType,
  EvaluacionType[]
> = async (_, { filtros }) => {
  if (!filtros.idBaseDatos || !filtros.idContratista) return [];

  const db = admin.firestore();
  const { fechaInicio, fechaFinal } = filtros;

  let evaCalidadRef: QueryType = db
    .collection(REF_CONTRATISTAS)
    .doc(filtros.idBaseDatos)
    .collection(REF_EVA_CALIDAD)
    .withConverter(firestoreDataType<EvaluacionType>());

  if (filtros.idCompra) {
    evaCalidadRef = evaCalidadRef
      .where('id', '==', filtros.idCompra)
      .where('fechaElaboracion', '>=', fechaInicio)
      .where('fechaElaboracion', '<=', fechaFinal);
  } else {
    evaCalidadRef = evaCalidadRef
      .where('fechaElaboracion', '>=', fechaInicio)
      .where('fechaElaboracion', '<=', fechaFinal);
  }

  try {
    const evaCalidad = await evaCalidadRef.get();
    return evaCalidad.docs.map((evaluacion) => evaluacion.data());
  } catch (error) {
    logger.error(error);
    return [];
  }
};

export const traerEvaluacionContratual: ResolverArgs<
  FiltrosEvaType,
  EvaluacionType[] | null
> = async (_, { filtros }) => {
  if (!filtros.idBaseDatos || !filtros.idContratista) return [];

  const db = admin.firestore();
  const { fechaInicio, fechaFinal } = filtros;

  let evaContractualRef: QueryType = db
    .collection(REF_CONTRATISTAS)
    .doc(filtros.idBaseDatos)
    .collection(REF_EVA_CONTRACTUAL)
    .withConverter(firestoreDataType<EvaluacionType>());

  if (filtros.idCompra) {
    evaContractualRef = evaContractualRef
      .where('id', '==', filtros.idCompra)
      .where('fechaElaboracion', '>=', fechaInicio)
      .where('fechaElaboracion', '<=', fechaFinal);
  } else {
    evaContractualRef = evaContractualRef
      .where('fechaElaboracion', '>=', fechaInicio)
      .where('fechaElaboracion', '<=', fechaFinal);
  }

  try {
    const evaContractual = await evaContractualRef.get();
    return evaContractual.docs.map((evaluacion) => evaluacion.data());
  } catch (error) {
    logger.error(error);
    return [];
  }
};
