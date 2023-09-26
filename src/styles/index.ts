import { StyleSheet } from "react-native";

export const colors = {
  white: "#FFF",
  grayscale: {
    100: "#dfe1e4",
    200: "#c0c2ca",
    300: "#a0a4af",
    400: "#818595",
    500: "#61677a",
    600: "#4e5262",
    700: "#3a3e49",
    800: "#272931",
    900: "#131518",
  },
  primary: {
    100: "#fff2cc",
    200: "#ffe599",
    300: "#ffd966",
    400: "#ffcc33",
    500: "#ffbf00",
    600: "#cc9900",
    700: "#997300",
    800: "#664c00",
    900: "#332600",
  },
  green: {
    100: "#d1dfd1",
    200: "#a3bea3",
    300: "#769e76",
    400: "#487d48",
    500: "#1a5d1a",
    600: "#154a15",
    700: "#103810",
    800: "#0a250a",
    900: "#051305",
  },
  red: {
    100: "#ead3d3",
    200: "#d5a7a7",
    300: "#bf7b7b",
    400: "#aa4f4f",
    500: "#952323",
    600: "#771c1c",
    700: "#591515",
    800: "#3c0e0e",
    900: "#1e0707",
  },
  blue: {
    100: "#cddaee",
    200: "#9bb5dd",
    300: "#6991cb",
    400: "#376cba",
    500: "#0547a9",
    600: "#043987",
    700: "#032b65",
    800: "#021c44",
    900: "#010e22",
  },
};

export const fonts = StyleSheet.create({
  montserratBold: {
    fontFamily: "Montserrat_700Bold",
  },
  montserrat: {
    fontFamily: "Montserrat_400Regular",
  },
  roboto: {
    fontFamily: "Roboto_400Regular",
  },
  robotoBold: {
    fontFamily: "Roboto_700Bold",
  },
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale[100],
  },
  statusbarPadding: {
    paddingTop: 50,
  },
  baseText: {
    ...fonts.roboto,
    color: colors.grayscale[500],
  },
});
