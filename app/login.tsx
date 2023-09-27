import { Link, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import styles, { colors, fonts } from "../src/styles";
import TextField from "../src/components/TextField";
import BlockButton from "../src/components/BlockButton";
import Welcome from "../assets/Welcome.svg";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: colors.grayscale[800],
        justifyContent: "flex-end",
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Welcome width="100%" />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 24,
          paddingVertical: 64,
        }}
      >
        <Text
          style={{
            color: colors.grayscale[800],
            ...fonts.montserratBold,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Selamat Datang!
        </Text>
        <Text
          style={{
            ...styles.baseText,
            textAlign: "center",
            marginTop: 6,
            marginBottom: 64,
            fontSize: 16,
          }}
        >
          Masuk ke akun anda untuk melanjutkan
        </Text>
        <TextField
          placeholder="NIP"
          containerProps={{ style: { marginBottom: 16 } }}
          icon="person"
        />
        <TextField placeholder="Password" secureTextEntry icon="lock-closed" />
        <View style={{ alignItems: "center" }}>
          <Link href={"/"} replace asChild>
            <BlockButton
              style={{
                width: "75%",
              }}
            >
              Masuk
            </BlockButton>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
