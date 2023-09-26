import { Text, View } from "react-native";
import styles, { colors, fonts } from "../../src/styles";
import { Ionicons } from "@expo/vector-icons";
import MenuList from "../../src/components/MenuList";

export default function Setting() {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 24,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.grayscale[100],
            width: 84,
            height: 84,
            borderRadius: 84 / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="md-person-outline"
            size={32}
            color={colors.grayscale[400]}
          />
        </View>
        <Text
          style={{
            ...fonts.montserratBold,
            fontSize: 16,
            color: colors.grayscale[800],
            marginTop: 16,
          }}
        >
          Akbar Aditama S.P.
        </Text>
        <Text style={{ ...styles.baseText, marginTop: 4, marginBottom: 2 }}>
          Software Engineer
        </Text>
        <Text style={styles.baseText}>836827674</Text>
      </View>
      <View
        style={{
          marginVertical: 12,
          paddingLeft: 16,
          paddingBottom: 24,
          paddingTop: 8,
          backgroundColor: colors.white,
        }}
      >
        <MenuList icon="lock-closed-outline">Ganti Password</MenuList>
        <MenuList icon="log-out-outline">Keluar</MenuList>
      </View>
    </View>
  );
}
