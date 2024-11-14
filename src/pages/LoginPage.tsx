import { useEffect, useState } from "react";
import PageNav from "../components/layout/PageNav";
import useAuth from "../hooks/useAuth";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import Error from "../components/common/Error";
import Button from "../components/common/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated]);

  function handleClick() {
    login({ email, password });
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.form}>
        {error && <Error error={error} />}
        <div className={styles.row}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button btnType="primary" onClick={handleClick}>
          Login
        </Button>
      </div>
    </main>
  );
}
