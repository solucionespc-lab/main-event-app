import * as admin from 'firebase-admin';

import {
  REF_AUDITORIAS,
  REF_CONTRATISTAS,
} from '../constantes/ConstAuditorias';

import type {
  PreguntaAuditoria,
  FiltrosAuditoria,
} from '../types/AuditoriasTypes';

export const traerAuditoria = async (
  _: unknown,
  { id, idContratista }: { id: string; idContratista: string }
) => {
  const db = admin.firestore();
  const contratistaRef = db.collection(REF_CONTRATISTAS).doc(idContratista);
  const auditoriaRef = contratistaRef.collection(REF_AUDITORIAS).doc(id);
  const auditoria = await auditoriaRef.get();

  const preguntasAuditoria =
    auditoria.data()?.preguntasAuditoria.map((pregunta: PreguntaAuditoria) => {
      return {
        ...pregunta,
      };
    }) ?? [];

  return { ...auditoria.data(), preguntasAuditoria };
};

export const traerContratistas = async (
  _: unknown,
  { filtros }: { filtros: FiltrosAuditoria }
) => {
  const db = admin.firestore();
  let auditoriasRef: admin.firestore.Query = db.collectionGroup(REF_AUDITORIAS);

  if (filtros.idContratista) {
    auditoriasRef = auditoriasRef.where(
      'idContratista',
      '==',
      filtros.idContratista
    );
  }
  const filtroAuditado = filtros.auditado === 'true' ? true : false;

  if (filtros.auditado) {
    auditoriasRef = auditoriasRef.where('auditado', '==', filtroAuditado);
  }
  if (filtros.fechaInicio) {
    auditoriasRef = auditoriasRef.where('fecha', '>=', filtros.fechaInicio);
  }
  if (filtros.fechaFin) {
    auditoriasRef = auditoriasRef.where('fecha', '<=', filtros.fechaFin);
  }
  if (filtros.criterio) {
    auditoriasRef = auditoriasRef.where('criterio', '==', filtros.criterio);
  }

  const auditorias = (await auditoriasRef.get()).docs.map((doc) => doc.data());
  return auditorias;
};
