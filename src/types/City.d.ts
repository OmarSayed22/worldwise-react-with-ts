export type City = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes?: string;
  position: Position;
};
type Position = {
  lat: number;
  lng: number;
};
