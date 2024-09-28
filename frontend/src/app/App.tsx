import { Suspense, lazy } from 'react';
import MainSkeleton from '@/app/comunes/informativos/skeletons/MainSkeleton';
import Cargando from '@/app/comunes/informativos/Cargando';

import Servidor from '../servidor/Servidor';
import { Container } from './interfaz/dashboard/estilos/Estilos';
import Dashboard from './interfaz/dashboard/page';
import { useUserStore } from './store/PrincipalStore';

const Content = {
  login: lazy(() => import('@/app/autenticacion/Login')),
};

const App = () => {
  const { autorizado, token } = useUserStore(({ autorizado, token }) => ({
    autorizado,
    token,
  }));

  if (!autorizado) {
    return (
      <Suspense fallback={<Cargando mensaje='Bienvenido(a)!' />}>
        <Content.login />
      </Suspense>
    );
  }

  return (
    <Servidor token={token}>
      <Container>
        <Suspense fallback={<MainSkeleton mensaje='Configurando la app...' />}>
          <Dashboard />
        </Suspense>
      </Container>
    </Servidor>
  );
};

export default App;
