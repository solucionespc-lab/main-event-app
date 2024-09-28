/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as admin from 'firebase-admin';

import { ResolverArgs } from '../../../backend';
import { firestoreDataType } from '../../../utilidades/Funciones';
import { REF_CONTRATISTAS } from '../constantes/Constantes';

import type {
  ContratistaType,
  ContratistasFiltros,
} from '../types/ContratistasTypes';

export const traerSeguridadSocial = async (
  _: unknown,
  { idContratista, year }: { idContratista: string; year: number }
) => {
  const db = admin.firestore();
  const contratistaRef = db.collection(REF_CONTRATISTAS).doc(idContratista);
  const seguridadSocialRef = contratistaRef
    .collection('seguridadSocial')
    .where('year', '==', year);

  const seguridadSocial = (await seguridadSocialRef.get()).docs.map((doc) =>
    doc.data()
  );

  return seguridadSocial;
};

export const traerContratistas: ResolverArgs<
  { filtros: ContratistasFiltros },
  Partial<ContratistaType>[]
> = async (_, { filtros }) => {
  const db = admin.firestore();
  const contratistasRef = db
    .collection(REF_CONTRATISTAS)
    .withConverter(firestoreDataType<ContratistaType>());

  if (filtros.idContratista) {
    const contratista = await contratistasRef.doc(filtros.idContratista).get();

    if (contratista.data()) {
      const documento = { ...contratista.data(), id: contratista.id };
      return [documento];
    }

    return [];
  }

  if (filtros.tipoContratista) {
    contratistasRef.where('tipo_proveedor', '==', filtros.tipoContratista);

    const contratistaFiltro = await contratistasRef.get();
    return contratistaFiltro.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  const contratistas = await contratistasRef.limit(30).get();
  return contratistas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const traerContratista = async (_: unknown, { id }: { id: string }) => {
  const db = admin.firestore();
  const contratistaRef = await db.collection(REF_CONTRATISTAS).doc(id).get();

  return contratistaRef.data() as ContratistaType;
};
