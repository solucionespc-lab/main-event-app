import { gql } from 'graphql-tag';

const TrabajadoresContratistaSchema = gql`
  input FiltrosCursosInput {
    codigo: String!
    fechaTomaA: String
    fechaTomaB: String
    fechaVencimientoA: String
    fechaVencimientoB: String
    idContratista: String!
    idTrabajador: String!
  }

  input IDatosTrabajadorHistoria {
    estado: String!
    codigo: String!
    evidencias: [IEvidencia]
    fechaToma: String
    fechaVencimiento: String!
    id: String
    periodoVigencia: String

    cedulaNit: String!
    identificacion: String!
    nombreContratista: String!
    nombreTrabajador: String!
  }
  input IEvidencia {
    nombre: String
    url: String
  }
  input IHistorialTrabajador {
    actosAccidentesDescrip: String
    actosAccidentesFecha: String
    actosAccidentesIdentificacion: String
    actosInsegurosDescrip: String
    actosInsegurosFecha: String
    actosInsegurosIdentificacion: String
    cedulaTrabajador: String
    datosTrabajadorHistoria: [IDatosTrabajadorHistoria]
    estadoInduccion: String
    id: String
    identificacionContratista: String
    idTrabajador: String
  }

  input InputFiltroInformeOcupacionalContratista {
    gerencia: String
    gerenciasDeUsuario: [String]
    year: Int
  }
  input InputFiltroSociodemograficoYResumenContratista {
    cargo: String
    gerencia: String
    gerenciasDeUsuario: [String]
    proceso: String
    turno: String
    year: Int!
  }

  input InputFiltrosTrabajadoresContratista {
    ciudadExpedicion: String
    ciudadResidencia: String
    departamentoExpedicion: String
    departamentoResidencia: String
    genero: String
    identificacion: String
    identificacionContratista: String!
    rh: String
    activo: String
    porVencer: String
    vencido: String
  }

  input InputOcupacionalContratista {
    cargo: String
    correo: String
    fechaIngresoCargo: String
    fechaIngresoEmp: String
    fechaRetiroCargo: String
    fechaRetiroEmp: String
    genero: String
    gerencia: String
    id: ID
    idTrabajador: String
    jefeInmediato: String
    proceso: String
    tipoContrato: String
    turno: String
  }

  input InputTrabajadorContratista {
    activo: Boolean
    cargo: String
    cedulaNit: String
    ciudadExpedicion: String
    ciudadResidencia: String
    codigoCiudadExpedicion: String
    codigoCiudadResidencia: String
    departamentoExpedicion: String
    departamentoResidencia: String
    direccion: String
    fechaIngreso: String
    fechaNacimiento: String
    fechaRetiro: String
    genero: String
    identificacion: String
    identificacionContratista: String
    idInternoExterno: String
    idTrabajador: String
    nombreContratista: String
    nombreTrabajador: String
    rh: String
    tipoIdentificacion: String
    tipoSangre: String
  }

  type DatosTrabajadorHistoria {
    estado: String
    codigo: String
    evidencias: [Evidencia]
    fechaToma: String
    fechaVencimiento: String
    id: String
    periodoVigencia: String
  }

  type Evidencia {
    nombre: String
    url: String
  }

  type HistorialTrabajador {
    actosAccidentesDescrip: String
    actosAccidentesFecha: String
    actosAccidentesIdentificacion: String
    actosInsegurosDescrip: String
    actosInsegurosFecha: String
    actosInsegurosIdentificacion: String
    cedulaTrabajador: String
    datosTrabajadorHistoria: [DatosTrabajadorHistoria]
    estadoInduccion: String
    id: String
    identificacionContratista: String
    idTrabajador: String
  }

  type InformeOcupacionalContratista {
    antiguedad: GrupoGenero
    cargo: [SubOcupacional]
    gerencia: [SubOcupacional]
    proceso: [SubOcupacional]
    tipoContrato: [SubOcupacional]
    tipoGerencia: String
    totalTrabajadores: Int
    turno: [SubOcupacional]
    year: Int
  }

  type InformeSociodemograficoContratista {
    edad: GrupoGenero
    estadoCivil: [SubOcupacional]
    nivelEducativo: [SubOcupacional]
    numHijos: [SubOcupacional]
    profesion: [SubOcupacional]
    tipoGerencia: String
    totalTrabajadores: Int
    year: Int
  }

  type OcupacionalContratista {
    cargo: String
    correo: String
    fechaIngresoCargo: String
    fechaIngresoEmp: String
    fechaRetiroCargo: String
    fechaRetiroEmp: String
    genero: String
    gerencia: String
    id: ID
    idTrabajador: String
    jefeInmediato: String
    proceso: String
    tipoContrato: String
    turno: String
  }
  type TrabajadorContratista {
    activo: Boolean
    cargo: String
    cedulaNit: String
    ciudadExpedicion: String
    ciudadResidencia: String
    codigoCiudadExpedicion: String
    codigoCiudadResidencia: String
    departamentoExpedicion: String
    departamentoResidencia: String
    direccion: String
    fechaIngreso: String
    fechaNacimiento: String
    fechaRetiro: String
    genero: String
    identificacion: String
    identificacionContratista: String
    idInternoExterno: String
    idTrabajador: String
    nombreContratista: String
    nombreTrabajador: String
    rh: String
    tipoIdentificacion: String
    tipoSangre: String
  }

  input IDatosEventualidad {
    id: String
    descripcion: String
    fecha: String
    identificacion: String
    tipo: String
    year: Int
    codigo: String
  }

  type DatosEventualidad {
    id: String
    descripcion: String
    fecha: String
    identificacion: String
    tipo: String
    year: Int
  }
  input FiltrosEventualidadesInput {
    codigo: String!
    fechaTomaA: String
    fechaTomaB: String
    fechaVencimientoA: String
    fechaVencimientoB: String
    idContratista: String!
    idTrabajador: String!
  }

  extend type Query {
    getCursos(filtros: FiltrosCursosInput, year: Int): [DatosTrabajadorHistoria]
    getEventualidades(
      filtros: FiltrosEventualidadesInput
      year: Int
    ): [DatosEventualidad]
    getTrabajadorContratista(
      id: String!
      idContratista: String!
    ): TrabajadorContratista
    getTrabajadoresContratista(
      filtros: InputFiltrosTrabajadoresContratista!
    ): [TrabajadorContratista]
    getHistorialTrabajador(
      id: String!
      idContratista: String!
    ): [HistorialTrabajador]
  }

  extend type Mutation {
    importHistorialTrabajador(input: [IHistorialTrabajador]): RespuestaImport
    importTrabajadoresContratista(
      input: [InputTrabajadorContratista]
    ): RespuestaImport
    saveHistorialTrabajador(historial: [IHistorialTrabajador]): String
    saveTrabajadorContratista(input: InputTrabajadorContratista): String
    saveTrabajadorOnRedisContratista(
      input: [InputTrabajadorContratista]
    ): String
    trabajadoresContratistasAlistas(lista: [String]): String
    saveCursos(
      idTrabajador: String
      idContratista: String
      year: Int
      input: IDatosTrabajadorHistoria
    ): String
    saveEventualidad(
      idTrabajador: String
      idContratista: String
      input: IDatosEventualidad
    ): String
  }
`;

export default TrabajadoresContratistaSchema;
