import * as admin from 'firebase-admin';
import { getDatabaseWithUrl } from 'firebase-admin/database';
import { logger } from 'firebase-functions';

import { ResolverArgs } from '../../backend';
import { CONFIG_DEFEAULT } from '../constantes/ConstGenerales';

import type { ConfiguracionesType } from '../types/ConfiguracionesTypes';

export const traerConfiguraciones: ResolverArgs<
  unknown,
  ConfiguracionesType
> = async () => {
  const configDb = getDatabaseWithUrl(
    process?.env?.REALTIME_DATABASE_URL_CONFIG ?? ''
  );

  const dbListasRef = admin.database().ref('/listas');
  const dbResponsablesRef = admin.database().ref('/responsablesPlan');
  const dbConfig = configDb.ref('/iam');

  try {
    const [configApp, listas, reponsables] = await Promise.all([
      dbConfig.get(),
      dbListasRef.get(),
      dbResponsablesRef.get(),
    ]);

    return {
      ...configApp.val(),
      listas: JSON.stringify(listas.val()),
      responsablesPlan: JSON.stringify(reponsables.val()),
    };
  } catch (err) {
    logger.error(err);
    return CONFIG_DEFEAULT;
  }
};
