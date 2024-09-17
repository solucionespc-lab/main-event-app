import styles from './(estilos)/Admin.module.css'
import Main from './(main)/Main';

export default function Home() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedor_upperbar}>Upperbar</div>
      <div className={styles.contenedor_sidebar}>Sidebar</div>
      <Main />
    </div>
  );
}
