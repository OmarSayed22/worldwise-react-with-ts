import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import PageNav from "../components/layout/PageNav";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  return (
    <main className={styles.home}>
      <PageNav />
      <section>
        <h1>
          You Travel the world
          <br />
          worldWise keeps track of your adventures
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={isAuthenticated ? "/app" : "/login"} className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
