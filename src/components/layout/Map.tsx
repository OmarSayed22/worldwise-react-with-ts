import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { TileLayer, MapContainer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "../common/MarkerComponent";
import useCities from "../../hooks/useCities";
import { useEffect, useState } from "react";
import Position from "../../types/Position";
import { LeafletMouseEvent } from "leaflet";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "../common/Button";
import useUrlPosition from "../../hooks/useUrlPosition";

function Map() {
  const [markerPosition, setMarkerPosition] = useState<Position>([0, 0]);
  const navigate = useNavigate();
  const { cities } = useCities();
  const {
    isLoading,
    position: [currantLat, currentLng],
    getPosition: getCurrentPosition,
    error,
  } = useGeolocation([0, 0]);

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setMarkerPosition([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (currantLat && currentLng) {
      setMarkerPosition([currantLat, currentLng]);
      navigate(`form?lat=${currantLat}&lng=${currentLng}`);
    }
  }, [currantLat, currentLng]);

  function handleClickPosition(pos: Position) {
    setMarkerPosition(pos);
  }
  return (
    <div className={styles.mapContainer}>
      <Button onClick={getCurrentPosition} btnType="position">
        {isLoading
          ? "Loading..."
          : error
          ? error.toString()
          : "Get Current Location"}
      </Button>
      <MapContainer
        center={markerPosition}
        zoom={18}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map(({ position, id }) => (
            <MarkerComponent position={[position.lat, position.lng]} key={id} />
          ))}
        {<MarkerComponent position={markerPosition} />}
        <ChangePosition position={markerPosition} />
        <DetectClick onclickPosition={handleClickPosition} />
      </MapContainer>
    </div>
  );
}
function ChangePosition({ position }: { position: Position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({
  onclickPosition,
}: {
  onclickPosition: (pos: Position) => void;
}) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      onclickPosition([e.latlng.lat, e.latlng.lng]);

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
