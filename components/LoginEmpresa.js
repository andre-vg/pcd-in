import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";
import I from "../assets/L.svg";

export default function LoginEmpresa() {
  const { COLORS } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  return (
    <View style={{ marginTop: 32 }}>
      <I width={width} height={200} />
      <Text style={[styles.title, { marginTop: 8, color:COLORS.PRIMARY }]}>Bem-vindo</Text>
      <Text style={styles.text}>Faça login para continuar</Text>
      <View style={styles.divInputs}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.PRIMARY}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          placeholderTextColor={COLORS.PRIMARY}
        />
        <Pressable
          style={{
            display: "flex",
            width: "80%",
            height: 50,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(134, 93, 255, 0.2)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            // signInEmpresa();
          }}
        >
          <Text
            style={{
              fontFamily: "Lexend_400Regular",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Entrar
          </Text>
        </Pressable>
        <Text style={styles.textRegister}>
          Ainda não tem uma conta?{" "}
          <Text
            style={{
              color: COLORS.SECONDARY,
              textDecorationLine: "underline",
            }}
          >
            A FAZER Cadastre-se
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Lexend_700Bold",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lexend_400Regular",
    textAlign: "center",
    paddingHorizontal: 28,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(134, 93, 255, 0.2)",
    padding: 10,
    fontFamily: "Lexend_400Regular",
  },
  textRegister: {
    fontFamily: "Lexend_400Regular",
    fontSize: 12,
  },
  divInputs: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingHorizontal: 36,
  },
});
