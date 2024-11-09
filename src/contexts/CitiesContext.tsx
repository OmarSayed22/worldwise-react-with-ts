import { createContext, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { City } from "../types/City";
import CitiesContextType from "../types/CitiesContext";
import ApiCity from "../types/ApiCity";
import { toCity } from "../utils/mappers";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);
function CitiesProvider({ children }: { readonly children: React.ReactNode }) {
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingsError, setGeoCodingsError] = useState<string | null>(null);
  const [cityToAdd, setCityToAdd] = useState<City>({} as City);
  const [isLoadingAddCity, setIsLoadingAddCity] = useState(false);
  const [addCityError, setAddCityError] = useState<string | null>(null);
  const {
    data: cities,
    setData: setCities,
    isLoading,
  } = useFetch<City[]>([], `${BASE_URL}/cities`);
  const [currentCityId, setCurrentCityId] = useState<number | null>(null);
  const { data: currentCity, isLoading: currentCityLoading } = useFetch<City>(
    {} as City,
    `${BASE_URL}/cities/${currentCityId}`
  );

  async function getCity(lat: number, lng: number) {
    try {
      setIsLoadingGeoCoding(true);
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      const data = (await response.json()) as ApiCity;

      if (data) {
        setCityToAdd(toCity(data));
      }
      setIsLoadingGeoCoding(false);
    } catch (error) {
      setGeoCodingsError(error as string);
    } finally {
      setIsLoadingGeoCoding(false);
    }
  }

  async function addCity(city: City) {
    try {
      setIsLoadingAddCity(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      if (data) {
        setCities((cities) => [...cities, data]);
      }
      setIsLoadingAddCity(false);
    } catch (error) {
      setAddCityError(error as string);
    } finally {
      setIsLoadingAddCity(false);
    }
  }

  const contextValue = useMemo(
    () => ({
      cities,
      isLoading,
      setCurrentCityId,
      currentCity,
      currentCityLoading,
      isLoadingGeoCoding,
      isLoadingAddCity,
      geoCodingsError,
      addCityError,
      cityToAdd,
      getCity,
      addCity,
    }),
    [
      addCityError,
      cities,
      cityToAdd,
      currentCity,
      currentCityLoading,
      geoCodingsError,
      isLoading,
      isLoadingAddCity,
      isLoadingGeoCoding,
    ]
  );

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
