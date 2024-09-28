/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { parse } from 'csv-parse/sync';
import { readFileSync, writeFile } from 'fs';
import path from 'path';

import { buscarCodigoDePuntaje } from './FuncGenerales';
import Listas from '../recursos/Listas.json';
import { EvaluacionesInput } from '../types/EvaluacionesTypes';
import {
  TrabajadoresType,
  trabContratistaType,
} from '../types/TrabajadoresTypes';

const interpretacionEvaluacion = (resultado: number) => {
  if (resultado < 3) {
    return 'Critico';
  }

  if (resultado >= 3 && resultado <= 4.25) {
    return 'Moderable';
  }

  if (resultado > 4.25) {
    return 'Aceptable';
  }

  return '';
};

export function extraerDatosTrabajadores() {
  const ruta = path.join('src/modulos/backoffice/recursos/', 'Personal.csv');
  const file = readFileSync(ruta, 'utf-8');
  const totalData = parse(file, {
    columns: true,
    delimiter: [';'],
  });

  writeFile('trabajadores.json', JSON.stringify(totalData), 'utf-8', (err) =>
    console.error(err)
  );

  return 'Se exportaron los datos del personal';
}

export function extraerDatosTrabContratistas() {
  const ruta = path.join(
    'src/modulos/backoffice/recursos/',
    'Personal_contratistas.csv'
  );
  const file = readFileSync(ruta, 'utf-8');
  const totalData = parse(file, {
    columns: true,
    delimiter: [';'],
  });

  writeFile(
    'trabContratistas.json',
    JSON.stringify(totalData),
    'utf-8',
    (err) => console.error(err)
  );

  return 'Se exportaron los datos del personal';
}

export const transformarRegTrabajadores = (
  trabajador: TrabajadoresType,
  idTrab: string,
  idHistoria: string
) => {
  const trabajadorObj = {
    idTrabajador: idTrab,
    cedula: Number(trabajador.cedula),
    nombre: trabajador.nombre,
    fechaNacimiento: trabajador.fechaNacimiento,
    genero: trabajador.genero,
    estadoCivil: trabajador.estadoCivil,
    cargoActual: trabajador.cargo,
    procesoActual: trabajador?.procesoActual ?? '',
    turnoActual: trabajador.turnoActual,
    gerencia: trabajador?.gerencia ?? '',
    numHijos: Number(trabajador.numHijos),
    nivelEducativo: trabajador.nivelEducativo,
    profesion: trabajador.profesion,
    fechaIngresoEmp: trabajador.fechaIngresoEmp,
    fechaRetiroEmp: '',
    nombreContacto: trabajador.nombreContacto,
    numContacto: trabajador.numContacto,
    grupoSanguineo: trabajador.grupoSanguineo,
    rh: trabajador.rh,
  };

  const historia = {
    id: idHistoria,
    fechaIngresoCargo: trabajador.fechaIngresoEmp,
    fechaRetiroCargo: '9999-12-31',
    fechaRetiroEmp: '',
    idTrabajador: '',
    fechaIngresoEmp: trabajador.fechaIngresoEmp,
    genero: trabajador.genero,
    cargo: trabajador.cargo,
    gerencia: trabajador?.gerencia ?? '',
    proceso: trabajador?.procesoActual ?? '',
    turno: trabajador.turnoActual,
    jefeInmediato: trabajador.jefeInmediato,
    tipoContrato: trabajador.tipoContrato,
    correo: trabajador.correo,
  };

  return {
    ...trabajadorObj,
    historiaOcupacional: { ...historia },
  };
};

export const transformarTrabContratistas = (
  trabajador: trabContratistaType,
  idHistoria: string
) => {
  const trabajadorContratista = {
    activo: trabajador,
    cargo: trabajador,
    cedulaNit: trabajador,
    ciudadExpedicion: trabajador,
    ciudadResidencia: trabajador,
    codigoCiudadExpedicion: trabajador,
    codigoCiudadResidencia: trabajador,
    departamentoExpedicion: trabajador,
    departamentoResidencia: trabajador,
    direccion: trabajador,
    fechaIngreso: trabajador,
    fechaNacimiento: trabajador,
    fechaRetiro: trabajador,
    genero: trabajador,
    identificacion: trabajador,
    identificacionContratista: trabajador,
    idInternoExterno: trabajador,
    nombreContratista: trabajador,
    nombreTrabajador: trabajador,
    tipoIdentificacion: trabajador,
    tipoSangre: trabajador,
  };

  const historial = {
    id: idHistoria,
    idTrabajador: trabajador,
    fechaIngresoCargo: trabajador,
    fechaRetiroCargo: trabajador,
    fechaIngresoEmp: trabajador,
    fechaRetiroEmp: trabajador,
    genero: trabajador,
    cargo: trabajador,
    gerencia: trabajador,
    proceso: trabajador,
    turno: trabajador,
    jefeInmediato: trabajador,
    correo: trabajador,
    tipoContrato: trabajador,
  };

  return {
    ...trabajadorContratista,
    historial: { ...historial },
  };
};

