import { ScrollView } from "react-native";
import styles from "../src/styles";
import LocationList from "../src/components/LocationList";

export default function AttendPoint() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: 24 }}
    >
      <LocationList />
      <LocationList />
      <LocationList />
      <LocationList />
      <LocationList />
    </ScrollView>
  );
}
