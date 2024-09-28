import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import useErrorNotification from '@/app/hooks/ErrorNotification';

import styles from '../estilos/EstErrores.module.css';

const ErrorFallback = ({ error }: FallbackProps) => {
  useErrorNotification({ error });
  const navigate = useNavigate();

  return (
    <main className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        Lo sentimos, se presentó un problema en la aplicación y ya hemos
        comunicado al equipo de soporte.
      </h1>

      <p className={styles.errorDescription}>
        Los cambios que ha realizado con anterioridad se encuentran registrados,
        sin embargo, si el error persiste puede comunicarse a través del{' '}
        <strong>Chat de soporte</strong> o por{' '}
        <strong>Correo electrónico</strong>
      </p>

      <section className={styles.errorDescriptionContainer}>
        <button
          type='button'
          className={styles.errorSupport}
          onClick={() => navigate('/soporte')}
        >
          Chat de soporte
        </button>
        <a
          target='_blank'
          rel='noreferrer'
          className={styles.errorSupport}
          href='mailto:soporte@pcsoluciones.com.co?Subject=Reporte de error en BIOD-SST'
        >
          Reportar por correo
        </a>
        <button
          type='button'
          className={styles.errorButton}
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        >
          Restaurar el servicio
        </button>
      </section>
    </main>
  );
};

export default ErrorFallback;
