import { LatLngExpression } from "leaflet";

export type LocationType = {
  id: number;
  name: string;
  address: string;
  longitude?: number;
  latitude?: number;
  latlong?: LatLngExpression;
};
