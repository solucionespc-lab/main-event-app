import { gql } from 'graphql-tag';

const BOTrabajadoresSchema = gql`
  input BOTrabajadoresInput {
    cedula: String
    nombre: String
    genero: String
    fechaNacimiento: String
    estadoCivil: String
    numHijos: String
    nivelEducativo: String
    profesion: String
    nombreContacto: String
    numContacto: String
    grupoSanguineo: String
    rh: String
    correo: String
    turnoActual: String
    cargo: String
    jefeInmediato: String
    tipoContrato: String
    fechaIngresoEmp: String
    procesoActual: String
    gerencia: String
  }

  input EvidenciaInput {
    url: String
    nombre: String
  }

  input BOTrabContratistasInput {
    cedula: String
    nombre: String
    genero: String
    fechaNacimiento: String
    estadoCivil: String
    numHijos: String
    nivelEducativo: String
    profesion: String
    nombreContacto: String
    numContacto: String
    grupoSanguineo: String
    rh: String
    correo: String
    turnoActual: String
    cargo: String
    jefeInmediato: String
    tipoContrato: String
    fechaIngresoEmp: String
    codigoResidencia: String
    actosAccidentesDescrip: String
    actosAccidentesFecha: String
    actosAccidentesIdentificacion: String
    actosInsegurosDescrip: String
    actosInsegurosFecha: String
    actosInsegurosIdentificacion: String
    cedulaTrabajador: String
    estadoInduccion: String
    estado: String
    codigo: String
    evidencias: [EvidenciaInput]
    fechaToma: String
    fechaVencimiento: String
    id: String
    periodoVigencia: String
  }

  extend type Mutation {
    saveBOTrabajadores(BOTrabajadoresInput: [BOTrabajadoresInput]): String
    saveBOTrabContratistas(
      BOTrabContratistasInput: [BOTrabContratistasInput]
    ): String
  }
`;

export default BOTrabajadoresSchema;