export const transformarEvaluacion = (
  evaluacion: EvaluacionesInput,
  idEvaluacion: string,
  tipoEvaluacion: string
) => {
  const aspectos = evaluacion.aspectosEvaluar.map((eva) => {
    return {
      preguntaCodigo: eva.preguntaCodigo,
      puntaje: eva.puntaje,
      codigoPuntaje: buscarCodigoDePuntaje(
        Listas.listas,
        'puntajeEvaluar',
        'puntaje',
        eva.puntaje,
        'tipo'
      ),
    };
  });

  const numerador = aspectos
    .map((asp) => asp.puntaje)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return {
    id: idEvaluacion,
    idContratista: evaluacion.idContratista,
    aspectosEvaluar: aspectos,
    cedulaNit: evaluacion.cedulaNit,
    clasificacionContratista: evaluacion.clasificacionContratista,
    datosEvaluador: {
      cargoEvaluador: evaluacion.cargo,
      nombreEvaluador: evaluacion.nombreEvaluador,
    },
    descripcionCompra: evaluacion.descripcioncompra,
    fechaPeriodoEvaluarFinal: evaluacion.fechaPeriodoEvaluarFin.slice(0, 10),
    fechaElaboracion: evaluacion.fechaElaboracion.slice(0, 10),
    fechaPeriodoEvaluarInicio: evaluacion.fechaPeriodoEvaluarInicio.slice(
      0,
      10
    ),
    nombreContratista: evaluacion.nombreContratista,
    observaciones: evaluacion.observaciones,
    tipoBienCompra: evaluacion.tipoBienCompra,
    tipoCompra: evaluacion.tipodeCompra,
    tipoContratista: evaluacion.tipoContratista,
    totalEvaluacion: Number((numerador / aspectos.length).toFixed(1)),
    interpretacion: interpretacionEvaluacion(numerador / aspectos.length),
    tipoEvaluacion,
    estadoEva: numerador === 0 ? 'parcial' : 'completa',
  };
};

export const transformarEvaluacionExcel = (
  evaluacion: EvaluacionesInput,
  idEvaluacion: string,
  tipoEvaluacion: string
) => {
  const aspectos = evaluacion.aspectosEvaluar.map((eva) => {
    return {
      preguntaCodigo: eva.preguntaCodigo,
      puntaje: eva.puntaje,
      codigoPuntaje: buscarCodigoDePuntaje(
        Listas.listas,
        'puntajeEvaluar',
        'puntaje',
        eva.puntaje,
        'tipo'
      ),
    };
  });

  const numerador = aspectos
    .map((asp) => asp.puntaje)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return {
    ...evaluacion,
    aspectosEvaluar: aspectos,
    fechaPeriodoEvaluarFinal: evaluacion.fechaPeriodoEvaluarFin.slice(0, 10),
    fechaElaboracion: evaluacion.fechaElaboracion.slice(0, 10),
    fechaPeriodoEvaluarInicio: evaluacion.fechaPeriodoEvaluarInicio.slice(
      0,
      10
    ),
    totalEvaluacion: Number((numerador / aspectos.length).toFixed(1)),
    interpretacion: interpretacionEvaluacion(numerador / aspectos.length),
    tipoEvaluacion,
    estadoEva: numerador === 0 ? 'parcial' : 'completa',
  };
};

export const transformarEvaluaciones = (evaluacion: any) => {
  const {
    preguntaCodigo1,
    preguntaCodigo2,
    preguntaCodigo3,
    preguntaCodigo4,
    preguntaCodigo5,
    preguntaCodigo6,
    preguntaCodigo7,
    puntaje1,
    puntaje2,
    puntaje3,
    puntaje4,
    puntaje5,
    puntaje6,
    puntaje7,
    ...rest
  } = evaluacion;

  const aspectosEvaluar = [
    {
      preguntaCodigo: preguntaCodigo1,
      puntaje: Number(puntaje1),
    },
    {
      preguntaCodigo: preguntaCodigo2,
      puntaje: Number(puntaje2),
    },
    {
      preguntaCodigo: preguntaCodigo3,
      puntaje: Number(puntaje3),
    },
    {
      preguntaCodigo: preguntaCodigo4,
      puntaje: Number(puntaje4),
    },
    {
      preguntaCodigo: preguntaCodigo5,
      puntaje: Number(puntaje5),
    },
    {
      preguntaCodigo: preguntaCodigo6,
      puntaje: Number(puntaje6),
    },
    {
      preguntaCodigo: preguntaCodigo7,
      puntaje: Number(puntaje7),
    },
  ];

  return { ...rest, aspectosEvaluar };
};

export const transformarEvaluacionesContra = (evaluacion: any) => {
  const {
    preguntaCodigo1,
    preguntaCodigo2,
    preguntaCodigo3,
    preguntaCodigo4,
    preguntaCodigo5,
    puntaje1,
    puntaje2,
    puntaje3,
    puntaje4,
    puntaje5,
    ...rest
  } = evaluacion;

  const aspectosEvaluar = [
    {
      preguntaCodigo: preguntaCodigo1,
      puntaje: Number(puntaje1),
    },
    {
      preguntaCodigo: preguntaCodigo2,
      puntaje: Number(puntaje2),
    },
    {
      preguntaCodigo: preguntaCodigo3,
      puntaje: Number(puntaje3),
    },
    {
      preguntaCodigo: preguntaCodigo4,
      puntaje: Number(puntaje4),
    },
    {
      preguntaCodigo: preguntaCodigo5,
      puntaje: Number(puntaje5),
    },
  ];

  return { ...rest, aspectosEvaluar };
};
