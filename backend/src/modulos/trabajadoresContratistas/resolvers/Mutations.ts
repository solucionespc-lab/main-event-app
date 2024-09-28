import * as admin from 'firebase-admin';
import { QuerySnapshot, DocumentData } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';

import { calcularYear } from '../../../utilidades/Funciones';
import {
  REF_TRABAJADORES_CONTRATISTAS,
  REF_CONTRATISTAS,
} from '../constantes/Constantes';
import { IRedisInput } from '../types/SchedulesTypes';

import type {
  IinputTrabajadorContratista,
  TypeHistorial,
  IDatosTrabajadorHistoria,
  IDatosEventualidad,
  IinputHistorial,
} from '../types/TrabajadorContratistaTypes';

const guardarTrabContraRedis = async (
  _: unknown,
  { input }: { input: IinputTrabajadorContratista[] }
) => {
  // Array de trabajadores
  const trabajadores = input;

  // Crear un array de argumentos para el comando MSET
  const args: IRedisInput[] = [];
  trabajadores.forEach((trabajador: IinputTrabajadorContratista) => {
    const key = `trabajadorContratista:${trabajador.idTrabajador}`;
    trabajador.identificacion = trabajador.identificacion.toString();
    args.push({ key, value: '' });
  });

  return 'Error guardados';
};

export const listaTrabContratista = async (
  _: unknown,
  { lista }: { lista: string[] }
) => {
  const refTrabajadores = admin
    .firestore()
    .collection(REF_TRABAJADORES_CONTRATISTAS);

  const todosTrabajadores = (await refTrabajadores.get()).docs.map((doc) => ({
    idTrabajador: doc.id,
    ...(doc.data() as IinputTrabajadorContratista),
  }));

  let retorno = '';
  await Promise.all(
    lista.map(async (dato) => {
      if (dato === 'redis') {
        retorno += `Se guardaron ${todosTrabajadores.length} trabajadores en redis | `;
        return guardarTrabContraRedis(_, {
          input: todosTrabajadores,
        }).catch((e: Error) => {
          logger.error(e.message);
        });
      }
      retorno += `El servicio ${dato} no existe, valide que haya escrito el servicio correctamente |`;

      return null;
    })
  );

  return retorno;
};

export const importarTrabContratistas = async (
  _: unknown,
  { input }: { input: IinputTrabajadorContratista[] }
) => {
  const respuesta: { exitos: number; fallos: string[] } = {
    exitos: 0,
    fallos: [],
  };

  const cantLotes = Math.ceil(input.length / 300);
  // traemos todos los trabajadores existentes buscando las cédulas
  const trabajadoresExistentes: IinputTrabajadorContratista[] = [];

  const ultimoRegistroPorTrabajador: Record<
    string,
    IinputTrabajadorContratista
  > = {};

  // batch por lotes para actualizar el historial ocupacional
  const contratistasUnicos: string[] = [];
  for (let i = 0; i < cantLotes; i++) {
    const inicio = i * 300;
    const fin = Math.min((i + 1) * 300, input.length);
    const lote = input.slice(inicio, fin);

    lote.forEach(async (trabajador: IinputTrabajadorContratista, indice) => {
      const activo = trabajador.fechaRetiro ? false : true;

      trabajador = { ...trabajador, activo };
      const contratistaEsUnico = !contratistasUnicos.includes(
        trabajador.identificacionContratista
      );
      if (contratistaEsUnico) {
        contratistasUnicos.push(trabajador.identificacionContratista);
      }
      const trabajadorRef = admin
        .firestore()
        .collection(REF_CONTRATISTAS)
        .doc(trabajador.identificacionContratista)
        .collection(REF_TRABAJADORES_CONTRATISTAS);
      let validacion = true;
      // Aquí validaremos que el objeto cumpla con las restricciones ocupacionales, como por ejemplo que tenga la edad mínima y demás.

      // condicion 1, el trabajador  debe temer una edad mínima de 16 años.
      const edad = calcularYear(trabajador.fechaNacimiento);
      if (edad < 16) {
        respuesta.fallos.push(
          `Edad del trabajador con cédula ${trabajador.identificacion} es inválida, debe tener al menos 16 años`
        );
        validacion = false;
      }
      // Validamos que el trabajador sea uno de los existentes, si existe usamos su referencia en la base de datos, si no existe se crea una referencia nueva.

      const trabajadorExiste = trabajadoresExistentes.find(
        (item) =>
          item.identificacion?.toString() ===
          trabajador.identificacion.toString()
      );
      // Si el objeto cumple con las condiciones se procede a guardarlo
      if (validacion === true) {
        const referencia = trabajadorExiste
          ? trabajadorRef.doc(trabajadorExiste.idTrabajador as string)
          : trabajadorRef.doc();

        // filtramos para tomar el último registro en el excel del trabajador

        let trabExistenteSinIds;
        if (trabajadorExiste) {
          trabExistenteSinIds = { ...trabajadorExiste };
          delete trabExistenteSinIds.idTrabajador;
        }

        if (trabExistenteSinIds && indice === 0) {
          ultimoRegistroPorTrabajador[referencia.id] = trabExistenteSinIds;
        }
        if (!ultimoRegistroPorTrabajador[referencia.id]) {
          ultimoRegistroPorTrabajador[referencia.id] = trabajador;
        } else if (
          trabajador.fechaIngreso >=
          ultimoRegistroPorTrabajador[referencia.id].fechaIngreso
        ) {
          ultimoRegistroPorTrabajador[referencia.id] = trabajador;
        }

        trabajadoresExistentes.push({
          ...trabajador,
          idTrabajador: referencia.id,
        });

        respuesta.exitos++;
      }
    });
  }

  // batch por lotes del trabajador
  for (let i = 0; i < cantLotes; i++) {
    const inicio = i * 300;
    const fin = Math.min((i + 1) * 300, input.length);
    const lote = Object.keys(ultimoRegistroPorTrabajador).slice(inicio, fin);

    const trabajadoresToRedis: IinputTrabajadorContratista[] = [];
    const batch = admin.firestore().batch();
    lote.forEach((key: string) => {
      const trabajadorRef = admin
        .firestore()
        .collection(REF_CONTRATISTAS)
        .doc(ultimoRegistroPorTrabajador[key].identificacionContratista)
        .collection(REF_TRABAJADORES_CONTRATISTAS);
      const ultimoRegistro: IinputTrabajadorContratista =
        ultimoRegistroPorTrabajador[key];

      const ultimoRegistroRef = trabajadorRef.doc(key);
      trabajadoresToRedis.push({
        ...ultimoRegistro,
        idTrabajador: key,
      });
      batch.set(
        ultimoRegistroRef,
        {
          ...ultimoRegistro,
          idTrabajador: key,
        },
        { merge: true }
      );
    });

    try {
      await batch.commit().then(async () => {
        await guardarTrabContraRedis(_, {
          input: trabajadoresToRedis,
        });

        const batchContratistas = admin.firestore().batch();
        await Promise.all(
          contratistasUnicos.map(async (contratista) => {
            const contratistaRef = admin
              .firestore()
              .collection(REF_CONTRATISTAS)
              .doc(contratista);
            const totalTrabajadores = (
              await contratistaRef
                .collection(REF_TRABAJADORES_CONTRATISTAS)
                .where('activo', '==', true)
                .count()
                .get()
            ).data().count;

            batchContratistas.set(
              contratistaRef,
              {
                totalTrabajadores,
              },
              { merge: true }
            );
          })
        );
        await batchContratistas.commit();
      });
    } catch (error) {
      logger.error((error as Error).message);
    }
  }

  return respuesta;
};

