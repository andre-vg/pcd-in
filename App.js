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
import Loading from "./components/Loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/FirebaseConfig";

export const ThemeContext = React.createContext();
export const UserContext = React.createContext();

export default function App2() {
  const [signedIn, setSignedIn] = useState();
  const [loading, setLoading] = useState(false);
  const [COLORS, setCOLORS] = useState({
    PRIMARY: "#A385FF",
    SECONDARY: "#865DFF",
    THIRD: "#C5A6E3",
    LIGHT: "#f7f7f7",
    DARKWHITE: "#000000",
    GRAY: "#efefef",
  });
  const [user, setUser] = useState();

  useEffect(() => {
    AsyncStorage.getItem("Theme").then((mode) => {
      if (mode === "dark") {
        setCOLORS({
          PRIMARY: "#271D3F",
          SECONDARY: "#6D4693",
          THIRD: "#865DFF",
          LIGHT: "#16161D",
          DARKWHITE: "#ffffff",
          GRAY: "#333333",
        });
      }
      if (mode === "light") {
        setCOLORS({
          PRIMARY: "#A385FF",
          SECONDARY: "#865DFF",
          THIRD: "#C5A6E3",
          LIGHT: "#f7f7f7",
          DARKWHITE: "#000000",
          GRAY: "#efefef",
        });
      }
      if (mode === "deuteranopia") {
        setCOLORS({
          PRIMARY: "#058ed9",
          SECONDARY: "#cc2d35",
          THIRD: "#e1daae",
          LIGHT: "#f7f7f7",
          DARKWHITE: "#000000",
          GRAY: "#efefef",
        });
      }
    });
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
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

  const userHasAccount = async () => {
    await getDoc(doc(db, "users", getAuth().currentUser.uid)).then((doc) => {
      if (doc.data()) {
        setUser(doc.data());
        AsyncStorage.setItem("user", JSON.stringify(doc.data()));
      } else {
        setUser([]);
      }
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return <Loading setLoading={setLoading} COLORS={COLORS} />;
  }

  if (user && signedIn) {
    return (
      <ThemeContext.Provider value={{ COLORS, setCOLORS, user, setUser }}>
        <NavigationContainer>
          <DrawerNav
            setLoading={setLoading}
            loading={loading}
            COLORS={COLORS}
          />
          <StatusBar style="light" backgroundColor={COLORS.PRIMARY} />
        </NavigationContainer>
      </ThemeContext.Provider>
    );
  } else {
    return (
      <ThemeContext.Provider value={{ COLORS, setCOLORS, user, setUser }}>
        <View style={styles.container}>
          <Onboarding userHasAccount={userHasAccount} setLoading={setLoading} />
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
