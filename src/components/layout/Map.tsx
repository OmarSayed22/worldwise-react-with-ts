import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  function handelClick() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={() => handelClick()}>
      Position: Lat: {lat}
      Lng:{lng}
    </div>
  );
}

export default Map;
