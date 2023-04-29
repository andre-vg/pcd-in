import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "./components/Onboarding";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Lexend_400Regular,
  Lexend_700Bold,
} from "@expo-google-fonts/lexend";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth/react-native";
import "react-native-gesture-handler";
import DrawerNav from "./DrawerNav";
import { COLORS } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = React.createContext();

export default function App2() {
  const [signedIn, setSignedIn] = useState(false);
  const [COLORS, setCOLORS] = useState({
    PRIMARY: "#A385FF",
    SECONDARY: "#000",
    THIRD: "#865DFF",
    LIGHT: "#fff",
  });

  useEffect(() => {
    AsyncStorage.getItem("Theme").then((mode) => {
      if (mode === "dark") {
        setCOLORS({
          PRIMARY: "#271D3F",
          SECONDARY: "#6D4693",
          THIRD: "#333533",
          LIGHT: "#000",
          DARKWHITE: "#fff",
        });
      }
      if (mode === "light") {
        setCOLORS({
          PRIMARY: "#A385FF",
          SECONDARY: "#000",
          THIRD: "#865DFF",
          LIGHT: "#fff",
          DARKWHITE: "#000",
        });
      }
      if (mode === "deuteranopia") {
        setCOLORS({
          PRIMARY: "#7c4bf4",
          SECONDARY: "#fce894",
          THIRD: "#145ac0",
          LIGHT: "#fff",
          DARKWHITE: "#fff",
        });
      }
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  getAuth().onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    if (signedIn) {
      return (
        <ThemeContext.Provider value={{ COLORS, setCOLORS }}>
          <NavigationContainer>
              <DrawerNav />
              <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
          </NavigationContainer>
        </ThemeContext.Provider>
      );
    } else {
      return (
        <ThemeContext.Provider value={{ COLORS, setCOLORS }}>
          <View style={styles.container}>
            <Onboarding />
            <StatusBar style="dark" />
          </View>
        </ThemeContext.Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.LIGHT,
  },
});
