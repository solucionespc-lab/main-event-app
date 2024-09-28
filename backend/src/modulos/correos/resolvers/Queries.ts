import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { COL_CORREOS } from '../constantes/ConstGenerales';

import type { CorreosArgs, CorreoType } from '../types/CorreosTypes';

export const traerCorreos: ResolverArgs<
  CorreosArgs,
  CorreoType[]
> = async () => {
  const correoRef = admin
    .firestore()
    .collection(COL_CORREOS)
    .withConverter(firestoreDataType<CorreoType>());

  try {
    const correos = await correoRef.limit(20).get();
    return correos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    logger.error(error);
    return [];
  }
};
