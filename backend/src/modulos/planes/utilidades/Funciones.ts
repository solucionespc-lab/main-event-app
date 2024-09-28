import * as admin from 'firebase-admin';

import { firestoreDataType } from '../../../utilidades/Funciones';
import { FECHAS_FILTROS, REF_PLANES } from '../constantes/ConstGenerales';
import { Filtro, PlanTypes } from '../types/PlanesTypes';

export const aplicarFiltros = (filtros: Filtro) => {
  const planesRef = admin
    .firestore()
    .collection(REF_PLANES)
    .withConverter(firestoreDataType<PlanTypes>());

  Object.entries(filtros).map((filtro) => {
    const tipoFiltro = filtro[0];
    const resFiltro = filtro[1];

    const seEncuentraLaFecha = FECHAS_FILTROS.find(
      (tipo) => tipo === resFiltro
    );

    // TODO Corregir el filtro porque el campo inicial es el de la base de datos, lo que tenemos que modificar es el resultado de la variable que viene del filtro para pasarla como argumento de la query
    if (seEncuentraLaFecha && resFiltro !== '') {
      planesRef
        .where(tipoFiltro, '>=', resFiltro)
        .where(tipoFiltro.replace(/Inicio/g, 'Final'), '<=', resFiltro);
    }

    if (!seEncuentraLaFecha && resFiltro !== '') {
      planesRef.where(tipoFiltro, '==', resFiltro);
    }
  });

  return planesRef;
};
