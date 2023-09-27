import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import styles, { colors } from "../styles";
import { Ionicons } from "@expo/vector-icons";

type TextFieldProps = {
  containerProps?: ViewProps;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function TextField({
  containerProps: { style: containerStyles, ...containerProps } = {},
  style,
  icon,
  ...props
}: TextFieldProps & TextInputProps) {
  return (
    <View
      style={{ position: "relative", ...(containerStyles as ViewStyle) }}
      {...containerProps}
    >
      <TextInput
        style={{
          backgroundColor: "#F0F0F0",
          borderWidth: 1,
          borderColor: colors.grayscale[200],
          borderRadius: 6,
          height: 52,
          padding: 12,
          paddingLeft: icon ? 48 : 12,
          ...styles.baseText,
          ...(style as TextStyle),
        }}
        {...props}
      />
      {icon && (
        <View
          pointerEvents="none"
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: 52,
            height: "100%",
          }}
        >
          <Ionicons name={icon} size={16} color={colors.grayscale[600]} />
        </View>
      )}
    </View>
  );
}
