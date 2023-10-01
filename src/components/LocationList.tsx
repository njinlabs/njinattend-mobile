import {
  Linking,
  Platform,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Pin from "../../assets/Pin.svg";
import styles, { colors, fonts } from "../styles";

type LocationListProps = {
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
};

export default function LocationList({
  name,
  distance,
  latitude,
  longitude,
}: LocationListProps) {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        marginHorizontal: 24,
        marginBottom: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.grayscale[300],
      }}
    >
      <View
        style={{
          padding: 24,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginRight: 16,
            width: 48,
            height: 48,
            borderRadius: 48 / 2,
            backgroundColor: colors.primary[100],
            borderWidth: 1,
            borderColor: colors.primary[200],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pin width={24} color={colors.primary[600]} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...fonts.montserratBold,
              color: colors.grayscale[800],
              fontSize: 16,
            }}
          >
            {name}
          </Text>
          <Text style={styles.baseText}>
            {distance < 1 && "<"}
            {Math.ceil(distance)} km
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(
            Platform.select({
              ios: `http://maps.apple.com/?daddr=${latitude},${longitude}`,
              android: `http://maps.google.com/?daddr=${latitude},${longitude}`,
              default: "",
            })
          );
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderColor: colors.grayscale[100],
            alignItems: "center",
          }}
        >
          <Text style={{ ...fonts.robotoBold, color: colors.blue[500] }}>
            Lihat Rute
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
