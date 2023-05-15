import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";

export default function VagaDetails() {
  const { COLORS } = useContext(ThemeContext);
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text
        style={{
          color: COLORS.DARKWHITE,
          fontSize: 16,
          fontFamily: "Lexend_400Regular",
        }}
      >
        Aqui vai ter os detalhes da vaga
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
