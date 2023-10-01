import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useApi } from "../src/api/api";
import locationIndex from "../src/api/requests/location/location-index";
import LocationList from "../src/components/LocationList";
import { useAppDispatch } from "../src/redux/hooks";
import { hideLoading, showLoading } from "../src/redux/slices/interface";
import styles from "../src/styles";
import NotFound from "../src/components/NotFound";

export default function AttendPoint() {
  const [locationError, setLocationError] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();
  const dispatch = useAppDispatch();

  const locationIndexApi = useApi({
    api: locationIndex,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    if (location) {
      await locationIndexApi.withoutReset().process({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setRefreshing(false);
    }
  };

  useEffect(() => {
    dispatch(showLoading());

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationError(false);
      } else {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      (async () => {
        await locationIndexApi.process({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        dispatch(hideLoading());
      })();
    }
  }, [location]);

  if (locationError)
    return (
      <View
        style={{
          ...styles.container,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.baseText}>Lokasi tidak diizinkan</Text>
      </View>
    );

  if (!locationIndexApi.data?.rows.length)
    return (
      <NotFound
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      />
    );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
      data={locationIndexApi.data?.rows || []}
      style={styles.container}
      keyExtractor={(_, index) => `${index}`}
      contentContainerStyle={{ paddingTop: 24 }}
      renderItem={({ item }) => (
        <LocationList
          name={item.name!}
          distance={item.distance!}
          latitude={item.latitude!}
          longitude={item.longitude!}
        />
      )}
    />
  );
}
