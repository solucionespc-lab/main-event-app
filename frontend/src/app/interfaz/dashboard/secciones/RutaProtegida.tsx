import { Suspense } from 'react';
import usePermisos from '@/app/hooks/Permisos';
import ModuloSkeleton from '@/app/comunes/informativos/skeletons/ModuloSkeleton';
import Denegado from '@/app/comunes/informativos/Denegado';

import { componentes } from './ModulosLazy';

import type { ProtectedProps } from '../types/DashboardTypes';

const RutaProtegida = ({ modulo }: ProtectedProps) => {
  const { accesoModulos } = usePermisos();
  const tienePermiso = accesoModulos.includes(modulo);
  const Componente = componentes[modulo];

  if (!tienePermiso) return <Denegado />;

  return (
    <Suspense fallback={<ModuloSkeleton />}>
      <Componente />
    </Suspense>
  );
};

export default RutaProtegida;
