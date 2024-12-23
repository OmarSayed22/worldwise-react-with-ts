import styles from "./CountryList.module.css";
import Spinner from "../common/Spinner";
import Message from "../common/Message";
import CountryItem from "../common/CountryItem";
import Country from "../../types/Country";
import useCities from "../../hooks/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();
  const countries = cities.reduce((acc, city) => {
    const isCountryExist = acc.some((el) => el.country === city.country);
    if (!isCountryExist) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, [] as Country[]);
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {isLoading && <Spinner />}
      {cities.length === 0 && !isLoading && (
        <Message message="Add your fist city by clicking on a city on the map" />
      )}
      {countries.map((Country) => (
        <CountryItem country={Country} key={Country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
