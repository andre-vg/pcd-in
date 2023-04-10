import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../config/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";

export default function Header() {
  //custom header with photo and name
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: auth.currentUser.photoURL }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Text style={styles.title}>PCD-IN</Text>
      <Pressable onPress={() => auth.signOut()}>
        <AntDesign name="logout" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 70,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  title: {
    fontSize: 20,
    fontFamily: "Lexend_400Regular",
    color: "#000",
    },
});
