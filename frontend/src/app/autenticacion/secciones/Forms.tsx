import { KeyFormat } from '@/app/autenticacion/types/LoginTypes';

import FormLogin from './fomularios/FormLogin';

const component = {
  login: <FormLogin />,
};

const Forms = ({ name }: { name: string }) => (
  <>{component[name as KeyFormat]}</>
);

export default Forms;
