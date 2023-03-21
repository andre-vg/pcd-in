import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useFonts, Lexend_400Regular } from "@expo-google-fonts/lexend";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  const [token, setToken] = useState("AIzaSyDLRFyE-Z01UmC2uxCGQ8AZLp6lfAWAaYQ");
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
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
      console.log(error);
    }
  };

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
              source={{ uri: userInfo.picture }}
              style={styles.profilePic}
            />
            <Text style={styles.textoUser}>Bem-vindo {userInfo.name}</Text>
            <Text style={styles.textoUser}>{userInfo.email}</Text>
            <Text style={[styles.textoUser, { fontWeight: "600", fontSize: 24 }]}>
              Você está autorizado
            </Text>
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
