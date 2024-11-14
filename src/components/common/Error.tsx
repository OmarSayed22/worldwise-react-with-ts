import styles from "./Error.module.css";

export default function Error({ error }: { error: string }) {
  return (
    <div className={styles.error}>
      <span>❌</span> <p>{error}</p>
    </div>
  );
}
