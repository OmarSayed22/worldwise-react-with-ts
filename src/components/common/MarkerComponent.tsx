import { Marker, Popup } from "react-leaflet";
import Position from "../../types/Position";

function MarkerComponent({ position }: { position: Position }) {
  return (
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

export default MarkerComponent;
