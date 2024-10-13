import Map from "../components/layout/Map";
import SideBar from "../components/layout/SideBar";

import styles from "./AppLayout.module.css";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
