/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'csv-parse/sync';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import { logger } from 'firebase-functions';
import fs from 'fs';
import path from 'path';

import { ResolverArgs } from '../../backend';
import { USUARIOS } from '../constantes/ConstGenerales';
import {
  transformarEvaluaciones,
  transformarEvaluacionesContra,
} from '../utilidades/Funciones';

export const plantillaEvaContractuales = async () => {
  const csvFilePath = path.join(
    process.cwd(),
    'src/modulos/backoffice/recursos/evaluaciones_contractuales.csv'
  );

  const outputDir = path.join(process.cwd(), 'src/modulos/backoffice/recursos');
  const jsonFilePath = path.join(outputDir, 'evaluaciones_contractuales.json');

  const datos = fs.readFileSync(csvFilePath);

  const datosCovertidos = parse(datos, {
    columns: true,
    delimiter: ';',
    cast: (value, context) => {
      if (context.column === 'cargo') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'observaciones') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'descripcioncompra') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'fechaElaboracion') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === 'fechaPeriodoEvaluarInicio') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === 'fechaPeriodoEvaluarFin') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === '') {
        return 'borrar';
      }

      return value;
    },
  });

  const evaluacionesFinales = datosCovertidos.map((evaluacion: any) => {
    return transformarEvaluacionesContra(evaluacion);
  });

  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(evaluacionesFinales, null, 2),
    'utf-8'
  );

  logger.info('El archivo JSON ha sido guardado en la carpeta recursos.');
  return 'Extraidos los datos del archivo';
};

export const plantillaEvaComerciales = async () => {
  const csvFilePath = path.join(
    process.cwd(),
    'src/modulos/backoffice/recursos/evaluaciones_comerciales.csv'
  );

  const outputDir = path.join(process.cwd(), 'src/modulos/backoffice/recursos');
  const jsonFilePath = path.join(outputDir, 'evaluaciones_comerciales.json');

  const datos = fs.readFileSync(csvFilePath);

  const datosCovertidos = parse(datos, {
    columns: true,
    delimiter: ';',
    cast: (value, context) => {
      if (context.column === 'cargo') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'observaciones') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'descripcioncompra') {
        if (value === '(en blanco)') return '';
      }

      if (context.column === 'fechaElaboracion') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === 'fechaPeriodoEvaluarInicio') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === 'fechaPeriodoEvaluarFin') {
        const formatoFecha = value.split('/').reverse().join('-');
        return formatoFecha;
      }

      if (context.column === '') {
        return 'borrar';
      }

      return value;
    },
  });

  const evaluacionesFinales = datosCovertidos.map((evaluacion: any) => {
    return transformarEvaluaciones(evaluacion);
  });

  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(evaluacionesFinales, null, 2),
    'utf-8'
  );
  logger.info('El archivo JSON ha sido guardado en la carpeta recursos.');
  return 'Extraidos los datos del archivo';
};

export const traerUsuarios = async () => {
  const db = admin.firestore();
  const usuariosRef = db.collection(USUARIOS);
  const usuariosSnapshot = await usuariosRef.get();
  const usuarios = usuariosSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return usuarios;
};

export const traerUsuario: ResolverArgs<{ uid: string }, UserRecord> = async (
  _,
  { uid }
) => {
  const usuario = await admin.auth().getUser(uid);
  return usuario;
};
