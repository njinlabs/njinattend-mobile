import { Text, View } from "react-native";
import styles, { colors, fonts } from "../styles";
import Calendar from "../../assets/Calendar.svg";
import In from "../../assets/In.svg";
import Out from "../../assets/Out.svg";

export default function HistoryList() {
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
          <Calendar width={24} color={colors.primary[600]} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...fonts.montserratBold,
              color: colors.grayscale[800],
              fontSize: 16,
            }}
          >
            Senin
          </Text>
          <Text style={styles.baseText}>25 September 2023</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderColor: colors.grayscale[100],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <In
            width={16}
            style={{ marginRight: 8 }}
            color={colors.grayscale[800]}
          />
          <Text style={styles.baseText}>10:00</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Out
            width={16}
            style={{ marginRight: 8 }}
            color={colors.grayscale[800]}
          />
          <Text style={styles.baseText}>10:00</Text>
        </View>
      </View>
    </View>
  );
}
