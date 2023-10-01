import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useApi } from "../../src/api/api";
import client from "../../src/api/client";
import { FileType } from "../../src/api/models/file";
import signOut from "../../src/api/requests/auth/sign-out";
import MenuList from "../../src/components/MenuList";
import generateUrl from "../../src/generate-url";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { hideLoading, showLoading } from "../../src/redux/slices/interface";
import { logout } from "../../src/redux/slices/user";
import styles, { colors, fonts } from "../../src/styles";

export default function Setting() {
  const { data: user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const signOutApi = useApi({
    api: signOut,
    onSuccess: async () => {
      await AsyncStorage.removeItem("token");
      client.defaults.headers.common["Authorization"] = undefined;
      dispatch(logout());
      router.replace("/login");
    },
  });

  useEffect(() => {
    if (signOutApi.isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [signOutApi.isLoading]);

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
            overflow: "hidden",
          }}
        >
          {user?.avatar ? (
            <Image
              source={{ uri: generateUrl((user.avatar as FileType).url!) }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons
              name="md-person-outline"
              size={32}
              color={colors.grayscale[400]}
            />
          )}
        </View>
        <Text
          style={{
            ...fonts.montserratBold,
            fontSize: 16,
            color: colors.grayscale[800],
            marginTop: 16,
          }}
        >
          {user?.fullname}
        </Text>
        <Text style={{ ...styles.baseText, marginTop: 4, marginBottom: 2 }}>
          {user?.department}
        </Text>
        <Text style={styles.baseText}>{user?.registered_number}</Text>
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
        <MenuList
          icon="lock-closed-outline"
          onPress={() => router.push("/change-password")}
        >
          Ganti Password
        </MenuList>
        <MenuList icon="log-out-outline" onPress={() => signOutApi.process({})}>
          Keluar
        </MenuList>
      </View>
    </View>
  );
}
