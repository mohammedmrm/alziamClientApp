import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import cache from "../utility/cache";

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import getNotifications from "../api/getNofification";
import useAuth from "../auth/useAuth";
import Routes from "../Routes";
import colors from "../config/colors";
import ActivityIndecatorLoadingList from "./../components/ActivtyIndectors/ActivityIndecatorLoadingList";

function NotificationScreen(props) {
  const [messages, setMessages] = useState([]);
  const [totalNotificaiton, setTotalNotificaiton] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();
  let { user } = useAuth();
  const prefix = "notificaiotnsScreens";
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState("1");

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const loadNotification = async (nextPage) => {
    const results = await getNotifications.get(user.token, nextPage);
    if (results.data.success == "0") {
      return setIsLoading(false);
    }
    setPage(results.data.nextPage);
    if (results.data.data.length > 0) {
      setMessages([...messages, ...results.data.data]);
    }
    setTotalNotificaiton(results.data.unseen);
    setIsLoading(false);
  };
  const loadNotification_local = async (nextPage) => {
    setIsLoading(true);
    const results = await cache.get(
      "/getNotification.php?token=" +
        user.token +
        "&page=" +
        nextPage +
        "&limit=20"
    );
    setMessages([...messages, ...results.data]);
    setTotalNotificaiton(results.data.unseen);
    setIsLoading(false);
    loadNotification("1");
  };

  const onEndReachedMohamed = () => {
    loadNotification(page);
  };

  useEffect(() => {
    loadNotification_local("1");
    loadNotification(1);
    navigator.setOptions({
      title: (
        <Text style={{ fontFamily: "Tjw_reg" }}>
          الاشعارات ({totalNotificaiton})
        </Text>
      ),
    });
  }, []);
  const refreshingMethod = () => {
    setRefreshing(true);
    loadNotification("1");
    setRefreshing(false);
  };

  const footer = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}
      </View>
    );
  };
  return (
    <Screen>
      <View style={{ paddingTop: 5 }}>
        <FlatList
          data={messages}
          keyExtractor={(item) =>
            `${item.id}-${prefix}-${Date.now() + Math.random()}`.toString()
          }
          renderItem={({ item }) => (
            <ListItem
              title={`${item.title} - ${item.order_no}`}
              subTitle={`${item.body} `}
              date={item.date}
              seen={item.client_seen === "1" ? colors.white : colors.unseen}
              image={
                item.client_seen === "1"
                  ? require("../assets/notifications/seen.png")
                  : require("../assets/notifications/unseen.png")
              }
              onPress={() => {
                navigator.navigate(Routes.ORDER_DETAILS, {
                  id: item.order_id,
                  notify_id: item.id,
                });
              }}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => refreshingMethod()}
          onEndReachedThreshold={0.5}
          onEndReached={() => onEndReachedMohamed()}
          ListFooterComponent={footer}
        />
        {footer()}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 20,
    padding: 10,
  },
});

export default NotificationScreen;
