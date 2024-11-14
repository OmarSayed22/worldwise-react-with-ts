import { useSearchParams } from "react-router-dom";
import Position from "../types/Position";

export default function useUrlPosition(): Position {
  const [searchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  return [lat, lng];
}
