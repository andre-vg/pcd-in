import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "./components/Onboarding";
import { StatusBar } from "expo-status-bar";
import { useFonts, Lexend_400Regular } from "@expo-google-fonts/lexend";
import { auth } from "./config/FirebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import BottomTabs from "./routes";

export default function App2() {
  const [signedIn, setSignedIn] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        setSignedIn(true);
      } else {
        console.log("User is signed out");
        setSignedIn(false);
      }
    });
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    if (signedIn) {
      return (
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      );
    } else {
      return (
        <View style={styles.container}>
          <Onboarding />
          <StatusBar style="auto" />
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
  },
});
