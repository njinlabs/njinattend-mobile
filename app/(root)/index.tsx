import { useFocusEffect } from "expo-router";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import Calendar from "../../assets/Calendar.svg";
import CardBackground from "../../assets/CardBackground.svg";
import In from "../../assets/In.svg";
import Out from "../../assets/Out.svg";
import Pin from "../../assets/Pin.svg";
import MakeRecordCard from "../../src/components/MakeRecordCard";
import styles, { colors } from "../../src/styles";

export default function Home() {
  useFocusEffect(() => {
    if (Platform.OS === "android")
      setStatusBarBackgroundColor(colors.grayscale[800], true);
    setStatusBarStyle("light");
    return () => {
      if (Platform.OS === "android")
        setStatusBarBackgroundColor(colors.white, true);
      setStatusBarStyle("auto");
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.grayscale[800],
          ...styles.statusbarPadding,
        }}
      >
        <View
          style={{
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.white,
              fontFamily: "Roboto_400Regular",
            }}
          >
            Halo
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: colors.white,
              fontWeight: "bold",
              fontFamily: "Montserrat_700Bold",
            }}
          >
            Akbar Aditama S.P.
          </Text>
          <View
            style={{
              height: 86,
              borderRadius: 6,
              backgroundColor: colors.primary[500],
              marginTop: 32,
              overflow: "hidden",
              alignItems: "center",
              elevation: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              position: "relative",
              flexDirection: "row",
              borderWidth: 1,
              borderColor: colors.white,
            }}
          >
            <CardBackground
              style={{
                position: "absolute",
                top: 0,
                right: -20,
              }}
              width="105%"
            />
            <View style={{ padding: 24, flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Montserrat_700Bold",
                  fontSize: 16,
                  color: colors.grayscale[800],
                }}
              >
                Senin
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  color: colors.grayscale[700],
                }}
              >
                25 September 2023
              </Text>
            </View>
            <View style={{ paddingRight: 24 }}>
              <Calendar width={42} height={42} style={{ opacity: 0.8 }} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 46,
          backgroundColor: colors.grayscale[700],
          paddingHorizontal: 24,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Pin color={colors.white} style={{ marginRight: 5, marginLeft: 2 }} />
        <Text
          style={{
            color: colors.grayscale[100],
            fontFamily: "Roboto_400Regular",
            flex: 1,
          }}
        >
          Sadar Office
        </Text>
        <Text
          style={{
            padding: 12,
            color: colors.primary[400],
            fontFamily: "Roboto_700Bold",
            marginRight: -7,
          }}
        >
          Lihat &raquo;
        </Text>
      </View>
      <View style={{ flex: 1, padding: 24 }}>
        <MakeRecordCard icon={In} title="Masuk" color="green" />
        <MakeRecordCard
          icon={Out}
          title="Keluar"
          color="red"
          style={{ marginTop: 24 }}
        />
      </View>
    </View>
  );
}
