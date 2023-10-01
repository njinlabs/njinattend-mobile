import { ScrollView, ScrollViewProps, Text } from "react-native";
import styles from "../styles";

export default function NotFound({ ...props }: ScrollViewProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <Text style={styles.baseText}>Tidak ditemukan</Text>
    </ScrollView>
  );
}
