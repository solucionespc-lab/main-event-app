import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { COL_CORREOS } from '../constantes/ConstGenerales';
import { CorreoType, EnviarCorreoArgs } from '../types/CorreosTypes';

export const modificarCorreos: ResolverArgs<EnviarCorreoArgs, string> = async (
  _,
  { args }
) => {
  const correoRef = admin
    .firestore()
    .collection(COL_CORREOS)
    .withConverter(firestoreDataType<CorreoType>())
    .doc(args.id);

  const entrega = {
    delivery: {
      attemps: 0,
      error: null,
      leaseExpireTime: new Date(),
      startTime: new Date(),
      state: args.estado,
    },
  };

  try {
    await correoRef.update(entrega);
    return 'Fue reenviado el correo al proveedor correspondiente';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error al enviar el correo al proveedor';
  }
};
