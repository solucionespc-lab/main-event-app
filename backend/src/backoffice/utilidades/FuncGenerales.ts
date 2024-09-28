import { ListadosType } from '../types/ListasType';

export const buscarCodigoDeLista = (
  listado: ListadosType['listas'],
  nombreLista: keyof ListadosType['listas'],
  campoABuscar: string,
  palabraABuscar: string,
  campoADevolver: string
) => {
  const validar = Object.values(listado[nombreLista])?.find(
    (campo) => campo?.[campoABuscar] === palabraABuscar
  );

  return validar ? validar?.[campoADevolver] : '';
};

export const buscarCodigoDePuntaje = (
  listado: ListadosType['listas'],
  nombreLista: keyof ListadosType['listas'],
  campoABuscar: string,
  puntajeABuscar: number,
  campoADevolver: string
) => {
  const validar = Object.values(listado[nombreLista])?.find(
    (campo) => campo?.[campoABuscar] === puntajeABuscar
  );

  return validar ? validar?.[campoADevolver] : '';
};
