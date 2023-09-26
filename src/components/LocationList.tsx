import { Text, View } from "react-native";
import styles, { colors, fonts } from "../styles";
import Pin from "../../assets/Pin.svg";
import In from "../../assets/In.svg";
import Out from "../../assets/Out.svg";

export default function LocationList() {
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
            Sadar Office
          </Text>
          <Text style={styles.baseText}>12km</Text>
        </View>
      </View>
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
    </View>
  );
}
