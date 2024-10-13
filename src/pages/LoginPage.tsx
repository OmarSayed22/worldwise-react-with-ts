import PageNav from "../components/layout/PageNav";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Password</label>
          <input type="text" id="email" />
        </div>
      </div>
    </main>
  );
}
