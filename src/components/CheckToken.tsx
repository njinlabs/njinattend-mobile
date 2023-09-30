import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, router } from "expo-router";
import { useApi } from "../api/api";
import { AxiosError } from "axios";
import checkToken from "../api/requests/auth/check-token";
import { login } from "../redux/slices/user";
import client from "../api/client";

export default function CheckToken() {
  const [mount, setMount] = useState(false);
  const [fakeLoad, setFakeLoad] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const checkTokenApi = useApi({
    api: checkToken,
    onFail: async (e) => {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem("token");
        router.replace("/login");
      }
    },
    onSuccess: async (data) => {
      const { token: _, ...user } = data!;
      dispatch(login(user));
    },
  });

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      } else {
        checkTokenApi.process(token);
      }
    })();

    const timeout = setTimeout(() => {
      setFakeLoad(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (user.logged && !mount && fakeLoad) {
      setMount(true);
      SplashScreen.hideAsync();
    }
  }, [user, fakeLoad]);

  useEffect(() => {
    if (user.logged) {
      (async () => {
        const token = await AsyncStorage.getItem("token");
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      })();
    }
  }, [user]);

  return null;
}
