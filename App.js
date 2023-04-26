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


export const ThemeContext = React.createContext();

export default function App2() {
  const [signedIn, setSignedIn] = useState(false);
  const [COLORS, setCOLORS] = useState({
    PRIMARY: "#A385FF",
    SECONDARY: "#000",
    THIRD: "#865DFF",
    LIGHT: "#fff",
  });

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
          </NavigationContainer>
        </ThemeContext.Provider>
      );
    } else {
      return (
        <ThemeContext.Provider value={{ COLORS, setCOLORS }}>
          <View style={styles.container}>
            <Onboarding />
            <StatusBar style="auto" translucent />
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
