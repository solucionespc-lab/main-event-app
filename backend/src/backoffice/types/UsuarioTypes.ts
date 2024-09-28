interface ClaimsType {
  regional: string[];
  centro: string[];
  grupo: string;
  rol: string;
  organizacion: string;
  permisos: string;
  firma: string;
  correo: string;
}

export interface UserInput {
  input: {
    uid: string;
    email: string;
    emailVerified: boolean;
    nombre: string;
    tokens: string[];
    customClaims: ClaimsType;
  };
  password?: string;
}
