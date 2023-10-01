import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useApi } from "../../src/api/api";
import attendanceHistory from "../../src/api/requests/attendance.ts/attendance-history";
import HistoryList from "../../src/components/HistoryList";
import { useAppDispatch } from "../../src/redux/hooks";
import { hideLoading, showLoading } from "../../src/redux/slices/interface";
import styles from "../../src/styles";
import NotFound from "../../src/components/NotFound";

export default function History() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const attendanceHistoryApi = useApi({
    api: attendanceHistory,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await attendanceHistoryApi.withoutReset().process({});

    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      dispatch(showLoading());
      await attendanceHistoryApi.process({});

      dispatch(hideLoading());
    })();
  }, []);

  if (!attendanceHistoryApi.data?.rows.length)
    return (
      <NotFound
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      />
    );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
      data={attendanceHistoryApi.data?.rows || []}
      style={styles.container}
      keyExtractor={(_, index) => `${index}`}
      contentContainerStyle={{ paddingTop: 24 }}
      renderItem={({ item }) => (
        <HistoryList
          period={item.period!}
          inRecord={item.in_record!}
          outRecord={item.out_record!}
        />
      )}
    />
  );
}
