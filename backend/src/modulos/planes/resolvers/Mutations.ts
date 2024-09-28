import axios from 'axios';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { LOGO, REF_PLANES } from '../constantes/ConstGenerales';

import type { PlanTypes, PlanTypesInput } from '../types/PlanesTypes';

export const guardarPlanAccion: ResolverArgs<PlanTypesInput, string> = async (
  _,
  { plan }
) => {
  const planRef = admin
    .firestore()
    .collection(REF_PLANES)
    .withConverter(firestoreDataType<PlanTypes>());

  try {
    if (plan.id) {
      await planRef.doc(plan.id).set(plan);

      // TODO Debemos determinar si el plan de acción ya se cerró
      // TODO Colocar la lógica para que en el cuerpo del correo diga el estado del plan de acción
      if (plan.estado !== 'E02') {
        await axios.post(process?.env?.PLANES_CORREO_URL ?? '', {
          data: {
            logoUrl: LOGO,
            nombreContratista: plan.nombreContratista,
            plan: plan.descripcion,
            correo: plan.correo,
          },
        });
      }

      return 'Se ha guardado el plan de acción';
    }

    const nuevoPlan = planRef.doc();
    await nuevoPlan.set({ ...plan, id: nuevoPlan.id });

    return 'Se ha guardado el plan de acción';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error al guardar el plan de acción';
  }
};
