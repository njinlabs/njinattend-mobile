import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextProps,
  TextStyle,
} from "react-native";
import { colors, fonts } from "../styles";

type BlockButtonProps = {
  children: React.ReactNode;
  textProps?: TextProps;
};

export default function BlockButton({
  children,
  style,
  textProps: { style: textStyle, ...textProps } = {},
  ...props
}: BlockButtonProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        padding: 16,
        backgroundColor: colors.primary[500],
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.primary[600],
        marginVertical: 24,
        ...(style as ViewStyle),
      }}
      activeOpacity={0.8}
    >
      <Text
        style={{
          ...fonts.montserratBold,
          color: colors.grayscale[800],
          textAlign: "center",
          verticalAlign: "middle",
          ...(textStyle as TextStyle),
        }}
        {...textProps}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
