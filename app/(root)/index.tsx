import { MaterialIcons } from "@expo/vector-icons";
import { AutoFocus, Camera, CameraType, FlashMode } from "expo-camera";
import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as Location from "expo-location";
import { Link, useFocusEffect } from "expo-router";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import moment from "moment";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Calendar from "../../assets/Calendar.svg";
import CardBackground from "../../assets/CardBackground.svg";
import In from "../../assets/In.svg";
import Out from "../../assets/Out.svg";
import Pin from "../../assets/Pin.svg";
import { useApi } from "../../src/api/api";
import saveIn from "../../src/api/requests/attendance.ts/save-in";
import locationIndex from "../../src/api/requests/location/location-index";
import BlockButton from "../../src/components/BlockButton";
import MakeRecordCard from "../../src/components/MakeRecordCard";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  hideLoading,
  showLoading,
  toast,
} from "../../src/redux/slices/interface";
import styles, { colors, fonts } from "../../src/styles";
import toFile from "../../src/to-file";
import saveOut from "../../src/api/requests/attendance.ts/save-out";

export default function Home() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [attendShown, setAttendShown] = useState<boolean | "in" | "out">(false);
  const { data: user } = useAppSelector((state) => state.user);
  const [locationError, setLocationError] = useState(true);
  const [location, setLocation] = useState<Location.LocationObject>();
  const cameraRef = useRef<Camera>();
  const dispatch = useAppDispatch();

  const locationIndexApi = useApi({
    api: locationIndex,
  });

  const saveInApi = useApi({
    api: saveIn,
    onSuccess: () => {
      dispatch(toast("Berhasil"));
    },
    onFail: () => {
      dispatch(toast("Wajah tidak dikenali"));
    },
  });

  const saveOutApi = useApi({
    api: saveOut,
    onSuccess: () => {
      dispatch(toast("Berhasil"));
    },
    onFail: () => {
      dispatch(toast("Wajah tidak dikenali"));
    },
  });

  const openAttend = (type: "in" | "out") => {
    if (
      locationIndexApi.data?.rows.find(
        (location) => location.distance && location.distance < 0.5
      )
    ) {
      setAttendShown(type);
    } else {
      dispatch(toast("Anda diluar area yang diizinkan"));
    }
  };

  const onAttend = async (type: "in" | "out") => {
    if (!location || !cameraRef) return;

    const photo = await cameraRef.current!.takePictureAsync({
      quality: 0.5,
      skipProcessing: true,
      isImageMirror: true,
    });
    const flipPhoto = await manipulateAsync(
      photo.uri,
      [{ flip: FlipType.Horizontal }],
      { compress: 1, format: SaveFormat.PNG }
    );

    setAttendShown(false);

    (type === "in" ? saveInApi : saveOutApi).process({
      face: toFile(flipPhoto.uri, "camera.jpg", "image/jpeg"),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationError(false);
      } else {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!permission?.granted && attendShown) {
      requestPermission();
    }
  }, [attendShown]);

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

  useEffect(() => {
    if (location) {
      locationIndexApi.process({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    if (saveInApi.isLoading || saveOutApi.isLoading) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [saveInApi.isLoading || saveOutApi.isLoading]);

  if (locationError)
    return (
      <View
        style={{
          ...styles.container,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.baseText}>Lokasi tidak diizinkan</Text>
      </View>
    );

  return (
    <>
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
                ...fonts.roboto,
              }}
            >
              Halo
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: colors.white,
                fontWeight: "bold",
                ...fonts.montserratBold,
              }}
            >
              {user?.fullname}
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
                    ...fonts.montserratBold,
                    fontSize: 16,
                    color: colors.grayscale[800],
                  }}
                >
                  {moment().format("dddd")}
                </Text>
                <Text
                  style={{
                    ...fonts.roboto,
                    color: colors.grayscale[700],
                  }}
                >
                  {moment().format("DD MMMM YYYY")}
                </Text>
              </View>
              <View style={{ paddingRight: 24 }}>
                <Calendar
                  width={42}
                  height={42}
                  style={{ opacity: 0.7 }}
                  color={colors.grayscale[900]}
                />
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
              ...fonts.roboto,
              flex: 1,
            }}
          >
            {locationIndexApi.isLoading || !location
              ? "Mencari..."
              : locationIndexApi.data?.rows.find(
                  (location) => location.distance && location.distance < 0.5
                )?.name || "Diluar area"}
          </Text>
          <Link
            href="/attend-point"
            style={{
              padding: 12,
              paddingHorizontal: 24,
              color: colors.primary[400],
              ...fonts.robotoBold,
              marginRight: -24,
            }}
          >
            Lihat &raquo;
          </Link>
        </View>
        <View style={{ flex: 1, padding: 24 }}>
          <MakeRecordCard icon={In} title="Masuk" color="green" />
          <MakeRecordCard
            icon={Out}
            title="Keluar"
            color="red"
            style={{ marginTop: 24 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BlockButton
              style={{
                flex: 1,
                marginRight: 8,
              }}
              onPress={() => openAttend("in")}
            >
              <Text style={{ marginLeft: 8 }}> Absen Masuk</Text>
            </BlockButton>
            <BlockButton
              style={{
                flex: 1,
                marginLeft: 8,
              }}
              onPress={() => openAttend("out")}
            >
              Absen Keluar
            </BlockButton>
          </View>
        </View>
      </View>
      {attendShown && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: colors.black,
            opacity: 0.5,
          }}
        />
      )}
      <Modal
        visible={Boolean(attendShown)}
        animationType="slide"
        onRequestClose={() => setAttendShown(false)}
        transparent={true}
      >
        <PanGestureHandler
          onGestureEvent={(e) => {
            if (
              e.nativeEvent.translationY > 50 &&
              e.nativeEvent.state === State.ACTIVE
            ) {
              setAttendShown(false);
            }
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 24,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    padding: 24,
                    marginTop: -24,
                    marginRight: -24,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => setAttendShown(false)}
                >
                  <Text
                    style={{
                      ...styles.baseText,
                    }}
                  >
                    Tutup
                  </Text>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.grayscale[800]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: colors.grayscale[100],
                  aspectRatio: 1,
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                {permission?.granted && attendShown && (
                  <Camera
                    type={CameraType.front}
                    autoFocus={AutoFocus.on}
                    flashMode={FlashMode.auto}
                    ratio="1:1"
                    useCamera2Api
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    ref={cameraRef as LegacyRef<Camera>}
                  />
                )}
              </View>
              <BlockButton
                onPress={() => onAttend(attendShown as "in" | "out")}
              >
                Ambil
              </BlockButton>
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </>
  );
}
