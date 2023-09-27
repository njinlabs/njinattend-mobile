import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { Link, useFocusEffect } from "expo-router";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import { useEffect } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import Calendar from "../../assets/Calendar.svg";
import CardBackground from "../../assets/CardBackground.svg";
import In from "../../assets/In.svg";
import Out from "../../assets/Out.svg";
import Pin from "../../assets/Pin.svg";
import BlockButton from "../../src/components/BlockButton";
import MakeRecordCard from "../../src/components/MakeRecordCard";
import styles, { colors, fonts } from "../../src/styles";
import { useState } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default function Home() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [attendShown, setAttendShown] = useState(false);

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
                    ...fonts.montserratBold,
                    fontSize: 16,
                    color: colors.grayscale[800],
                  }}
                >
                  Senin
                </Text>
                <Text
                  style={{
                    ...fonts.roboto,
                    color: colors.grayscale[700],
                  }}
                >
                  25 September 2023
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
            Sadar Office
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
              onPress={() => setAttendShown(true)}
            >
              <Text style={{ marginLeft: 8 }}> Absen Masuk</Text>
            </BlockButton>
            <BlockButton
              style={{
                flex: 1,
                marginLeft: 8,
              }}
              onPress={() => setAttendShown(true)}
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
        visible={attendShown}
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
                    ratio="1:1"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </View>
              <BlockButton>Ambil</BlockButton>
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </>
  );
}
