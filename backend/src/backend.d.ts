import { DecodedIdToken } from 'firebase-admin/auth';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Tipo de resolución para las funciones de GraphQL.
 *
 * @template A El tipo de argumentos que la función de resolución acepta.
 *
 * @param {unknown} parent - El objeto padre en la resolución de GraphQL, cuyo tipo es desconocido.
 * @param {A} args - Agrega el tipado de los argumentos de las Queries y Mutations de la función asíncrona
 * @param {R} args - Agregar el tipado del valor de retorno de las Queries y Mutations de la función asíncrona
 * @param {DecodedIdToken} context - El token decodificado que se pasa como contexto.
 * @param {GraphQLResolveInfo} info - La información de la resolución de GraphQL.
 *
 * @returns {Promise<R>} Una promesa que devuelve el tipo de datos implementado del resolver.
 */

interface IContext {
  token: DecodedIdToken;
}

declare type ResolverArgs<A, R> = (
  parent: unknown,
  args: A,
  context: IContext,
  info: GraphQLResolveInfo
) => Promise<R>;
