import { ContenedorLogin } from './estilos/EstilosPrincipal';

import Formulario from './secciones/Principal';
import useAutenticacion from './hooks/Auth';

const Login = () => {
  useAutenticacion();

  return (
    <ContenedorLogin>
      <Formulario />
    </ContenedorLogin>
  );
};

export default Login;
