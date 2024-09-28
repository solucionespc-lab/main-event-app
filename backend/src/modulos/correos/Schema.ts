import { gql } from 'graphql-tag';

const CorreosSchema = gql`
  type TimeStampType {
    _seconds: Int
    _nanoseconds: Int
  }

  type AttachmentType {
    filename: String
    path: String
  }

  type DeliveryType {
    attemps: Int
    error: String
    leaseExpireTime: TimeStampType
    startTime: TimeStampType
    state: String
  }

  type MessageType {
    attachments: [AttachmentType]
    html: String
    subject: String
  }

  type Correo {
    delivery: DeliveryType
    message: MessageType
    to: String
    id: ID
  }

  input CorreoInput {
    fechaInicial: String
    fechaFinal: String
    para: String
    estado: String
  }

  input EnviarCorreoInput {
    id: String
    estado: String
  }

  extend type Query {
    getCorreos(args: CorreoInput): [Correo]
  }

  extend type Mutation {
    saveCorreos(args: EnviarCorreoInput): String
  }
`;

export default CorreosSchema;
