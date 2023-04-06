import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useFonts, Lexend_400Regular } from "@expo-google-fonts/lexend";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth/react-native";
import { auth } from "./config/FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const slides = [
  {
    key: "1",
    title: "Superando barreiras. Criando oportunidades",
    text: "O Pcd-in está transformando a realidade e abrindo portas para a inclusão no mercado de trabalho.",
    image: require("./assets/pcd1.jpg"),
  },
  {
    key: "2",
    title: "Sua jornada começa aqui",
    text: "O Pcd-in é uma plataforma que conecta pessoas com deficiência a empresas que buscam diversidade e inclusão.",
    image: require("./assets/pcd2.jpg"),
  },
  {
    key: "3",
    title: "LOGIN",
    text: "Este é um app de teste login",
    login: true,
  },
];

export default function App() {
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState({
    email: false,
    senha: false,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "467455222369-43o9ksl5f91isnqu9cpkh7pv9rk1oh1r.apps.googleusercontent.com",
    clientId:
      "467455222369-0el706teprheq23e5rbqgvdf2lo9b7k4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

  useEffect(() => {
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential);
      setTimeout(() => {
        setUserInfo(auth.currentUser);
        setLoading(false);
      }, 1000);
    }
  }, [token]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontFamily: "Lexend_400Regular" }}>
            Carregando...
          </Text>
        </View>
      );
    } else {
      if (!auth.currentUser) {
        return (
          <AppIntroSlider
            data={slides}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: 300, height: 300 }}
                />
                <Text
                  style={{
                    fontSize: 27,
                    fontFamily: "Lexend_400Regular",
                    paddingHorizontal: 30,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Lexend_400Regular",
                    paddingHorizontal: 30,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Text>
                {item.login && (
                  <>
                    <View style={styles.divInputs}>
                      <TextInput
                        style={focus.email ? styles.inputFocus : styles.input}
                        placeholder="Email"
                        placeholderTextColor="#865DFF"
                        //change backgroun color when focus
                        onFocus={() => {
                          setFocus({ email: true });
                        }}
                      />
                      <TextInput
                        style={focus.senha ? styles.inputFocus : styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#865DFF"
                        onFocus={() => {
                          setFocus({ senha: true });
                        }}
                      />
                    </View>
                    <Text style={styles.textRegister}>
                      {" "}
                      ────────────────── Ou ──────────────────
                    </Text>
                    <Pressable
                      style={styles.botao}
                      disabled={!request}
                      onPress={() => {
                        promptAsync();
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={{
                          uri: "https://img.icons8.com/color/512/google-logo.png",
                        }}
                      />
                      <Text>Entrar com a conta Google</Text>
                    </Pressable>
                  </>
                )}
              </View>
            )}
            activeDotStyle={{ backgroundColor: "#865DFF", width: 30 }}
            prevLabel="Voltar"
            showPrevButton={true}
            nextLabel="Próximo"
            showNextButton={true}
            keyboardDismissMode="on-drag"
            renderNextButton={() => (
              <Text
                style={{
                  color: "#865DFF",
                  fontSize: 15,
                  fontFamily: "Lexend_400Regular",
                  padding: 10,
                }}
              >
                Próximo
              </Text>
            )}
            renderPrevButton={() => (
              <Text
                style={{
                  color: "#865DFF",
                  fontSize: 15,
                  fontFamily: "Lexend_400Regular",
                  padding: 10,
                }}
              >
                Voltar
              </Text>
            )}
          />
        );
      } else {
        return (
          <View style={styles.container}>
            <Image
              style={styles.profilePic}
              source={{
                uri: userInfo?.photoURL,
              }}
            />
            <View style={styles.userInfo}>
              <Text style={styles.textoUser}>
                Nome: {userInfo?.displayName}
              </Text>
              <Text style={styles.textoUser}>Email: {userInfo?.email}</Text>
            </View>
            <Pressable
              style={styles.botao}
              onPress={() => {
                auth.signOut();
                setUserInfo(null);
                auth.currentUser = undefined;
              }}
            >
              <Text>Sair</Text>
            </Pressable>
          </View>
        );
      }
    }
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
    width: 150,
    height: 150,
    borderRadius: 999,
    marginBottom: 15,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lexend_400Regular",
  },
  textoUser: {
    fontFamily: "Lexend_400Regular",
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
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
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
    borderColor: "#865DFF",
    padding: 10,
    fontFamily: "Lexend_400Regular",
  },
  textRegister: {
    fontFamily: "Lexend_400Regular",
    fontSize: 10,
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
