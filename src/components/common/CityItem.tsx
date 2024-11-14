import { Link } from "react-router-dom";
import { City } from "../../types/City";
import styles from "./CityItem.module.css";
import useCities from "../../hooks/useCities";
interface CityItemProps {
  city: City;
}

export default function CityItem({ city }: CityItemProps) {
  const { city: currentCity, deleteCity } = useCities();

  function deleteCityHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (city.id) {
      deleteCity(city.id);
    }
  }
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles["cityItem--active"] : ""
        } `}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3>{city.cityName}</h3>
        <p>( {new Date(city.date).toDateString()} )</p>
        <button className={styles.deleteBtn} onClick={deleteCityHandler}>
          x
        </button>
      </Link>
    </li>
  );
}