export const guardarTrabContratista = async (
  _: unknown,
  { input }: { input: IinputTrabajadorContratista }
) => {
  const trabajadorRef = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(input.identificacionContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS);
  const trabajadoresExistentes: IinputTrabajadorContratista[] = [];

  let trabajadorRefId = '';
  if (input.idTrabajador) {
    trabajadorRefId = input.idTrabajador;
  } else {
    if (
      trabajadoresExistentes.length > 0 &&
      trabajadoresExistentes[0].idTrabajador
    ) {
      trabajadorRefId = trabajadoresExistentes[0].idTrabajador;
    } else {
      trabajadorRefId = trabajadorRef.doc().id;
    }
  }

  const activo = input.fechaRetiro ? false : true;

  trabajadorRef
    .doc(trabajadorRefId)
    .set({
      ...input,
      idTrabajador: trabajadorRefId,
      activo,
    })
    .then(async () => {
      guardarTrabContraRedis(_, {
        input: [{ ...input, idTrabajador: trabajadorRefId, activo }],
      });

      const contratistaRef = admin
        .firestore()
        .collection(REF_CONTRATISTAS)
        .doc(input.identificacionContratista);
      const totalTrabajadores = (
        await contratistaRef
          .collection(REF_TRABAJADORES_CONTRATISTAS)
          .where('activo', '==', true)
          .count()
          .get()
      ).data().count;

      contratistaRef.set({ totalTrabajadores }, { merge: true });
    });

  return 'Ok';
};

export const guardarHistTrabContratista = async (
  _: unknown,
  { historial }: { historial: TypeHistorial[] }
) => {
  return await Promise.all(
    historial.map(async (item) => {
      const trabajadorRef = admin
        .firestore()
        .collection(REF_CONTRATISTAS)
        .doc(item.identificacionContratista)
        .collection(REF_TRABAJADORES_CONTRATISTAS)
        .doc(item.idTrabajador);

      const historialRef = item.id
        ? trabajadorRef.collection('historial').doc(item.id)
        : trabajadorRef.collection('historial').doc();

      historialRef.set({ ...item, id: historialRef.id }, { merge: true });
    })
  ).then(() => {
    return 'Ok';
  });
};

