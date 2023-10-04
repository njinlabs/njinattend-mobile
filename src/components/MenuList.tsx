import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { colors } from "../styles";

type MenuListProps = {
  children: React.ReactNode;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function MenuList({
  children,
  icon,
  onPress,
}: MenuListProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={onPress}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 32,
        }}
      >
        <Ionicons name={icon} size={20} color={colors.grayscale[800]} />
      </View>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          paddingVertical: 16,
          borderBottomColor: colors.grayscale[100],
          marginLeft: 16,
        }}
      >
        <Text
          style={{
            ...styles.baseText,
            fontSize: 16,
            marginTop: 4,
            color: colors.grayscale[700],
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
