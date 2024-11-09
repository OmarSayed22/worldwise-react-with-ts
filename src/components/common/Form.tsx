// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import useCities from "../../hooks/useCities";

function Form() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const {
    isLoadingGeoCoding,
    geoCodingsError,
    getCity,
    cityToAdd,
    addCity,
    AddCityError,
    isLoadingAddCity,
  } = useCities();

  useEffect(
    function () {
      console.log("get city");
      getCity(lat, lng);
      setCityName(cityToAdd.cityName);
    },
    [cityToAdd.cityName, lat, lng]
  );

  async function addCityHandler(e: React.FormEvent) {
    e.preventDefault();
    await addCity({
      ...cityToAdd,
      date: date.toLocaleDateString(),
      notes: notes,
    });
    navigate("/app/cities");
  }
  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  if (geoCodingsError) {
    console.log(geoCodingsError);
    return <Message message={geoCodingsError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoadingAddCity ? styles.loading : ""}`}
      onSubmit={addCityHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{cityToAdd.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button btnType="primary" type="submit">
          {isLoadingAddCity ? "Loading..." : "Add"}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          btnType="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
