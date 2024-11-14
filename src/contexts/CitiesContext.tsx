import { createContext, useEffect, useMemo, useReducer } from "react";
import { City } from "../types/City";
import CitiesContextType from "../types/CitiesContext";
import ApiCity from "../types/ApiCity";
import { toCity } from "../utils/mappers";
import Position from "../types/Position";

const BASE_URL = "http://localhost:8000";

enum Action {
  GET_CITY_BY_POSITION = "GET_CITY_BY_POSITION",
  GET_CITY_BY_ID = "GET_CITY_BY_ID",
  GET_CITIES = "GET_CITIES",
  ADD_CITY = "ADD_CITY",
  DELETE_CITY = "DELETE_CITY",
  LOADING = "LOADING",
  REJECTED = "REJECTED",
}
type State = {
  cities: City[];
  city: City;
  isLoading: boolean;
  error: string | null;
};

type ActionTypes =
  | { type: Action.GET_CITY_BY_POSITION; payload: City }
  | { type: Action.GET_CITY_BY_ID; payload: City }
  | { type: Action.GET_CITIES; payload: City[] }
  | { type: Action.ADD_CITY; payload: City }
  | { type: Action.DELETE_CITY; payload: string }
  | { type: Action.LOADING; payload?: boolean }
  | { type: Action.REJECTED; payload: string };

function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    case Action.LOADING:
      return { ...state, isLoading: true };
    case Action.GET_CITY_BY_POSITION:
      return { ...state, city: action.payload, isLoading: false };
    case Action.GET_CITY_BY_ID:
      return { ...state, city: action.payload, isLoading: false };
    case Action.GET_CITIES:
      return { ...state, cities: action.payload, isLoading: false };
    case Action.ADD_CITY:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        city: action.payload,
      };
    case Action.DELETE_CITY:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        city: {} as City,
      };
    case Action.REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error(`Unknown action type`);
  }
}

const initialState: State = {
  cities: [],
  city: {} as City,
  isLoading: false,
  error: null,
};

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);
function CitiesProvider({ children }: { readonly children: React.ReactNode }) {
  const [{ cities, city, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: Action.LOADING });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as City[];
        if (data) {
          dispatch({ type: Action.GET_CITIES, payload: data });
        }
      } catch (error) {
        dispatch({ type: Action.REJECTED, payload: error as string });
      }
    }
    fetchCities();
  }, []);
  async function getCityByPosition(position: Position) {
    console.log(position);
    try {
      dispatch({ type: Action.LOADING });

      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position[0]}&longitude=${position[1]}`;

      const response = await fetch(url);
      const data = (await response.json()) as ApiCity;
      console.log(data);
      if (data) {
        dispatch({ type: Action.GET_CITY_BY_POSITION, payload: toCity(data) });
      }
    } catch (error) {
      dispatch({ type: Action.REJECTED, payload: error as string });
    }
  }
  async function getCityById(cityId: string) {
    if (cityId === city.id) {
      return;
    }
    dispatch({ type: Action.LOADING });
    try {
      const url = `${BASE_URL}/cities/${cityId}`;
      console.log(url);
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);

      if (data) {
        dispatch({ type: Action.GET_CITY_BY_ID, payload: data });
      }
    } catch (error) {
      dispatch({ type: Action.REJECTED, payload: error as string });
    }
  }

  async function addCity(city: City) {
    try {
      dispatch({ type: Action.LOADING });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = (await res.json()) as City;
      if (data) {
        dispatch({ type: Action.ADD_CITY, payload: data });
      }
    } catch (error) {
      dispatch({ type: Action.REJECTED, payload: error as string });
    }
  }

  async function deleteCity(cityId: string) {
    console.log(cityId);
    try {
      // dispatch({ type: Action.LOADING });
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data) {
        dispatch({ type: Action.DELETE_CITY, payload: cityId });
      }
    } catch (error) {
      dispatch({ type: Action.REJECTED, payload: error as string });
    }
  }
  const contextValue = useMemo(
    () => ({
      cities,
      city,
      isLoading,
      error,
      getCityByPosition,
      getCityById,
      addCity,
      deleteCity,
    }),
    [cities, isLoading, city, error]
  );

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}
export { CitiesProvider, CitiesContext };
