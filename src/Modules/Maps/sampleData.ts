import { GeoJSON } from "geojson";
export type MapConfig = {
  avatar: string;
  maxZoom: number;
  minZoom: number;
  style: string;
  accessToken: string;
  title: string;
  type?: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export const locationLokeren: Location = {
  lat: 10.078110,
  lng: 105.217683
};

export const mapConfig: MapConfig = {
  avatar: "",
  maxZoom: 30,
  minZoom: 5,
  type: "vector",
  style: "mapbox://styles/mapbox/streets-v11",
  accessToken:"pk.eyJ1IjoiZG9xdW9jZHVuZzk3IiwiYSI6ImNsc3VpNTM2NTA1NWkya25xb2ViOWJsc3UifQ.ukCyN8eUdVvWk4rejHP3tQ",
  // style: "mapbox://styles/jasper8vercnocke/ckgj6jez2119s19mphno725x4",
  // accessToken: "pk.eyJ1IjoiamFzcGVyOHZlcmNub2NrZSIsImEiOiJjazFnNHd5bHEwanhxM2xxbGpyM2lubGVvIn0.0bupq1xoTuqYx8B1vG_azw",
  title: "GRB"
};