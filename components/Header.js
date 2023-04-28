import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { auth } from "../config/FirebaseConfig";
import { ThemeContext } from "../App";
import P from "../assets/P.svg";

export default function Header({ navigation }) {
  const { COLORS } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      height: 70,
      backgroundColor: COLORS.PRIMARY,
    },
    title: {
      fontSize: 20,
      fontFamily: "Lexend_700Bold",
      color: COLORS.DARKWHITE,
    },
  });

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </Pressable>
      <P width={30} height={30} />
      <View style={{ width: 50 }} />
    </View>
  );
}
