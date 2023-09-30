import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Loader from "../src/components/Loader";
import store from "../src/redux/store";
import { colors } from "../src/styles";
import CheckToken from "../src/components/CheckToken";

SplashScreen.preventAutoHideAsync();

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
    <Provider store={store}>
      <CheckToken />
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
        <Stack.Screen
          name="login"
          options={{ title: "Login", headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor={colors.grayscale[800]} style="dark" />
      <Loader />
    </Provider>
  );
}
