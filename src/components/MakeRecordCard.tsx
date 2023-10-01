import { StyleProp, Text, View, ViewComponent, ViewStyle } from "react-native";
import styles, { colors } from "../styles";
import { FC } from "react";
import { SvgProps } from "react-native-svg";
import moment from "moment";

type MakeRecordCardProps = {
  icon: FC<SvgProps>;
  color: keyof typeof colors;
  title: string;
  style?: ViewStyle;
  record?: string;
  loading?: boolean;
};

export default function MakeRecordCard({
  icon: Icon,
  color,
  title,
  style,
  record,
  loading,
}: MakeRecordCardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: colors.grayscale[300],
        alignItems: "center",
        flexDirection: "row",
        padding: 24,
        ...(style || {}),
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 4,
          backgroundColor: colors[color][100],
          borderWidth: 1,
          borderColor: colors[color][200],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon width={24} height={24} color={colors[color][500]} />
      </View>
      <View style={{ flex: 1, marginLeft: 24 }}>
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            color: colors.grayscale[800],
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Text style={styles.baseText}>
          {loading
            ? "Memuat..."
            : record
            ? moment(record).format("HH:mm")
            : "Belum ada record"}
        </Text>
      </View>
    </View>
  );
}
