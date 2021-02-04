import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../variables";

export const geocodingAPI = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/",
  params: {
    access_token: MAPBOX_ACCESS_TOKEN,
  },
});
