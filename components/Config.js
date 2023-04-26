import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Config() {
  const [isCheckedDarkMode, setCheckedDarkMode] = useState(false);
  const [isCheckedDeuteranopia, setCheckedDeuteranopia] = useState(false);
  const [isCheckedBrightMode, setCheckedBrightMode] = useState(true);
  const { COLORS, setCOLORS } = useContext(ThemeContext);

  useEffect(() => {
    AsyncStorage.getItem("Theme").then((theme) => {
      handleChangeMode(theme);
    });
  }, []);

  const handleChangeMode = (mode) => {
    if (mode === "dark") {
      setCOLORS({
        PRIMARY: "#271D3F",
        SECONDARY: "#6D4693",
        THIRD: "#333533",
        LIGHT: "#000",
        DARKWHITE: "#fff",
      });
      AsyncStorage.setItem("Theme", "dark");
      setCheckedDeuteranopia(false);
      setCheckedBrightMode(false);
      setCheckedDarkMode(true);
    }
    if (mode === "light") {
      setCOLORS({
        PRIMARY: "#A385FF",
        SECONDARY: "#C5A6E3",
        THIRD: "#865DFF",
        LIGHT: "#fff",
        DARKWHITE: "#000",
      });
      AsyncStorage.setItem("Theme", "light");
      setCheckedDeuteranopia(false);
      setCheckedBrightMode(true);
      setCheckedDarkMode(false);
    }
    if (mode === "deuteranopia") {
      setCOLORS({
        PRIMARY: "#7c4bf4",
        SECONDARY: "#fce894",
        THIRD: "#145ac0",
        LIGHT: "#fff",
        DARKWHITE: "#fff",
      });
      AsyncStorage.setItem("Theme", "deuteranopia");
      setCheckedDeuteranopia(true);
      setCheckedBrightMode(false);
      setCheckedDarkMode(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 56,
      paddingHorizontal: 32,
      gap: 20,
    },
    text: {
      fontSize: 20,
      color: COLORS.DARKWHITE,
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

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.text}>Modo Claro</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedBrightMode}
          onValueChange={(e) => {
            e ? handleChangeMode("light") : null;
          }}
          color={isCheckedBrightMode ? COLORS.SECONDARY : COLORS.DARKWHITE}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.text}>Modo Escuro</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedDarkMode}
          onValueChange={(e) => {
            e ? handleChangeMode("dark") : null;
          }}
          color={isCheckedDarkMode ? COLORS.SECONDARY : COLORS.DARKWHITE}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.text}>Alto Contraste</Text>
        <Checkbox
          style={styles.checkbox}
          value={isCheckedDeuteranopia}
          onValueChange={(e) => {
            e ? handleChangeMode("deuteranopia") : null;
          }}
          color={isCheckedDeuteranopia ? COLORS.SECONDARY : COLORS.DARKWHITE}
        />
      </View>
    </View>
  );
}


