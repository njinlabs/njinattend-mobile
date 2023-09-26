import { Tabs } from "expo-router/tabs";
import HomeIcon from "../../assets/Home.svg";
import HistoryIcon from "../../assets/History.svg";
import MenuIcon from "../../assets/Menu.svg";
import styles, { colors } from "../../src/styles";
import { Platform } from "react-native";

export default function Home() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let Icon = HomeIcon;
          if (route.name === "history") {
            Icon = HistoryIcon;
          } else if (route.name === "setting") {
            Icon = MenuIcon;
          }

          return (
            <Icon
              width={Platform.OS === "ios" ? 30 : 24}
              color={focused ? colors.primary[600] : colors.grayscale[500]}
            />
          );
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: colors.grayscale[200],
        },
        tabBarStyle: {
          paddingTop: Platform.OS === "ios" ? 8 : 0,
          height: Platform.OS === "ios" ? 84 : 64,
          borderTopWidth: 1,
          borderTopColor: colors.grayscale[200],
        },
        tabBarLabelStyle: {
          ...styles.baseText,
          fontSize: 12,
          marginBottom: Platform.OS === "ios" ? -10 : 10,
          marginTop: Platform.OS === "ios" ? 0 : -12,
          elevation: 0,
        },
        headerTitleStyle: {
          color: colors.grayscale[800],
          fontFamily: "Montserrat_700Bold",
          fontSize: 16,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: "/",
          headerShown: false,
          tabBarLabel: "Utama",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: "/history",
          tabBarLabel: "Riwayat",
          title: "Riwayat Absensi",
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          href: "/setting",
          tabBarLabel: "Pengaturan",
          title: "Pengaturan",
        }}
      />
    </Tabs>
  );
}
