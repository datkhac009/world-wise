import styles from './Loading.module.css'
function Loading({ fullScreen = false, label = "Loading...", className = "" }) {
  const rootClass = fullScreen ? styles.overlay : styles.inline;
  return (
    <div
      className={`${rootClass} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner} />
      <p className={styles.text}>{label}</p>
    </div>
  );
}

export default Loading;
