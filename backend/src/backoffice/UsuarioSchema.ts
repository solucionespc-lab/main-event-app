import { gql } from 'graphql-tag';

const BOUsuarioSchema = gql`
  enum GrupoType {
    propietario
    cliente
    proveedor
    soporte
  }

  input UsuarioInput {
    uid: String
    email: String!
    emailVerified: Boolean!
    nombre: String!
    tipo: String!
    tokens: [String]!
    customClaims: ClaimsInput
  }

  input ClaimsInput {
    regional: [String]
    centro: [String]
    grupo: GrupoType
    rol: String
    organizacion: String
    permisos: String
    firma: String
    cargo: String
  }

  type Usuario {
    uid: String
    email: String
    emailVerified: Boolean
    nombre: String
    tipo: String
    tokens: [String]
    customClaims: Claims
  }

  type Claims {
    regional: [String]
    centro: [String]
    grupo: GrupoType
    rol: String
    organizacion: String
    permisos: String
    firma: String
    cargo: String
  }

  extend type Query {
    getUsuarios: [Usuario]
    getUsuario(id: String): Usuario
  }

  extend type Mutation {
    saveUsuario(input: UsuarioInput, password: String): String
  }
`;

export default BOUsuarioSchema;
