import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useFonts, Lexend_400Regular } from "@expo-google-fonts/lexend";
import { ResponseType, useAutoDiscovery } from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth/react-native";
import { auth } from "./config/FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "467455222369-43o9ksl5f91isnqu9cpkh7pv9rk1oh1r.apps.googleusercontent.com",
    clientId:
      "467455222369-0el706teprheq23e5rbqgvdf2lo9b7k4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

  useEffect(() => {
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token)
      signInWithCredential(auth, credential);
      setTimeout(() => {
        setUserInfo(auth.currentUser)
      }, 1000);
    }
  }, [token]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        {userInfo === null ? (
          <Pressable
            style={styles.botao}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: "https://img.icons8.com/color/512/google-logo.png",
              }}
            />
          </Pressable>
        ) : (
          <View style={styles.userInfo}>
            <Image
              source={{ uri: userInfo.photoURL}}
              style={styles.profilePic}
              referrerPolicy="no-referrer"
            />
            <Text style={styles.textoUser}>Bem-vindo {userInfo.displayName}</Text>
            <Text style={styles.textoUser}>{userInfo.email}</Text>
            <Text style={[styles.textoUser, { fontWeight: "600", fontSize: 24 }]}>
              Você está autorizado
            </Text>
            <Pressable
              style={styles.botao}
              onPress={() => {
                auth.signOut();
                setUserInfo(null);
              }}
            >
              <Text style={{ fontFamily: "Lexend_400Regular" }}>
                Sair da conta
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginBottom: 15,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lexend_400Regular",
  },
  textoUser:{
    fontFamily:'Lexend_400Regular'
  },
  botao: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 999,
    padding: 10,
  },
});
