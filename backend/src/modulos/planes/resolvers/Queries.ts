import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { REF_PLANES, ROLES_PLANES } from '../constantes/ConstGenerales';
import { aplicarFiltros } from '../utilidades/Funciones';

import type { FiltrosType, PlanTypes } from '../types/PlanesTypes';

export const traerPlanesAccion: ResolverArgs<
  FiltrosType,
  PlanTypes[] | null
> = async (_, { filtros }) => {
  const { idContratista, ...rest } = filtros;
  const planesRef = aplicarFiltros(rest);
  const puedeVerDatosCompletos = ROLES_PLANES.some(
    (rol) => rol === idContratista
  );

  try {
    if (puedeVerDatosCompletos) {
      const planes = await planesRef.get();
      return planes.docs.map((doc) => doc.data());
    }

    const planes = await planesRef
      .where('idContratista', '==', idContratista)
      .get();
    return planes.docs.map((doc) => doc.data());
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const traerPlanAccion: ResolverArgs<
  { idPlan: string },
  PlanTypes | null | undefined
> = async (_, { idPlan }) => {
  const planesRef = admin
    .firestore()
    .collection(REF_PLANES)
    .withConverter(firestoreDataType<PlanTypes>());

  try {
    const planes = await planesRef.doc(idPlan).get();
    return planes.data();
  } catch (error) {
    logger.error(error);
    return null;
  }
};
