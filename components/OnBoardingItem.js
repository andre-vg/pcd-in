import {
  Image,
  Pressable,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";
import { auth } from "../config/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../App";
import Logo from "../assets/pcdin.svg";
import { Modalize } from "react-native-modalize";
WebBrowser.maybeCompleteAuthSession();

export default function OnBoardingItem({ item, onOpen, userHasAccount }) {
  const { COLORS } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "467455222369-43o9ksl5f91isnqu9cpkh7pv9rk1oh1r.apps.googleusercontent.com",
    clientId:
      "467455222369-0el706teprheq23e5rbqgvdf2lo9b7k4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  const signInEmpresa = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {})
      .catch((error) => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

  useEffect(() => {
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential).then((userCredential) => {
        userHasAccount();
      });
      setTimeout(() => {
        setUserInfo(auth.currentUser);
      }, 1000);
    }
  }, [token]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    image: {
      flex: 0.7,
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontFamily: "Lexend_700Bold",
      marginBottom: 10,
      textAlign: "center",
      paddingHorizontal: 32,
    },
    text: {
      fontSize: 16,
      fontFamily: "Lexend_400Regular",
      textAlign: "center",
      paddingHorizontal: 28,
    },
    botao: {
      width: "70%",
      height: 50,
      display: "flex",
      flexDirection: "row",
      gap: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: COLORS.PRIMARY,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginVertical: 20,
      fontFamily: "Lexend_400Regular",
      fontSize: 15,
    },
    input: {
      width: "70%",
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(134, 93, 255, 0.2)",
      padding: 10,
      fontFamily: "Lexend_400Regular",
    },
    inputFocus: {
      width: "70%",
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      padding: 10,
      fontFamily: "Lexend_400Regular",
    },
    textRegister: {
      fontFamily: "Lexend_400Regular",
      fontSize: 12,
    },
    divInputs: {
      display: "flex",
      gap: 20,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
  });

  return (
    <>
      <View style={[styles.container, { width }]}>
        {!item.login ? (
          <Image
            source={item.image}
            style={[styles.image, { width, resizeMode: "contain" }]}
          />
        ) : (
          <Logo width={300} height={200} />
        )}

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        {item.login && (
          <>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Pressable
                style={styles.botao}
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              >
                <AntDesign name="google" size={30} color={COLORS.PRIMARY} />
                <Text
                  style={{
                    fontFamily: "Lexend_400Regular",
                    color: COLORS.PRIMARY,
                  }}
                >
                  Entrar com a conta Google
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  onOpen();
                }}
              >
                <Text style={styles.textRegister}>
                  Login de Empresa?{" "}
                  <Text
                    style={{
                      color: COLORS.SECONDARY,
                      textDecorationLine: "underline",
                    }}
                  >
                    Clique aqui
                  </Text>
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </>
  );
}
