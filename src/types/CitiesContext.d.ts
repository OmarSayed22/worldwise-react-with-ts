import { City } from "./City";

type CitiesContextType = {
  cities: City[];
  city: City;
  isLoading: boolean;
  error: string | null;
  getCityById: (cityId: string) => Promise<void>;
  getCityByPosition: (position: Position) => Promise<void>;
  addCity: (city: City) => Promise<void>;
  deleteCity: (cityId: string) => Promise<void>;
};

export default CitiesContextType;
