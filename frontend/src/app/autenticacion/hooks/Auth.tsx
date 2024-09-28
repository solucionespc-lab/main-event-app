import { useEffect } from 'react';
import { type User } from 'firebase/auth';
import { auth } from '@/app/configuraciones/Firebase';
import { useUserStore } from '@/app/store/PrincipalStore';
import { toast } from 'sonner';

const useAutenticacion = () => {
  const guardarUsuario = useUserStore(({ guardarUsuario }) => guardarUsuario);
  let autorizado = false;

  const autorizarIngreso = (user: User): void => {
    const userToken = user.getIdTokenResult();

    userToken
      .then((userData) => {
        autorizado = true;
        guardarUsuario(userData);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    const unSubscribe = auth.onIdTokenChanged((user) => {
      if (user === null) {
        return;
      }

      if (user?.emailVerified) {
        autorizarIngreso(user);
      } else {
        toast.error(
          'Debes verificar la cuenta de correo para ingresar a la herramienta'
        );
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    autorizado,
  };
};

export default useAutenticacion;
