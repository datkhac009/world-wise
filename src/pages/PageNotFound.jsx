import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1>404</h1>
      <h2>Page not found 😢</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className={styles.button}>
        &larr; Go back home
      </Link>
    </div>
  );
}
