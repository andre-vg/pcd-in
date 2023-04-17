import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../config/FirebaseConfig";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </Pressable>
      <Text style={styles.title}>PCD-IN</Text>
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
    fontFamily: "Lexend_700Bold",
    color: "#000",
  },
});
