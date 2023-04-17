import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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

export default function App2() {
  const [signedIn, setSignedIn] = useState(false);

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
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      );
    } else {
      return (
        <View style={styles.container}>
          <Onboarding />
          <StatusBar style="auto" translucent />
        </View>
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
