import { City } from "../../types/City";
import styles from "./CityItem.module.css";
interface CityItemProps {
  city: City;
}

export default function CityItem({ city }: CityItemProps) {
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji}</span>
      <h3>{city.cityName}</h3>
      <p>( {new Date(city.date).toDateString()} )</p>
      <button className={styles.btn}>x</button>
    </li>
  );
}
