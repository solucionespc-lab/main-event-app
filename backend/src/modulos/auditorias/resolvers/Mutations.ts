import axios from 'axios';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import {
  LOGO,
  PLANES_REF_AUDITORIA,
  REF_AUDITORIAS,
  REF_CONTRATISTAS,
} from '../constantes/ConstAuditorias';
import { transformarCaliAuditorias } from '../utilidades/Funciones';

import type { AuditoriaInput } from '../types/AuditoriasTypes';

export const guardarAuditoria = async (
  _: unknown,
  { auditoria }: { auditoria: AuditoriaInput }
) => {
  const db = admin.firestore();
  const contratistaRef = db
    .collection(REF_CONTRATISTAS)
    .doc(auditoria.idContratista);
  const planesRef = db.collection(PLANES_REF_AUDITORIA);

  const auditoriaRef = auditoria.idAuditoria
    ? contratistaRef.collection(REF_AUDITORIAS).doc(auditoria.idAuditoria)
    : contratistaRef.collection(REF_AUDITORIAS).doc();

  const planRef = auditoria.plan.id
    ? planesRef.doc(auditoria.plan.id)
    : planesRef.doc();

  const preguntasAuditoria = auditoria.preguntasAuditoria.map((pregunta) => {
    const { ...preguntaAuditoria } = pregunta;
    return preguntaAuditoria;
  });

  try {
    await auditoriaRef.set(
      {
        ...auditoria,
        preguntasAuditoria,
        idAuditoria: auditoriaRef.id,
        totalAuditoria: transformarCaliAuditorias(auditoria.totalAuditoria),
      },
      { merge: true }
    );

    await planRef.set(
      {
        ...auditoria.plan,
        idContratista: auditoria.idContratista,
        nombreContratista: auditoria.contratista,
        cedulaNitContratista: auditoria.cedulaNitContratista,
        id: planRef.id,
      },
      { merge: true }
    );

    // Debemos determinar si el plan de acción ya se cerró
    // TODO Colocar la lógica para que en el cuerpo del correo diga el estado del plan de acción
    if (auditoria.plan.estado !== 'E02') {
      await axios.post(process?.env?.PLANES_CORREO_URL ?? '', {
        data: {
          logoUrl: LOGO,
          nombreContratista: auditoria.contratista,
          plan: auditoria.plan.descripcion,
          correo: auditoria.correo,
        },
      });
    }

    return 'Se guardaron los planes y la auditoría';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error al momento de guardar y enviar los datos';
  }
};
