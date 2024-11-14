import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import useCities from "../../hooks/useCities";
import { useEffect } from "react";
import Message from "./Message";

const formatDate = (date: string | number) => {
  console.log(date);
  const parsedDate = typeof date === "string" ? parseInt(date) : date;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(parsedDate));
};

function CityComponent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { city, getCityById, isLoading, error } = useCities();

  useEffect(() => {
    if (id) {
      getCityById(id);
    }
  }, [id]);
  console.log(city);

  const { cityName, emoji, date, notes } = city;
  if (isLoading) return <Spinner />;
  if (error) {
    return <Message message={error || ""} />;
  }
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {date && <p>{formatDate(date)}</p>}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          btnType="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default CityComponent;
