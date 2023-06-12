import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

export default function VagaDetails(props) {
  const { COLORS } = useContext(ThemeContext);
  return (
    <ScrollView style={{ paddingHorizontal: 24, paddingVertical:10 }}>
      <Text
        style={{
          color: COLORS.DARKWHITE,
          fontSize: 16,
          fontFamily: "Lexend_400Regular",
        }}
      >
        {props.info.descricao}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
