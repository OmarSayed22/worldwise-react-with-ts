import styles from "./CityList.module.css";

import CityItem from "../common/CityItem";

import Spinner from "../common/Spinner";
import Message from "../common/Message";
import { useOutletContext } from "react-router-dom";
import SidebarContext from "../../types/SidebarContext";

function CityList() {
  const { cities, isLoading } = useOutletContext<SidebarContext>();
  return (
    <ul className={styles.cityList}>
      {isLoading && <Spinner />}
      {cities.length === 0 && !isLoading && (
        <Message message="Add your fist city by clicking on a city on the map" />
      )}
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
