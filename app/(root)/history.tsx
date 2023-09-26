import { ScrollView, View } from "react-native";
import styles from "../../src/styles";
import HistoryList from "../../src/components/HistoryList";

export default function History() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: 24 }}
    >
      <HistoryList />
      <HistoryList />
      <HistoryList />
      <HistoryList />
      <HistoryList />
    </ScrollView>
  );
}
