import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Welcome from "../assets/Welcome.svg";
import { useApi } from "../src/api/api";
import { UserType } from "../src/api/models/user";
import signIn from "../src/api/requests/auth/sign-in";
import BlockButton from "../src/components/BlockButton";
import TextField from "../src/components/TextField";
import { useAppDispatch } from "../src/redux/hooks";
import { hideLoading, showLoading } from "../src/redux/slices/interface";
import { login } from "../src/redux/slices/user";
import styles, { colors, fonts } from "../src/styles";

export default function Login() {
  const dispatch = useAppDispatch();
  const [fail, setFail] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      registered_number: "",
      password: "",
    } as Partial<UserType>,
  });

  const signInApi = useApi({
    api: signIn,
    onSuccess: async (data) => {
      const { token, ...user } = data!;
      await AsyncStorage.setItem("token", token!);
      dispatch(login(user));
      dispatch(hideLoading());
      router.replace("/");
    },
    onFail: (e) => {
      dispatch(hideLoading());
      setFail(true);
    },
  });

  const onLogin = ({ registered_number, password }: Partial<UserType>) => {
    dispatch(showLoading());
    signInApi.process({ registered_number, password });
  };

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
        {fail && (
          <View
            style={{
              backgroundColor: colors.red[500],
              padding: 16,
              borderRadius: 6,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                ...styles.baseText,
                textAlign: "center",
                color: colors.white,
              }}
            >
              Kombinasi NIP dan Password Anda salah!
            </Text>
          </View>
        )}
        <Controller
          control={control}
          name="registered_number"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextField
              placeholder="NIP"
              containerProps={{ style: { marginBottom: 16 } }}
              icon="person"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <TextField
              placeholder="Password"
              secureTextEntry
              icon="lock-closed"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <View style={{ alignItems: "center" }}>
          <BlockButton
            style={{
              width: "75%",
            }}
            onPress={() => handleSubmit(onLogin)()}
          >
            Masuk
          </BlockButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
