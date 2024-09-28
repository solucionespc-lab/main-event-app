import LOGO from '@/assets/react.svg';

import { Company, DescCont, Informacion } from '../../estilos/EstilosInfo';

const InforPrincipal = () => (
  <Informacion>
    <DescCont>
      <Company
        src={LOGO}
        alt={`Logo de la empresa - ${import.meta.env.VITE_WEBSITE_NAME}`}
      />
    </DescCont>
  </Informacion>
);

export default InforPrincipal;
