import { Animated, Text, View } from "react-native";
import styles, { colors } from "../styles";
import { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "../redux/slices/interface";

export default function Toast() {
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(false);
  const { toast: toastText } = useAppSelector((state) => state.interface);
  const dispatch = useAppDispatch();
  const fading = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      setFade(true);
    } else {
      dispatch(toast(null));
    }
  }, [show]);

  useEffect(() => {
    if (fade) {
      Animated.timing(fading, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        setFade(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      Animated.timing(fading, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShow(false);
        }
      });
    }
  }, [fade]);

  useEffect(() => {
    if (toastText) {
      setShow(true);
    }
  }, [toastText]);

  if (!show) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: 24,
        width: "100%",
        opacity: fading,
        zIndex: 99,
      }}
    >
      <View style={{ position: "relative" }}>
        <View
          style={{
            backgroundColor: colors.black,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 6,
            opacity: 0.5,
            position: "absolute",
          }}
        ></View>
        <Text
          style={{
            ...styles.baseText,
            color: colors.white,
            padding: 16,
            textAlign: "center",
          }}
        >
          {toastText}
        </Text>
      </View>
    </Animated.View>
  );
}