export const guardarCursos = async (
  _: unknown,
  {
    idContratista,
    idTrabajador,
    input,
    year,
  }: {
    idTrabajador: string;
    idContratista: string;
    year: number;
    input: IDatosTrabajadorHistoria;
  }
) => {
  const trabajadorRef = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(idTrabajador);

  // se usa fechaToma para saber la cantidad de cursos del mismo codigo cuya fecha sea superior
  const cantidadCursosMasRecientes = (
    await trabajadorRef
      .collection('cursos')
      .where('codigo', '==', input.codigo)
      .where('fechaToma', '>', input.fechaToma)
      .count()
      .get()
  ).data().count;

  const ultimo: boolean = cantidadCursosMasRecientes === 0 ? true : false;

  // array de cursos que actualmente están marcados como ùltimo del mism código

  let ultimosCursos: QuerySnapshot<DocumentData>;

  if (ultimo) {
    ultimosCursos = input.id
      ? await trabajadorRef
          .collection('cursos')
          .where('codigo', '==', input.codigo)
          .where('ultimo', '==', true)
          .where('id', '!=', input.id)
          .get()
      : await trabajadorRef
          .collection('cursos')
          .where('codigo', '==', input.codigo)
          .where('ultimo', '==', true)
          .get();
  }

  const cursosRef = trabajadorRef.collection('cursos');

  const cursoRef = input.id ? cursosRef.doc(input.id) : cursosRef.doc();
  const cursosBatch = admin.firestore().batch();

  return await cursoRef
    .set(
      {
        ...input,
        id: cursoRef.id,
        year,
        idContratista,
        idTrabajador,
        ultimo,
      },
      { merge: true }
    )
    .then(() => {
      ultimosCursos?.docs.forEach((curso) => {
        cursosBatch.set(curso.ref, { ultimo: false }, { merge: true });
      });
      return cursosBatch.commit().then(() => {
        return 'Ok';
      });
    });
};

export const guardarEventualidad = async (
  _: unknown,
  {
    idTrabajador,
    idContratista,
    input,
  }: {
    idTrabajador: string;
    idContratista: string;
    input: IDatosEventualidad;
  }
) => {
  const trabajadorRef = admin
    .firestore()
    .collection(REF_CONTRATISTAS)
    .doc(idContratista)
    .collection(REF_TRABAJADORES_CONTRATISTAS)
    .doc(idTrabajador);
  const eventualidadesRef = trabajadorRef.collection('eventualidades');

  const eventualidadRef = input.id
    ? eventualidadesRef.doc(input.id)
    : eventualidadesRef.doc();

  eventualidadRef.set(
    { ...input, id: eventualidadRef.id, idContratista, idTrabajador },
    { merge: true }
  );
  return 'Ok';
};

export const importarHistTrab = async (
  _: unknown,
  { input }: { input: IinputHistorial[] }
) => {
  const respuesta: { exitos: number; fallos: string[] } = {
    exitos: 0,
    fallos: [],
  };

  const cantLotes = Math.ceil(input.length / 300);
  // traemos todos los trabajadores existentes buscando las cédulas
  const trabajadoresExistentes: IinputTrabajadorContratista[] = [];

  // batch por lotes para actualizar el historial ocupacional
  const contratistasUnicos: string[] = [];
  for (let i = 0; i < cantLotes; i++) {
    const batchHistorial = admin.firestore().batch();
    const inicio = i * 300;
    const fin = Math.min((i + 1) * 300, input.length);
    const lote = input.slice(inicio, fin);

    lote.forEach(async (historialTrabajador: IinputHistorial) => {
      const contratistaEsUnico = !contratistasUnicos.includes(
        historialTrabajador.identificacionContratista
      );

      if (contratistaEsUnico) {
        contratistasUnicos.push(historialTrabajador.identificacionContratista);
      }

      const trabajadorRef = admin
        .firestore()
        .collection(REF_CONTRATISTAS)
        .doc(historialTrabajador.identificacionContratista)
        .collection(REF_TRABAJADORES_CONTRATISTAS);

      // Validamos que el trabajador sea uno de los existentes, si existe usamos su referencia en la base de datos, si no existe se crea una referencia nueva.

      const trabajadorExiste = trabajadoresExistentes.find(
        (item) =>
          item.identificacion?.toString() ===
          historialTrabajador.cedulaTrabajador.toString()
      );
      // Si el objeto cumple con las condiciones se procede a guardarlo

      if (trabajadorExiste && trabajadorExiste.idTrabajador) {
        const referenciaHistorial = trabajadorRef
          .doc(trabajadorExiste.idTrabajador)
          .collection('historial')
          .doc();

        batchHistorial.set(
          referenciaHistorial,
          { ...historialTrabajador, id: referenciaHistorial.id },
          { merge: true }
        );
        respuesta.exitos += 1;
      } else {
        respuesta.exitos = 0;
        respuesta.fallos.push(
          `El trabajador con cédula ${historialTrabajador.cedulaTrabajador} no existe en el sistema, no se importarán datos a menos que todos los datos del excel sean correctos`
        );
      }
    });

    if (respuesta.fallos.length === 0) {
      batchHistorial.commit();
    }
  }

  return respuesta;
};
