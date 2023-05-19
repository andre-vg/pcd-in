import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

export default function Input(props) {
  const styles = StyleSheet.create({
    input: {
      width: "80%",
      fontSize: 20,
      fontFamily: "Lexend_400Regular",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    linha: {
      borderRadius: 100,
      fontFamily: "Lexend_400Regular",
      marginHorizontal: 10,
    },
    texto: {
      fontFamily: "Lexend_400Regular",
    },
  });
  return (
    <>
      <TextInput
        {...props}
        underlineStyle={styles.linha}
        style={styles.input}
        contentStyle={styles.texto}
        placeholderStyle={styles.texto}
      />
    </>
  );
}
