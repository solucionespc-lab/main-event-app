interface attachment {
  filename: string;
  path: string;
}

export interface CorreoType {
  delivery: {
    attemps: number;
    error: unknown;
    leaseExpireTime: {
      _nanoseconds: number;
      _seconds: number;
    };
    startTime: {
      _nanoseconds: number;
      _seconds: number;
    };
    state: string;
  };
  message: {
    attachments: attachment[];
    html: string;
    subject: string;
  };
  to: string;
}

export interface CorreosArgs {
  args: {
    fechaInicial: string;
    fechaFinal: string;
    para: string;
    estado: string;
  };
}

export interface EnviarCorreoArgs {
  args: {
    id: string;
    estado: string;
  };
}
