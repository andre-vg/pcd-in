import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Config() {
  const [isCheckedDarkMode, setCheckedDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.text}>Modo Escuro</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedDarkMode}
          onValueChange={(e)=>{
            e ? SecureStore.setItemAsync("Theme", "dark") : SecureStore.setItemAsync("Theme", "light");
            setCheckedDarkMode(e);
          }}
          color={isCheckedDarkMode ? "#a65dff" : "#fff"}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.text}>Modo Escuro</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedDarkMode}
          onValueChange={setCheckedDarkMode}
          color={isCheckedDarkMode ? "#a65dff" : "#fff"}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.text}>Modo Escuro</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedDarkMode}
          onValueChange={setCheckedDarkMode}
          color={isCheckedDarkMode ? "#a65dff" : "#fff"}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 48,
    paddingHorizontal: 32,
    gap: 20,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Lexend_700Bold",
  },
  checkbox: {
    alignSelf: "center",
    height: 24,
    width: 24,
    borderRadius: 8,
  },
  linha: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
