import { ButtonProps } from '@/app/autenticacion/types/LoginTypes';
import { ButtonStyle, Icon } from '@/app/autenticacion/estilos/EstilosLogin';

import { iconografia } from '../recursos/Iconografia';

const LoginButton = ({ style, name, loading }: ButtonProps) => {
  if (loading) return <p>Autenticando..</p>;

  return (
    <ButtonStyle type="submit" style={style}>
      <Icon>{iconografia.candadoAbierto.path}</Icon>
      {name}
    </ButtonStyle>
  );
};

export default LoginButton;
