import { StateCreator, create } from 'zustand';
import { LoggedUser } from '@/app/configuraciones/types/SeguridadTypes';

import { TStoreUser } from './types/ContextoTypes';
import { estadoInicialPrincipal } from './constantes/ContextoConst';

const storeUser: StateCreator<TStoreUser> = (set) => ({
	...estadoInicialPrincipal,
	guardarUsuario: (usuario) => {
		set({ usuario: usuario as LoggedUser, autorizado: true, token: usuario.token });
	},
});

export const useUserStore = create(storeUser);
