/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';
import fs from 'fs';
import path from 'path';

import { ResolverArgs } from '../../backend';
import { firestoreDataType } from '../../utilidades/Funciones';
import {
  COL_CONTRATISTAS,
  COL_TRABAJADORES,
  REF_EVA_CALIDAD,
  REF_EVA_CONTRACTUAL,
  REF_HISTORIAL_OCUPACIONAL,
  USUARIOS,
} from '../constantes/ConstGenerales';
import {
  BOContratistaParams,
  ContAlgoliaType,
  InfoContratista,
} from '../types/BackofficeTypes';
import { EvaParams } from '../types/EvaluacionesTypes';
import {
  BOTrabContratistasParams,
  BOTrabParams,
} from '../types/TrabajadoresTypes';
import { UserInput } from '../types/UsuarioTypes';
import {
  transformarTrabContratistas,
  transformarEvaluacionExcel,
  transformarRegTrabajadores,
} from '../utilidades/Funciones';

export const BulkTrabContratistas: ResolverArgs<
  BOTrabContratistasParams,
  string
> = async (_, { BOTrabContratistasInput }) => {
  const cantLotes = Math.ceil(BOTrabContratistasInput.length / 400);

  for (let i = 0; i < cantLotes; i++) {
    const batchPrincipal = admin.firestore().batch();
    const batchHistoria = admin.firestore().batch();
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, BOTrabContratistasInput.length);
    const lote = BOTrabContratistasInput.slice(inicio, fin);

    lote.forEach((trabajador) => {
      const trabajdoresRef = admin
        .firestore()
        .collection(COL_CONTRATISTAS)
        .doc()
        .collection(COL_TRABAJADORES)
        .doc();
      const historialRef = admin
        .firestore()
        .collection(COL_TRABAJADORES)
        .doc(trabajdoresRef.id)
        .collection(REF_HISTORIAL_OCUPACIONAL)
        .doc();

      const { historial, ...rest } = transformarTrabContratistas(
        trabajador,
        historialRef.id
      );

      batchPrincipal.set(trabajdoresRef, rest);
      batchHistoria.set(historialRef, historial);
    });

    try {
      await batchPrincipal.commit();
      await batchHistoria.commit();
    } catch (error) {
      logger.error(error);
    }
  }

  return 'Se guardaron todos los trabajadores en la plataforma';
};

export const BulkEvaComercial: ResolverArgs<EvaParams, string> = async (
  _,
  { BOEvaluacionesInput }
) => {
  const contratistaRef = admin
    .firestore()
    .collection(COL_CONTRATISTAS)
    .withConverter(firestoreDataType<InfoContratista>());
  const cantLotes = Math.ceil(BOEvaluacionesInput.length / 400);

  // Buscamos todos los contratistas únicos
  const empresasIds = BOEvaluacionesInput.map(
    (empresa) => empresa.idContratista
  );
  const unicos = new Set(empresasIds);
  const consultasEmpresas = [...unicos].map(async (idEmpresa) => {
    const info = await contratistaRef
      .where('id', '==', Number(idEmpresa))
      .get();
    return info.docs.map((emp) => ({ ...emp.data(), idContratista: emp.id }));
  });
  const contratistas = (await Promise.all(consultasEmpresas)).flat();

  for (let i = 0; i < cantLotes; i++) {
    const batch = admin.firestore().batch();
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, BOEvaluacionesInput.length);
    const lote = BOEvaluacionesInput.slice(inicio, fin);

    lote.forEach((evaluacion) => {
      const doc = contratistas.filter(
        (emp) => emp.id === Number(evaluacion.idContratista)
      )[0];

      if (doc?.idContratista) {
        const evaluacionRef = admin
          .firestore()
          .collection(COL_CONTRATISTAS)
          .doc(doc.idContratista)
          .collection(REF_EVA_CALIDAD)
          .doc();

        const nuevoRegistro = transformarEvaluacionExcel(
          evaluacion,
          evaluacionRef.id,
          'contractual'
        );
        batch.set(evaluacionRef, nuevoRegistro);
      }
    });

    try {
      await batch.commit();
      logger.info(`Registradas las evaluaciones del ${inicio} al ${fin}`);
    } catch (error) {
      logger.error(error);
    }
  }

  return 'Se guardaron todas las evaluaciones comerciales';
};

export const BulkEvaContractual: ResolverArgs<EvaParams, string> = async (
  _,
  { BOEvaluacionesInput }
) => {
  const contratistaRef = admin
    .firestore()
    .collection(COL_CONTRATISTAS)
    .withConverter(firestoreDataType<InfoContratista>());
  const cantLotes = Math.ceil(BOEvaluacionesInput.length / 400);

  // Buscamos todos los contratistas únicos
  const empresasIds = BOEvaluacionesInput.map(
    (empresa) => empresa.idContratista
  );
  const unicos = new Set(empresasIds);
  const consultasEmpresas = [...unicos].map(async (idEmpresa) => {
    const info = await contratistaRef
      .where('id', '==', Number(idEmpresa))
      .get();
    return info.docs.map((emp) => ({ ...emp.data(), idContratista: emp.id }));
  });
  const contratistas = (await Promise.all(consultasEmpresas)).flat();

  for (let i = 0; i < cantLotes; i++) {
    const batch = admin.firestore().batch();
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, BOEvaluacionesInput.length);
    const lote = BOEvaluacionesInput.slice(inicio, fin);

    lote.forEach((evaluacion) => {
      const doc = contratistas.filter(
        (emp) => emp.id === Number(evaluacion.idContratista)
      )[0];

      if (doc?.idContratista) {
        const evaluacionRef = admin
          .firestore()
          .collection(COL_CONTRATISTAS)
          .doc(doc.idContratista)
          .collection(REF_EVA_CONTRACTUAL)
          .doc();

        const nuevoRegistro = transformarEvaluacionExcel(
          evaluacion,
          evaluacionRef.id,
          'contractual'
        );
        batch.set(evaluacionRef, nuevoRegistro);
      }
    });

    try {
      await batch.commit();
      logger.info(`Registradas las evaluaciones del ${inicio} al ${fin}`);
    } catch (error) {
      logger.error(error);
    }
  }

  return 'Se guardaron todas las evaluaciones contractuales';
};

