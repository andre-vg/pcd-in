import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";

export default function Home() {
  const { COLORS } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.LIGHT,
    },
  });

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
    </View>
  );
}


