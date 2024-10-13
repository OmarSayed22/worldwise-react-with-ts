import Logo from "../common/Logo";
import styles from "./PageNav.module.css";
import { NavLink, Link } from "react-router-dom";
export default function PageNav() {
  return (
    <main className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <Link to="/login" className={styles.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </main>
  );
}
