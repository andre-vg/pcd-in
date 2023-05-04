import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, FontAwesome5, AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "../App";

export default function VagaCard({nome, cargo, navigation}) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <Pressable onPress={() =>{navigation.openDrawer()}} style={[styles.card, {
        backgroundColor: COLORS.GRAY,
    }]}>
      {/* <Image source={require("../assets/icon.png")} style={styles.image} /> */}
      <FontAwesome5 name={nome.toLowerCase()} size={56} color={COLORS.THIRD} style={styles.image} />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: COLORS.DARKWHITE, fontSize: 16 , fontFamily: 'Lexend_400Regular' }}>{cargo}</Text>
        <Text style={{ color: COLORS.SECONDARY, fontSize: 13 , fontFamily: 'Lexend_700Bold', marginTop: 4 }}>{nome}</Text>
      <Text style={{ color: '#bbb', fontSize: 13, fontFamily: 'Lexend_400Regular' }}>Cidade, Estado, País (Modalidade)</Text>
      </View>
      <Pressable style={styles.button}>
        {/* <Entypo name="magnifying-glass" size={48} color={COLORS.SECONDARY} /> */}
        <AntDesign name="form" size={36} color={COLORS.SECONDARY} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    marginVertical: 8,
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
