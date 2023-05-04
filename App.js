import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
  const [signedIn, setSignedIn] = useState();
  const [loading, setLoading] = useState(false);
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
          GRAY: "#202020",
        });
      }
      if (mode === "light") {
        setCOLORS({
          PRIMARY: "#A385FF",
          SECONDARY: "#C5A6E3",
          THIRD: "#865DFF",
          LIGHT: "#fff",
          DARKWHITE: "#000",
          GRAY: "#f0efef",
        });
      }
      if (mode === "deuteranopia") {
        setCOLORS({
          PRIMARY: "#058ed9",
          SECONDARY: "#cc2d35",
          THIRD: "#e1daae",
          LIGHT: "#fff",
          DARKWHITE: "#000",
          GRAY: "#f0efef",
        });
      }
    });
  }, []);

  const isLoading = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    isLoading();
  }, [fontsLoaded]);

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
    return null;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={56} color={COLORS.PRIMARY} />
        <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
      </View>
    );
  }

  if (getAuth().currentUser) {
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
          <Onboarding setLoading={isLoading} />
          <StatusBar style="dark" />
        </View>
      </ThemeContext.Provider>
    );
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
