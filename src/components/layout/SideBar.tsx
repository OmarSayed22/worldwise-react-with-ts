import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./SideBar.module.css";
import Logo from "../common/Logo";
import { City } from "../../types/City";
import useFetch from "../../hooks/useFetch";

export default function SideBar() {
  const { value: cities, isLoading } = useFetch<City[]>([]);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet context={{ cities, isLoading }} />
      <Footer />
    </div>
  );
}
