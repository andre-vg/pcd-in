import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../config/FirebaseConfig";
import { COLORS } from "../constants";

export default function DrawerComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: auth.currentUser.photoURL }}
        style={{ width: 64, height: 64, borderRadius: 50, borderWidth: 2, borderColor: COLORS.SECONDARY }}
      />
      <Text
        style={[{ color: "#fff", fontSize: 24, marginTop: 8 }, styles.title]}
      >
        {auth.currentUser.displayName}
      </Text>
      <Text
        style={[{ color: "#fff", fontSize: 16, marginTop: 4 }, styles.text]}
        onPress={() => navigation.goBack()}
      >
        {auth.currentUser.email}
      </Text>
      <Text>{navigation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 64,
    backgroundColor: COLORS.PRIMARY,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  title: {
    fontFamily: "Lexend_700Bold",
  },
  text: {
    fontFamily: "Lexend_400Regular",
  },
});
