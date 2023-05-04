import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";
import VagaCard from "../components/VagaCard";

export default function Home() {
  const { COLORS } = useContext(ThemeContext);
  let a=[1,2,3,4,5,6,7,8,9,10]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 10,
      backgroundColor: COLORS.LIGHT,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {a.map((item) => (
        <VagaCard key={item} />
      ))}
    </ScrollView>
  );
}


