import client from "../../client";
import { IndexData } from "../../index-data";
import { LocationType } from "../../models/location";

type LocationIndexParams = {
  page?: number;
  latitude: number;
  longitude: number;
};

export default function locationIndex({
  page = 1,
  latitude,
  longitude,
}: LocationIndexParams): Promise<IndexData<LocationType>> {
  return client
    .get("/api/location", {
      params: {
        page,
        latitude,
        longitude,
      },
    })
    .then((response) => response.data);
}
