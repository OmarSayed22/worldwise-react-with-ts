import { City } from "./City";

type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  setCurrentCityId: React.Dispatch<React.SetStateAction<number | null>>;
  currentCity: City;
  currentCityLoading: boolean;
  isLoadingGeoCoding: boolean;
  geoCodingsError: string | null;
  isLoadingAddCity: boolean;
  addCityError: string | null;
  cityToAdd: City;
  getCity: (lat: number, lng: number) => void;
  addCity: (city: City) => void;
  deleteCity: (city: City) => void;
};

export default CitiesContextType;
