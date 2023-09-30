import { ActivityIndicator, Modal, Platform, View } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { colors } from "../styles";

export default function Loader() {
  const { loading } = useAppSelector((state) => state.interface);

  return (
    <Modal visible={loading} animationType="fade" transparent={true}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: colors.black,
          opacity: 0.7,
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: colors.white,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            style={{
              marginRight: Platform.OS === "ios" ? -6 : 0,
              marginBottom: Platform.OS === "ios" ? -6 : 0,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
