import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "../App";

export default function VagaCard() {
  const { COLORS } = useContext(ThemeContext);

  return (
    <View style={[styles.card, {
        backgroundColor: COLORS.GRAY,
    }]}>
      <Image source={require("../assets/icon.png")} style={styles.image} />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: COLORS.DARKWHITE, fontSize: 20 }}>Vaga de emprego</Text>
        <Text style={{ color: COLORS.DARKWHITE, fontSize: 15 }}>Empresa</Text>
      </View>
      <Pressable style={styles.button}>
        <Entypo name="circle-with-plus" size={56} color={COLORS.SECONDARY} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    width: "100%",
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
  },
});
