import ShortUniqueId from "short-unique-id";
import ApiCity from "../types/ApiCity";
import { City } from "../types/City";
import { convertToEmoji } from "./convertToEmoji";

export function toCity(apiCity: ApiCity): City {
  const uid = new ShortUniqueId({
    length: 8,
    dictionary: "number",
  });
  console.log(convertToEmoji("us"));
  return {
    id: uid.rnd(),
    cityName: apiCity.city,
    country: apiCity.countryName,
    emoji: convertToEmoji(apiCity.countryCode),
    date: `${Date.now()}`,
    position: {
      lat: apiCity.latitude,
      lng: apiCity.longitude,
    },
  };
}
