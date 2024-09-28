import { shield } from 'graphql-shield';

import reglas from '../seguridad/Reglas';

export default shield(reglas, {
  allowExternalErrors: true,
  fallbackError: 'No se encuentra autorizado',
});