export const BulkContratistas: ResolverArgs<
  BOContratistaParams,
  string
> = async (_, { BOContratistaInput }) => {
  const cantLotes = Math.ceil(BOContratistaInput.length / 400);
  const outputDir = path.join(process.cwd(), 'src/modulos/backoffice/recursos');
  const jsonFilePath = path.join(outputDir, 'contratistas_algolia.json');
  const contratistas: ContAlgoliaType = [];

  for (let i = 0; i < cantLotes; i++) {
    const batch = admin.firestore().batch();
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, BOContratistaInput.length);
    const lote = BOContratistaInput.slice(inicio, fin);

    lote.forEach((contratista) => {
      const contratistaRef = admin
        .firestore()
        .collection(COL_CONTRATISTAS)
        .doc();

      // agregamos cada contratista en un arreglo para implementarlo en algolia.
      // @ts-ignore
      contratistas.push({ ...contratista, objectID: contratistaRef.id });

      batch.set(contratistaRef, contratista);
    });

    try {
      await batch.commit();
    } catch (error) {
      logger.error(error);
    }
  }

  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(contratistas, null, 2),
    'utf-8'
  );

  return 'Se guardaron todos los contratistas';
};

export const BulkTrabajadores: ResolverArgs<BOTrabParams, string> = async (
  _,
  { BOTrabajadoresInput }
) => {
  const cantLotes = Math.ceil(BOTrabajadoresInput.length / 400);

  for (let i = 0; i < cantLotes; i++) {
    const batchPrincipal = admin.firestore().batch();
    const batchHistoria = admin.firestore().batch();
    const inicio = i * 400;
    const fin = Math.min((i + 1) * 400, BOTrabajadoresInput.length);
    const lote = BOTrabajadoresInput.slice(inicio, fin);

    lote.forEach((trabajador) => {
      const trabajdoresRef = admin
        .firestore()
        .collection(COL_TRABAJADORES)
        .doc();
      const historiaRef = admin
        .firestore()
        .collection(COL_TRABAJADORES)
        .doc(trabajdoresRef.id)
        .collection(REF_HISTORIAL_OCUPACIONAL)
        .doc();

      const { historiaOcupacional, ...rest } = transformarRegTrabajadores(
        trabajador,
        trabajdoresRef.id,
        historiaRef.id
      );

      batchPrincipal.set(trabajdoresRef, rest);
      batchHistoria.set(historiaRef, historiaOcupacional);
    });

    try {
      await batchPrincipal.commit();
      await batchHistoria.commit();
    } catch (error) {
      logger.error((error as Error).message);
    }
  }

  return 'Se guardaron todos los trabajadores en la plataforma';
};

export const guardarUsuario: ResolverArgs<UserInput, string> = async (
  _,
  { input, password }
) => {
  const usuarioRef = admin.firestore().collection(USUARIOS);

  const { uid, customClaims, ...user } = input;

  if (uid) {
    try {
      const usuario = await admin.auth().updateUser(input.uid, {
        displayName: input.nombre,
        email: input.email,
        emailVerified: input.emailVerified,
      });

      admin.auth().setCustomUserClaims(usuario.uid, customClaims);
      await usuarioRef.doc(input.uid).set({ ...user }, { merge: true });

      await axios.post(process?.env?.PLANES_CORREO_URL ?? '', {
        data: {
          app: 'BIO D',
          usuario: input.nombre,
          correo: input.email,
          contrasena: password,
          enlace: 'https://hsebiod.biodsa.com.co',
          logo: 'https://www.biod.com.co/wp-content/uploads/2023/11/logoBioD.svg',
        },
      });

      return 'Se actualizó correctamente el usuario';
    } catch (error) {
      logger.error(error);
      return 'Ocurrió un error y no se actualizó el usuario';
    }
  }

  try {
    const usuario = await admin.auth().createUser({
      displayName: input.nombre,
      email: input.email,
      emailVerified: input.emailVerified,
      password,
    });

    admin.auth().setCustomUserClaims(usuario.uid, customClaims);
    await usuarioRef.doc(usuario.uid).set({ ...user }, { merge: true });

    await axios.post(process?.env?.PLANES_CORREO_URL ?? '', {
      data: {
        app: 'BIO D',
        usuario: input.nombre,
        correo: input.email,
        contrasena: password,
        enlace: 'https://hsebiod.biodsa.com.co',
        logo: 'https://www.biod.com.co/wp-content/uploads/2023/11/logoBioD.svg',
      },
    });

    return 'Se creó correctamente el usuario';
  } catch (error) {
    logger.error(error);
    return 'Ocurrió un error y no se guardó el usuario';
  }
};
