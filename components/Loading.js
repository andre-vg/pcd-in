import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function Loading({ COLORS }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={56} color={COLORS.PRIMARY} />
      <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
