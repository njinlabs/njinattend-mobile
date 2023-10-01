import { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles, { colors, fonts } from "../src/styles";
import TextField from "../src/components/TextField";
import { useForm, Controller } from "react-hook-form";
import { useApi } from "../src/api/api";
import setPassword from "../src/api/requests/user/set-password";
import { useAppDispatch } from "../src/redux/hooks";
import { hideLoading, showLoading, toast } from "../src/redux/slices/interface";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
};

export default function changePassword() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const setPasswordApi = useApi({
    api: setPassword,
    onSuccess: () => {
      dispatch(toast("Password berhasil diganti"));
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    },
    onFail: () => {
      dispatch(toast("Gagal, periksa kembali data Anda"));
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    } as ChangePasswordForm,
  });

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordForm) => {
    setPasswordApi.process({
      oldPassword,
      newPassword,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => handleSubmit(onSubmit)()}>
          <Text
            style={{
              ...styles.baseText,
              ...fonts.robotoBold,
              color: colors.blue[500],
              padding: 16,
              marginRight: -16,
            }}
          >
            Selesai
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (setPasswordApi.isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [setPasswordApi.isLoading]);

  useEffect(() => {
    return () => {
      dispatch(hideLoading());
    };
  }, []);

  return (
    <View style={{ ...styles.container, padding: 24 }}>
      <Controller
        control={control}
        name="oldPassword"
        rules={{ required: "Tidak boleh kosong" }}
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Password Lama"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            message={errors.oldPassword?.message}
            containerProps={{ style: { marginBottom: 24 } }}
          />
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        rules={{ required: "Tidak boleh kosong" }}
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Password Baru"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            message={errors.newPassword?.message}
            containerProps={{ style: { marginBottom: 24 } }}
          />
        )}
      />
      <Controller
        control={control}
        name="newPassword2"
        rules={{
          required: "Tidak boleh kosong",
          validate: (value) =>
            value === watch("newPassword") || "Ulangi dengan benar",
        }}
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Ulangi Password Baru"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            message={errors.newPassword2?.message}
            containerProps={{ style: { marginBottom: 24 } }}
          />
        )}
      />
    </View>
  );
}
