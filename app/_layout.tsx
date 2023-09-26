import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/styles";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={() => ({
          headerTitleStyle: {
            color: colors.grayscale[800],
            fontFamily: "Montserrat_700Bold",
            fontSize: 16,
          },
        })}
      >
        <Stack.Screen
          name="(root)"
          options={{ headerShown: false, title: "Utama" }}
        />
        <Stack.Screen
          name="attend-point"
          options={{ title: "Lokasi Absen Terdekat" }}
        />
      </Stack>
      <StatusBar backgroundColor="white" />
    </>
  );
}
