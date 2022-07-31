import React from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
Screen = ({ children }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default Screen;
