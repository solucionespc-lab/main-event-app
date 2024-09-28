import { useState } from 'react';
import Condicional from '@/app/comunes/funcionales/Condicional';

import { iconografia } from '../recursos/Iconografia';
import {
  ContenedorFormulario,
  TarjetaLogin,
  Volver,
} from '../estilos/EstilosPrincipal';
import Informativos from './Informativos';
import Forms from './Forms';

import type { KeyFormat } from '../types/LoginTypes';

const Formulario = () => {
  const [formato, setFormato] = useState({
    opSeleccionada: 'login',
  });

  const cambiarFormato = (tipo: KeyFormat) => {
    setFormato({
      opSeleccionada: tipo,
    });
  };

  return (
    <TarjetaLogin>
      <Informativos name={formato.opSeleccionada} />

      <ContenedorFormulario>
        <Condicional condicion={formato.opSeleccionada !== 'login'}>
          <Volver
            tabIndex={0}
            onClick={() => cambiarFormato('login')}
            onKeyDown={(e: { key: string; }) => e.key === 'Enter' && cambiarFormato('login')}
          >
            {iconografia.flecha.path}
          </Volver>
        </Condicional>

        <Forms name={formato.opSeleccionada} />
      </ContenedorFormulario>
    </TarjetaLogin>
  );
};

export default Formulario;
