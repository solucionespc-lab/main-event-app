import * as admin from 'firebase-admin';

import { getLocalDate, sumarRestarFecha } from '../../../utilidades/Funciones';
import {
  REF_CONTRATISTAS,
  REF_TRABAJADORES_CONTRATISTAS,
} from '../constantes/Constantes';

import type {
  IfiltrosEventualidades,
  IfiltrosCursos,
  IFiltroTrabajadorContratista,
  IinputTrabajadorContratista,
} from '../types/TrabajadorContratistaTypes';

export const traerEventualidades = async (
  _: unknown,
  { filtros }: { filtros: IfiltrosEventualidades; year: number }
) => {
  let eventualidadesRef: admin.firestore.Query = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(filtros.idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(filtros.idTrabajador)
    .collection('eventualidades');
  // if (year) {
  //   eventualidadesRef = eventualidadesRef.where('year', '==', year);
  // }

  if (filtros.fechaA && filtros.fechaB) {
    eventualidadesRef = eventualidadesRef.where('fecha', '>=', filtros.fechaA);
    eventualidadesRef = eventualidadesRef.where('fecha', '<=', filtros.fechaB);
  }
  if (filtros.tipo) {
    eventualidadesRef = eventualidadesRef.where('tipo', '==', filtros.tipo);
  }
  if (filtros.codigo) {
    eventualidadesRef = eventualidadesRef.where('codigo', '==', filtros.codigo);
  }

  const eventualidadesPromise = await eventualidadesRef.get();

  return eventualidadesPromise.docs.map(
    (doc: FirebaseFirestore.DocumentData) => ({
      ...doc.data(),
    })
  );
};

export const traerCursos = async (
  _: unknown,
  { filtros, year }: { filtros: IfiltrosCursos; year: number }
) => {
  let cursosRef: admin.firestore.Query = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(filtros.idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(filtros.idTrabajador)
    .collection('cursos');

  if (year) {
    cursosRef = cursosRef.where('year', '==', year);
  }

  if (filtros.codigo) {
    cursosRef = cursosRef.where('codigo', '==', filtros.codigo);
  }
  if (filtros.fechaTomaA && filtros.fechaTomaB) {
    cursosRef = cursosRef.where('fechaToma', '>=', filtros.fechaTomaA);
    cursosRef = cursosRef.where('fechaToma', '<=', filtros.fechaTomaB);
  }
  if (filtros.fechaVencimientoA && filtros.fechaVencimientoB) {
    cursosRef = cursosRef.where(
      'fechaVencimiento',
      '>=',
      filtros.fechaVencimientoA
    );
    cursosRef = cursosRef.where(
      'fechaVencimiento',
      '<=',
      filtros.fechaVencimientoB
    );
  }
  const cursosPromise = await cursosRef.get();

  return cursosPromise.docs.map((doc: FirebaseFirestore.DocumentData) => ({
    ...doc.data(),
  }));
};

export const traerTrabContratistas = async (
  _: unknown,
  { filtros }: { filtros: IFiltroTrabajadorContratista }
) => {
  let trabajadorRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    admin.firestore().collectionGroup(REF_TRABAJADORES_CONTRATISTAS);

  if (filtros.activo) {
    const activo = filtros.activo === 'true' ? true : false;
    trabajadorRef = trabajadorRef.where('activo', '==', activo);
  }
  if (filtros.identificacion) {
    trabajadorRef = trabajadorRef.where(
      'identificacion',
      '==',
      filtros.identificacion
    );
  }
  if (filtros.identificacionContratista) {
    trabajadorRef = trabajadorRef.where(
      'identificacionContratista',
      '==',
      filtros.identificacionContratista
    );
  }
  if (
    !filtros.activo &&
    !filtros.identificacion &&
    !filtros.identificacionContratista
  ) {
    trabajadorRef = trabajadorRef.limit(50);
  }

  const trabajadorPromise = await trabajadorRef.get();

  let trabajadores = trabajadorPromise.docs.map(
    (doc: FirebaseFirestore.DocumentData) => ({
      ...doc.data(),
      idTrabajador: doc.id,
    })
  );

  let conteoCursos: number[] = [];

  if (filtros.vencido || filtros.porVencer) {
    if (filtros.vencido) {
      const fechaHoy = getLocalDate().fecha;
      conteoCursos = await Promise.all(
        trabajadores.map((trabajador) => {
          return admin
            .firestore()
            .collectionGroup('cursos')
            .where('fechaVencimiento', '<', fechaHoy)
            .where('idTrabajador', '==', trabajador.idTrabajador)
            .where('ultimo', '==', true)
            .count()
            .get()
            .then((cuenta) => cuenta.data().count);
        })
      );
    }

    if (filtros.porVencer) {
      const fechaHoy = getLocalDate().fecha;
      const enQuinceDias = sumarRestarFecha(fechaHoy, 0, 0, 15).suma;

      conteoCursos = await Promise.all(
        trabajadores.map((trabajador) => {
          return admin
            .firestore()
            .collectionGroup('cursos')
            .where('fechaVencimiento', '>=', fechaHoy)
            .where('fechaVencimiento', '<=', enQuinceDias)
            .where('idTrabajador', '==', trabajador.idTrabajador)
            .where('ultimo', '==', true)
            .count()
            .get()
            .then((cuenta) => cuenta.data().count);
        })
      );
    }

    const trabajadoresFiltrado: IinputTrabajadorContratista[] = [];

    conteoCursos.forEach((valor, indice) => {
      if (valor > 0) {
        trabajadoresFiltrado.push(trabajadores[indice]);
      }
    });

    trabajadores = trabajadoresFiltrado;
  }

  return trabajadores;
};

export const traerTrabConstratista = async (
  _: unknown,
  { id, idContratista }: { id: string; idContratista: string }
) => {
  const trabajadorRef = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(id);

  const trabajador = await trabajadorRef.get();

  return {
    ...trabajador.data(),
    idTrabajador: id,
  };
};

export const traerHistorialTrab = async (
  _: unknown,
  { id, idContratista }: { id: string; idContratista: string }
) => {
  const trabajadorRef = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(id);

  const historial = (
    await trabajadorRef.collection('historial').get()
  ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return historial;
};
